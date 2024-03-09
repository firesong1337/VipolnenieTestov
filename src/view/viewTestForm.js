class TestForm {
    constructor(parentCtn) {
        this.form = document.createElement('form');
        this.parentCtn = parentCtn;
        this.endTestBtn = document.createElement('button');
        this.testId = null;
        this.footer = document.querySelector('footer');
    }
    displayTestForm(test) {
        this.parentCtn.innerHTML = '';
        this.testId = test.testId;
        this.footer.style.borderTop = "1px solid #cfd8dc";
        //this.testHeader.innerHTML = '';
        
        //this.testTimer.setTimer(test.timeForTest)
        this.form.setAttribute('class', 'test-form-ctn')
        //const exitTest = //this.createButton("test-exit", "Выход");
        //exitTest.addEventListener('click', this.testExitWndw.createDialogExitWindow);

        //const headerTimer = document.createElement('div');
        //headerTimer.className = "test-timer";

        //const testHeaderInfo = document.createElement('div');
        //testHeaderInfo.classList.add("test-header-info");
        //const testHeaderAnswersRate = document.createElement('div');
        //testHeaderAnswersRate.classList.add("test-header-answers-rate");
        //this.answeredQuestions.textContent = document.querySelectorAll('.question').length;
        //this.questionAmount.textContent = document.querySelectorAll('input[type="radio"]:checked'); 
        //testHeaderAnswersRate.appendChild(this.answeredQuestions);
        //testHeaderAnswersRate.appendChild(this.questionAmount);

        
        //testHeaderInfo.appendChild(this.clearAnswersBtn);
        //testHeaderInfo.appendChild(testHeaderAnswersRate);
        //testHeaderInfo.appendChild(this.testTimer.timerElement);
        //this.testHeader.appendChild(exitTest);
        //this.testHeader.appendChild(testHeaderInfo)
        
        

        test.questions.forEach(question => {
            const questionHeading = document.createElement('h4');
            const questionCtn = document.createElement('div');
            const answersCtn = document.createElement('div');

            questionHeading.setAttribute('class', 'form-question-heading');
            questionHeading.setAttribute('id', 'head-question-'+ (question.questionId + 1));
            questionHeading.textContent = (question.questionId + 1) + '.' + question.question;

            questionCtn.setAttribute('class','question-ctn'); // .question-ctn

            answersCtn.setAttribute('class','question-answers-ctn'); // .question-answers-ctn
            
            questionCtn.appendChild(questionHeading);

            question.answers.forEach(answer => {
                const answerCtn = document.createElement('div');
                answerCtn.setAttribute('class', 'question-answer'); // .question-answer
                answerCtn.setAttribute('id', "question-" + (question.questionId + 1) + " answer-" + (answer.answerId + 1))
                const radio = document.createElement('input');
                radio.type = "radio";
                radio.name = 'radio-question-' + (question.questionId + 1); 
                
                radio.setAttribute('class', 'answer-radio'); //answer-radio
                radio.setAttribute('id', "question-" + (question.questionId + 1) + " radio-" + (answer.answerId + 1)); // #radio-1
                const label = document.createElement('label');
                label.htmlFor = "question-" + (question.questionId + 1) + " radio-" + (answer.answerId + 1); 
                
                label.textContent = answer.answer;

                
                answerCtn.appendChild(radio);
                answerCtn.appendChild(label);
                answersCtn.appendChild(answerCtn);
            });
            questionCtn.appendChild(answersCtn)
            this.form.appendChild(questionCtn)

            
        });

        this.endTestBtn.type = "submit";
        this.endTestBtn.textContent = "Завершить";
        this.endTestBtn.setAttribute("class","test-end-btn");
        this.footer.appendChild(this.endTestBtn);
        this.parentCtn.appendChild(this.form);
    }
    bindTestEndBtnListener(handler) {
        this.endTestBtn.addEventListener('click', () => {
            const selectedAnswers = this.collectSelectedAnswers()
            handler(selectedAnswers);
        });
    }
    collectSelectedAnswers() {
        const collectedTestResults = { 
            testId: 0,
            selectedAnswers: []}
        const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
        answerInputs.forEach(input => {
            const questionId = this.extractNumberFromString('question-',input.getAttribute('id')) - 1;
            const answerId = this.extractNumberFromString('radio-',input.getAttribute('id')) - 1;
            collectedTestResults.testId = this.testId;
            collectedTestResults.selectedAnswers.push({ questionId, answerId });
        });
        return collectedTestResults;
    } 
    extractNumberFromString(prefix, str) {
        const regex = new RegExp(prefix + '(\\d+)'); 
        console.log(str)
        const match = str.match(regex);
        if (match) {
            return parseInt(match[1]); 
        } else {
            return null;
        }
    }
}
export default TestForm;