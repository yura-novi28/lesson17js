//                      const, let, var
const getS = (selector) => document.querySelector(selector);
const getAllS = (selectors) => document.querySelectorAll(selectors);

//                      date
//  function
function clock() {
    //  let main
    let date = new Date();
    //  let time
    let time = [date.getHours(), date.getMinutes(), date.getSeconds()];
    //  time
    if (time[0] < 10) time[0] = `0${time[0]}`;
    if (time[1] < 10) time[1] = `0${time[1]}`;
    if (time[2] < 10) time[2] = `0${time[2]}`;
    getS('.time').textContent = `${time[0]}:${time[1]}:${time[2]}`;
    //  let date
    let dateM = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    //  date
    if (dateM[0] < 10) dateM[0] = `0${dateM[0]}`;
    if (dateM[1] < 10) dateM[1] = `0${dateM[1]}`;
    if (dateM[2] < 10) dateM[2] = `0${dateM[2]}`;
    getS('.date').textContent = `${dateM[0]}.${dateM[1]}.${dateM[2]}`;
}
//  timeout, interval
setInterval(clock, 1000);

//                      stopwatch
//  function
let stopInterval;
let stopInterval1;
let stopInterval2;
let stopInterval3;
let millisecondsNum = 0;
let secondsNum = 0;
let minutesNum = 0;
let hoursNum = 0;
function stopwatchStart() {
    event.preventDefault();
    getS('#start').disabled = true;
    getS('#stop').disabled = false;
    //  function
    function millisecondsInt() {
        millisecondsNum += 6;
        if (millisecondsNum >= 990) {
            getS('#dialstopMil').textContent = `:000`;
            millisecondsNum = 0;
        }
        if (millisecondsNum < 10) {
            getS('#dialstopMil').textContent = `:00${millisecondsNum}`;
        }
        else if (millisecondsNum < 100 && millisecondsNum > 10) {
            getS('#dialstopMil').textContent = `:0${millisecondsNum}`;
        }
        else {
            getS('#dialstopMil').textContent = `:${millisecondsNum}`;
        }
    }
    function secondsInt() {
        secondsNum++;
        if (secondsNum > 59) {
            secondsNum = 0;
        }
        if (secondsNum < 10) {
            getS('#dialstopSec').textContent = `:0${secondsNum}`;
        }
        else {
            getS('#dialstopSec').textContent = `:${secondsNum}`;
        }
    }
    function minutesInt() {
        minutesNum++;
        if (minutesNum > 59) {
            minutesNum = 0;
        }
        if (minutesNum < 10) {
            getS('#dialstopMin').textContent = `:0${minutesNum}`;
        }
        else {
            getS('#dialstopMin').textContent = `:${minutesNum}`;
        }
    }
    function hoursInt() {
        hoursNum++;
        if (hoursNum > 59) {
            hoursNum = 0;
        }
        if (hoursNum < 10) {
            getS('#dialstopHou').textContent = `:0${hoursNum}`;
        }
        else {
            getS('#dialstopHou').textContent = `:${hoursNum}`;
        }
    }
    //  interval
    stopInterval = setInterval(millisecondsInt, 1);
    stopInterval1 = setInterval(secondsInt, 1000);
    stopInterval2 = setInterval(minutesInt, 60000);
    stopInterval3 = setInterval(hoursInt, 3600000);
}
function stopwatchStop() {
    event.preventDefault();
    getS('#start').disabled = false;
    getS('#stop').disabled = true;
    clearInterval(stopInterval);
    clearInterval(stopInterval1);
    clearInterval(stopInterval2);
    clearInterval(stopInterval3);
}
function stopwatchReset() {
    event.preventDefault();
    getS('#dialstopHou').textContent = `00`;
    getS('#dialstopMin').textContent = `:00`;
    getS('#dialstopSec').textContent = `:00`;
    getS('#dialstopMil').textContent = `:000`;
    millisecondsNum = 0;
    secondsNum = 0;
    minutesNum = 0;
    hoursNum = 0;
    clearInterval(stopInterval);
    clearInterval(stopInterval1);
    clearInterval(stopInterval2);
    clearInterval(stopInterval3);
    getS('#start').disabled = false;
    for(let i = getS('.loop').children.length - 1; i >= 0; i--){
        getS('.loop').children[i].remove();
    }
}
function stopwatchLoop(){
    event.preventDefault();
    let p = document.createElement('p');
    let timeM = getAllS('.clock__stopwatch-dial');
    p.textContent = `${timeM[0].textContent}${timeM[1].textContent}${timeM[2].textContent}${timeM[3].textContent}`;
    getS('.loop').append(p);
}

//  addEventListener
getS('#start').addEventListener('click', stopwatchStart);
getS('#stop').addEventListener('click', stopwatchStop);
getS('#reset').addEventListener('click', stopwatchReset);
getS('#loop').addEventListener('click', stopwatchLoop);



//                      timer
let secondTimer = 60;
let minuteTimer;
//  function
function upNum(){
    event.preventDefault();
    getAllS('.timer__title')[0].textContent = +getAllS('.timer__title')[0].textContent + 1;
    getS('#setDown').disabled = false;
}
function downNum(){
    event.preventDefault();
    if(+getAllS('.timer__title')[0].textContent === 1){
        getS('#setDown').disabled = true;
    }
    else{
        getAllS('.timer__title')[0].textContent = +getAllS('.timer__title')[0].textContent - 1;
    }
}
let intervaTimerSecond;
function startTimer(){
    event.preventDefault();
    event.target.disabled = true;
    getS('#stopTimer').disabled = false;
    minuteTimer = getS('#numTimer').textContent;
    minuteTimer--;
    intervaTimerSecond = setInterval(function(){
        secondTimer--;
        if(minuteTimer < 10){
            minuteTimer = `0${minuteTimer}`
        }
        if(secondTimer < 10){
            getS('#timerDial').textContent = `${minuteTimer}:0${secondTimer}`;
        }
        else{
            getS('#timerDial').textContent = `${minuteTimer}:${secondTimer}`;
        }
        minuteTimer = +minuteTimer;
        if(secondTimer === 0){
            secondTimer = 60;
            if(minuteTimer == 0){
                clearInterval(intervaTimerSecond);
                resetTimerCopy();
            }
            minuteTimer--;
        }
    }, 1000);
}
function stopTimer(){
    event.preventDefault();
    event.target.disabled = true;
    getS('#startTimer').disabled = false;
    clearInterval(intervaTimerSecond);

}

function resetTimer(){
    event.preventDefault();
    clearInterval(intervaTimerSecond);
    getS('#timerDial').textContent = `00:00`;
    secondTimer = 60;
    getS('#startTimer').disabled = false;
    getS('#stopTimer').disabled = false;
}

function resetTimerCopy(){
    clearInterval(intervaTimerSecond);
    getS('#timerDial').textContent = `00:00`;
    secondTimer = 60;
    getS('#startTimer').disabled = false;
    getS('#stopTimer').disabled = false;
}
//  addEventListener
getS('#setUp').addEventListener('click', upNum);
getS('#setDown').addEventListener('click', downNum);
getS('#startTimer').addEventListener('click', startTimer);
getS('#stopTimer').addEventListener('click', stopTimer);
getS('#resetTimer').addEventListener('click', resetTimer);

