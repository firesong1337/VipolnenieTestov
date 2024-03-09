class TimerForTest {
    constructor() {
        this.timer = null;
        this.timerInterval = null;
        this.timerElement = document.createElement('div');
        this.timerElement.classList.add("test-timer");
    }
    setTimer(timeSecs) {
        if (this.timer === null) {
            this.timer = timeSecs
        }
    }

    startTimer() {
        let time = this.timer;
        this.timerInterval = setInterval(() => {
            const hoursLeft = Math.floor(time / 3600);
            const minutesLeft = Math.floor((time % 3600) / 60);
            const secondsLeft = time % 60;

            this.timerElement.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
            if (time <= 0) {
                clearInterval(this.timerInterval);
                this.timerElement.textContent = "Time's up!";
            } else {
                time--;
            }
        }, 1000);
    }
}
/*
const myTimer = new Timer(60); // Установите нужное начальное время в секундах здесь
myTimer.startTimer();*/


export default TimerForTest;