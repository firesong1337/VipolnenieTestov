// перенести стили и вью в одну папку

class TestList {
    constructor(testStarted, handler) {
        this.testsListCtn = document.querySelector('.tests-list'); // убрать селекторы на классы из классов
        this.testStarted = testStarted
        this.handler = handler;
        this.testData = null;
        this.collapseBtn = document.querySelector('.test-btn-collapse');
    }
    
    displayTestsList(tests) {
        tests.forEach(test => {
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'test-list-item');
            listItem.textContent = test.testName;
            this.testsListCtn.appendChild(listItem);

            if (!this.testStarted) {
                listItem.addEventListener('click', () => this.handler(test));
            } else {
                listItem.removeEventListener('click', this.handler);
            }
        });
    }
    
    
}
export default TestList;