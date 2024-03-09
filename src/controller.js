
class TestsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    init() {
        this.model.loadTestsData();
        const tests = this.model.getTestsData();
        this.view.testList.displayTestsList(tests);
        this.view.testForm.bindTestEndBtnListener(this.handleFinishTest.bind(this));
        //this.view.displayTestsResult(this.handleFinishTest(collectedTestResults))
    }
    handleFinishTest(collectedTestResults) {
        console.log(collectedTestResults)
        const tests = this.model.getTestsData();
        const rightAnswers = this.getRightAnswersForTest(collectedTestResults.testId);
        const testResults = {
            testId: 0,
            questionsCount: 0,
            answeredQuestionsCount: 0,
            correctAnswerRate: 0,
            questionsResults: [] // eg {questionId: 0, answers: {userAnswerId, correctAnswerId}}
        };
        testResults.testId = collectedTestResults.testId;
        testResults.questionsCount = rightAnswers.length;
        testResults.answeredQuestionsCount = collectedTestResults.selectedAnswers.length;
        
        rightAnswers.forEach((answer, index) => {
            const resultsQuestionId = index;
            let resultAnswerId = null;
            if (collectedTestResults.selectedAnswers[resultsQuestionId] !== undefined) {
                resultAnswerId = collectedTestResults.selectedAnswers[resultsQuestionId].answerId; 
            } 
            const resultCorrectAnswerId = rightAnswers[index].questionAndAnswer.correctAnswerId;
            const answers = {
                userAnswerId: resultAnswerId,
                correctAnswerId: resultCorrectAnswerId
            };
            if (answers.userAnswerId == answers.correctAnswerId) {
                testResults.correctAnswerRate += 1
            }
            testResults.questionsResults.push({ resultsQuestionId, answers })
        })
        console.log(testResults)
        this.view.testResult.displayTestResult(testResults, tests[testResults.testId]);
    
    }
    getRightAnswersForTest(testId) {
        const tests = this.model.getTestsData();
        const questionsArray = [];
    
        tests[testId].questions.forEach((question) => {
            // Находим правильный ответ для текущего вопроса
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            
            if (correctAnswer) {
                // Если правильный ответ найден, добавляем его идентификатор в массив
                questionsArray.push({
                    questionAndAnswer: { 
                        questionId: question.questionId,
                        correctAnswerId: correctAnswer.answerId
                    }
                });
            }
        });
    
        return questionsArray;
    }
}
export default TestsController;