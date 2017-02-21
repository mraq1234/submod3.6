class Stopwatch {
    constructor(display, middleTimesList) {
        this.running = false;
        this.display = display;
        this.middleTimesList = middleTimesList;
        this.reset();
        this.print(this.times);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.middleTime = this.middleTime.bind(this);
        this.reset = this.reset.bind(this);
        this.clearList = this.clearList.bind(this);
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    middleTime() {
        this.middleTimesList.innerHTML += this.format(this.times) + "</br>";
    }

    stop()  {
        this.running = false;
        clearInterval(this.watch);
    }
    
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print();
    }

    clearList() {
        this.middleTimesList.innerHTML = "";
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'), document.getElementById('middleTimesPlace'));

document.getElementById('start').addEventListener('click', stopwatch.start);
document.getElementById('stop').addEventListener('click', stopwatch.stop);
document.getElementById('middle').addEventListener('click', stopwatch.middleTime);
document.getElementById('reset').addEventListener('click', stopwatch.reset);
document.getElementById('clearList').addEventListener('click', stopwatch.clearList);