import ExitTestDialog from './viewDialog'
import TimerForTest from './viewTimer';
import TestResult from './viewTestResult';
import TestForm from './viewTestForm';
import AppHeader from './viewHeader'
import TestDesc from './viewTestDesc';
import TestList from './viewTestList';
class TestsView {
    constructor() {
        //this.testHeader = document.querySelector('.test-header');
        this.testCtn = document.querySelector('.test-ctn');
        //this.endTestBtn = document.createElement('button');
        this.clearAnswersBtn = this.createButton("undo-answers-btn", "Сбросить все ответы");
        this.testId = null;
        this.testStarted = false;
        this.questionAmount = document.createElement('span');
        this.answeredQuestions = document.createElement('span');
        this.bindListeners()
        this.testData = null;
        this.testList = new TestList(this.testStarted, this.testListEventHandler);
        this.testDesc = new TestDesc(this.testCtn);
        this.testExitWndw = new ExitTestDialog();
        this.testTimer = new TimerForTest();
        this.testForm = new TestForm(this.testCtn);
        this.testResult = new TestResult();
        this.appHeader = new AppHeader();
        
    }
    headerFooterBorder(){
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        header.style.borderBottom = "1px solid #cfd8dc";
        footer.style.borderBottom = "1px solid #cfd8dc";
    }
    // привязка листенеров
    bindListeners = () => {
        this.clearAnswersBtn.addEventListener('click', () => this.removeUserAnswer());
        
        /*
        this.testDesc.buttonStartTest.addEventListener('click', () => {
            this.testForm.displayTestForm(test);
            console.log("StartBtn:", test);
            this.testStarted = true;
            this.testTimer.startTimer(180)
        });*/
    }
    // убирает чеки с радио-кнопок
    removeUserAnswer() {
        const chosenAnswers = document.querySelectorAll('input[type="radio"]:checked');
        chosenAnswers.forEach((chosenAnswer) => {
            chosenAnswer.checked = false;
        })
    }
    /*
    displayTestsList(tests) {
        tests.forEach(test => {
            const listItem = document.createElement('li');
            listItem.textContent = test.testName;
            this.testsListElem.appendChild(listItem);

            // Добавляем или удаляем обработчик в зависимости от значения this.testStarted
            if (!this.testStarted) {
                listItem.addEventListener('click', () => this.testListEventHandler(test));
            } else {
                listItem.removeEventListener('click', this.testListEventHandler);
            }
        });
    }*/
    
    testListEventHandler = (test) => {
        console.log(test)
        if (!this.testStarted) {
            this.testDesc.displayTestsDesc(test);
            this.bindTestDescListeners(test);
            test = null
        }
    };
    
    bindTestDescListeners(test) {
        // убирать листенереы!!!!!!!!
        const startTestClickHandler = () => {
            this.testForm.displayTestForm(test);
            console.log(test)
            //this.testStarted = true;
            //this.testTimer.startTimer(180)
        }
        const cancelTestClickHandler = () => {
            this.testCtn.innerHTML = '';
            console.log(test)
        }
        const otpiska = () => {
            console.log('listeners removed')
            this.testDesc.buttonStartTest.removeEventListener('click', startTestClickHandler);
            this.testDesc.buttonCancel.removeEventListener('click', cancelTestClickHandler);
        }
        otpiska()
        this.testDesc.buttonStartTest.addEventListener('click', startTestClickHandler);
        this.testDesc.buttonCancel.addEventListener('click', cancelTestClickHandler);
        
    }
    
    resetTimer() {
        clearInterval(this.timerInterval); // Очищаем текущий интервал таймера
        this.timer = null; // Обнуляем время
    }
    createButton(assignedClassName, assignedTextContent) {
        const button = document.createElement('button');
        button.classList.add(assignedClassName);
        button.textContent = assignedTextContent;
        return button;
    }
    /*
    displayTestsDesc(test) {
        this.testCtn.innerHTML = ''; // Очищаем содержимое элемента с описанием
        this.testId = test.testId;

        const headerName = document.createElement('p');
        headerName.textContent = "Описание";
        //this.testHeader.appendChild(headerName);
        this.appHeader.header.appendChild(headerName);
        const paragraph = document.createElement('p');
        paragraph.textContent = test.description;
        const descButtonBlock = document.createElement('div');
        descButtonBlock.classList.add('desc-btn-ctn');

        const buttonStart = this.createButton('btn-test-start', 'Начать')
        const buttonCancel = this.createButton('btn-test-cancel','Отмена');
        descButtonBlock.appendChild(buttonStart);
        descButtonBlock.appendChild(buttonCancel);

        buttonStart.addEventListener('click', () => {
            this.testForm.displayTestForm(test);
            console.log("StartBtn:", test);
            this.testStarted = true;
            this.testTimer.startTimer(180)
        });
        buttonCancel.addEventListener('click', () => {
            this.testCtn.innerHTML = '';
        });

        this.testCtn.appendChild(paragraph);
        this.testCtn.appendChild(descButtonBlock);
    }*/
    /*
    displayTestForm(test) {
        this.testCtn.innerHTML = '';
        this.testHeader.innerHTML = '';
        
        this.testTimer.setTimer(test.timeForTest)
        const form = document.createElement('form');
        form.classList.add("test-form-ctn")
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвратить отправку формы
            // Здесь можно обрабатывать выбранный ответ и тестировать логику
        });
        const exitTest = this.createButton("test-exit", "Выход");
        exitTest.addEventListener('click', this.testExitWndw.createDialogExitWindow);

        //const headerTimer = document.createElement('div');
        //headerTimer.className = "test-timer";

        const testHeaderInfo = document.createElement('div');
        testHeaderInfo.classList.add("test-header-info");
        const testHeaderAnswersRate = document.createElement('div');
        testHeaderAnswersRate.classList.add("test-header-answers-rate");
        this.answeredQuestions.textContent = document.querySelectorAll('.question').length;
        this.questionAmount.textContent = document.querySelectorAll('input[type="radio"]:checked'); 
        testHeaderAnswersRate.appendChild(this.answeredQuestions);
        testHeaderAnswersRate.appendChild(this.questionAmount);

        
        testHeaderInfo.appendChild(this.clearAnswersBtn);
        testHeaderInfo.appendChild(testHeaderAnswersRate);
        testHeaderInfo.appendChild(this.testTimer.timerElement);
        this.testHeader.appendChild(exitTest);
        this.testHeader.appendChild(testHeaderInfo)
        
        

        test.questions.forEach(question => {
            const questionHeading = document.createElement('p');
            const questionCtn = document.createElement('div');
            const answersCtn = document.createElement('div');

            questionCtn.classList.add("question-ctn");
            answersCtn.className = ("question " + "question-" +(question.questionId + 1));
            questionHeading.textContent = (question.questionId + 1) + '.' + question.question;
            
            questionCtn.appendChild(questionHeading);

            question.answers.forEach(answer => {
                const answerCtn = document.createElement('div');
                answerCtn.className = "question-" + (question.questionId + 1) +" question-answer "+ "answer-" + (answer.answerId + 1);
                const radio = document.createElement('input');
                radio.type = "radio";
                radio.name = "answer" + (question.questionId + 1); // Set the same name for all answers of a question
                radio.className = ("question-" + (question.questionId + 1) + " answer-radio " + "radio-" + (answer.answerId + 1)); 
    
                const label = document.createElement('label');
                label.htmlFor = "question-" + (question.questionId + 1) + " answer-radio " + "radio-" + (answer.answerId + 1);
                label.textContent = answer.answer;

                
                answerCtn.appendChild(radio);
                answerCtn.appendChild(label);
                answersCtn.appendChild(answerCtn);
            });
            questionCtn.appendChild(answersCtn)
            form.appendChild(questionCtn)

            
        });


        //const submitButton = document.createElement('button');
        this.endTestBtn.type = "submit";
        this.endTestBtn.textContent = "Завершить";
        this.endTestBtn.setAttribute("id","test-end-btn");
        form.appendChild(this.endTestBtn);
        this.testCtn.appendChild(form);
    }
    */

}

export default TestsView;
