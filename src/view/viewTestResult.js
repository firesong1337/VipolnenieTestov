class TestResult {
    constructor() {
        this.testResultsCtn = document.createElement('div');
        this.testCtn = document.querySelector('.test-ctn');
        this.startTestAgainBtn = document.createElement('button'); // button to start the test again
        this.footer = document.querySelector('footer');
    }
    // переделать нижний контейнер с кнопкой
    displayTestResult(testResults, testData) {
        this.footer.innerHTML='';
        const testResultDescCtn = document.createElement('div');
        testResultDescCtn.setAttribute('class','test-result-desc-ctn');
        const testResultDesc = document.createElement('h2');
        testResultDesc.setAttribute('class','test-result-desc');
        const testResultAnswers = document.createElement('div');
        testResultAnswers.setAttribute('class','test-result-answers');

        testResultDesc.textContent = "Тест завершен";
        testResultAnswers.textContent = "Вы ответили на " + testResults.answeredQuestionsCount + " из " + testResults.questionsCount + " вопросов"
        testResultDescCtn.appendChild(testResultDesc);
        testResultDescCtn.appendChild(testResultAnswers);

        this.testResultsCtn.setAttribute('class','test-result-ctn'); // .test-result-ctn
        this.startTestAgainBtn.setAttribute('class', 'start-again-btn'); // .start-again-btn
        const testResultMessage = document.createElement('h5');
        testResultMessage.setAttribute('class','test-result-message'); // .test-result-message
        testResultMessage.textContent = "Ваши ответы";
        this.startTestAgainBtn.textContent = "Пройти еще раз"

        while (this.testCtn.firstChild) {
            this.testCtn.removeChild(this.testCtn.firstChild);
        }
        
        this.testCtn.appendChild(testResultDescCtn)
        this.footer.appendChild(this.startTestAgainBtn);
        this.testCtn.appendChild(this.testResultsCtn);
        this.testResultsCtn.appendChild(testResultMessage);
        testResults.questionsResults.forEach(questionResult => {
            const resultQuestionAnswerCtn = document.createElement('div'); // question + answers
            const resultAnswersCtn = document.createElement('div'); // answers both
            const resultQuestion = document.createElement('h5'); // question
            const resultCorrectAnswer = document.createElement('p'); // correct answer
            const resultUserAnswer = document.createElement('p'); // user answer

            resultQuestionAnswerCtn.setAttribute('class','answer-question'); // .answer-question
            resultQuestionAnswerCtn.setAttribute('id', 'answer-question-index-' + (questionResult.resultsQuestionId + 1)); // #answer-question-index-1
            resultAnswersCtn.setAttribute('class','answers-ctn'); // .answers-ctn
            resultAnswersCtn.setAttribute('id','answers-ctn-index-' + (questionResult.resultsQuestionId + 1)); // #answers-ctn-index-1
            resultQuestion.setAttribute('class','question-desc') // .question-desc
            resultQuestion.setAttribute('id', "question-desc-index-" + (questionResult.resultsQuestionId + 1)) // #question-desc-index-1
            resultCorrectAnswer.setAttribute('class', 'correct-answer') // .correct-answer
            resultUserAnswer.setAttribute('class', 'user-answer'); // .user-answer

            resultQuestion.textContent = (questionResult.resultsQuestionId + 1) + '.'+ testData.questions[questionResult.resultsQuestionId].question;
            resultCorrectAnswer.textContent = "Правильный ответ: "+ testData.questions[questionResult.resultsQuestionId].answers[questionResult.answers.correctAnswerId].answer;
            let userAnswerId = "Не ответили"
            if (testData.questions[questionResult.resultsQuestionId].answers[questionResult.answers.userAnswerId] != undefined) {
                userAnswerId = testData.questions[questionResult.resultsQuestionId].answers[questionResult.answers.userAnswerId].answer
            }
            resultUserAnswer.textContent = "Вы ответили: " + userAnswerId;

            resultAnswersCtn.appendChild(resultCorrectAnswer);
            resultAnswersCtn.appendChild(resultUserAnswer);
            resultQuestionAnswerCtn.appendChild(resultQuestion);
            resultQuestionAnswerCtn.appendChild(resultAnswersCtn);
            this.testResultsCtn.appendChild(resultQuestionAnswerCtn);
        })
    }
}
export default TestResult;