class ExitTestDialog {
    constructor() {
    }
    createDialogExitWindow() {
        if (!document.querySelector('.test-exit-wndw')) {
            const exitTestWindow = document.createElement('dialog');
            exitTestWindow.classList.add('test-exit-wndw');
            exitTestWindow.innerHTML = 
            '<div class="dialog-desc">\
                <h2>Вы уверены что хотите выйти?</h2>\
                <p>Все результаты будут сброшены</p>\
            <div>';
            const dialogBtnsCtn = document.createElement('div')
            dialogBtnsCtn.classList.add("dialog-desc-btns");
            const confirmExitBtn = document.createElement('button');
            confirmExitBtn.classList.add("dialog-test-exit");
            confirmExitBtn.textContent = "Выход";
            const cancelExitBtn = document.createElement('button');
            cancelExitBtn.classList.add("dialog-test-cancel");
            cancelExitBtn.textContent = "Отмена";
            dialogBtnsCtn.appendChild(confirmExitBtn);
            dialogBtnsCtn.appendChild(cancelExitBtn);
            exitTestWindow.appendChild(dialogBtnsCtn);
            document.querySelector('body').appendChild(exitTestWindow)
            exitTestWindow.showModal();
        }
    }

}

export default ExitTestDialog;