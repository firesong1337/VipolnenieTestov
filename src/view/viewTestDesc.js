
class TestDesc {
    constructor(parentCtn) {
        this.parentCtn = parentCtn;
        this.buttonStartTest = document.createElement('button');
        this.buttonCancel = document.createElement('button');
    }
    displayTestsDesc(test) {
        this.parentCtn.innerHTML = ''; // Очищаем содержимое элемента с описанием
        this.testId = test.testId;

        //const headerName = document.createElement('p');
        //headerName.textContent = "Описание";
        //this.testHeader.appendChild(headerName);
        //this.appHeader.header.appendChild(headerName);
        const paragraph = document.createElement('p');
        paragraph.textContent = test.description;
        const descButtonBlock = document.createElement('div');
        descButtonBlock.classList.add('desc-btn-ctn');
        const header = document.querySelector('header');
        header.style.borderBottom = "1px solid #cfd8dc";
        
        this.buttonStartTest.setAttribute('class', 'btn-test-start');
        this.buttonCancel.setAttribute('class', 'btn-test-cancel');
        this.buttonStartTest.textContent = "Начать";
        this.buttonCancel.textContent = "Отмена";
        descButtonBlock.appendChild(this.buttonStartTest);
        descButtonBlock.appendChild(this.buttonCancel);

        this.parentCtn.appendChild(paragraph);
        this.parentCtn.appendChild(descButtonBlock);
        
    }
    
}
export default TestDesc