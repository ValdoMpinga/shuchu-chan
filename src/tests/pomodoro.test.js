var assert = require('assert');
const { log } = require('console');
const readline = require('readline');

// const WORK_DURATION = 1 * 60 * 1000; // 25 minutes in milliseconds
// const SHORT_BREAK_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
// const LONG_BREAK_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds

const WORK_DURATION = 15000
const SHORT_BREAK_DURATION = 2000
const LONG_BREAK_DURATION = 3000

let isTimerPaused = false;
let intervalId;

let isPomodoroActive = false; // Initial state is work
let remainingTime = WORK_DURATION; // Initial remaining time is work duration

var pomodoroCounter = 1
let isTimepaused; // Time when the timer was paused



describe('Pomodoro functionality', () =>
{
    describe('Timer test', function ()
    {
        it.skip('should start the timer', () =>
        {
            this.timeout(3000000);
            startTimer();
        })
    });
    describe('Full pomodoro section', () =>
    {
        it.skip('should run a full pomodoro section which consists in 4x worktime, 3x short breakas and 1 long break and finally reset.', () =>
        {
            this.timeout(3000000);
            for (let i = 0; i < 8; i++)
                startTimer();
        })
    }),
        describe('Pause and resume timer test', () =>
        {
            it.skip('should pause and resume', () =>
            {
                startTimer()
                setTimeout(() =>
                {
                    pauseTime()
                    resumeTime()
                }, 3000)
            })
        }),
        describe('Resetting timer while pomodoro running test', () =>
        {
            startTimer()
            setTimeout(() =>
            {
                resetTimer()

            }, 4000)
        })
});




function startTimer()
{
    try
    {
        // Set the start time based on the remaining time
        isPomodoroActive = true
        startTime = Date.now() - remainingTime;

        // Execute the interval function every 1 second (1000 milliseconds)
        intervalId = setInterval(() =>
        {
            if (isTimepaused)
            {
                clearInterval(intervalId);
                return;
            }

            // Subtract 1 second from the remaining time
            remainingTime = remainingTime - 1000;

            // Check if the remaining time is 0 or negative
            if (remainingTime <= 0)
            {
                // Stop the timer
                clearInterval(intervalId);

                switch (true)
                {
                    // If the counter is odd, it's time to work
                    case pomodoroCounter % 2 !== 0:
                        console.log("Time to work!");
                        // currentState = 'work';
                        remainingTime = WORK_DURATION;
                        pomodoroCounter++;
                        break;

                    // If the counter is even and not 8, it's time for a short break
                    case pomodoroCounter % 2 === 0 && pomodoroCounter !== 8:
                        console.log("Time for a short break!");
                        // currentState = 'rest';
                        remainingTime = SHORT_BREAK_DURATION;
                        pomodoroCounter++;
                        break;

                    // If the counter is even and 8, it's time for a long break
                    case pomodoroCounter % 2 === 0 && pomodoroCounter === 8:
                        pomodoroCounter = 1;
                        isPomodoroActive = false
                        console.log("Time for a long break!");
                        // currentState = 'rest';
                        remainingTime = LONG_BREAK_DURATION;
                        break;

                    // Handle any invalid pomodoro counter values
                    default:
                        console.log(`Invalid pomodoro counter value: ${pomodoroCounter}`);
                }
            }
            console.log(`Remaining time: ${formatTime(remainingTime)}`);
        }, 1000);
    } catch (e)
    {
        console.log(e);
    }
}

function pauseTime()
{
    isTimerPaused = true;
    clearInterval(intervalId);
    console.log("Pomodoro paused successfully");
}

function resumeTime()
{
    isTimerPaused = false;
    startTimer();
    console.log("Pomodoro resumed successfully");

}

function resetTimer()
{
    if (isPomodoroActive)
    {
        pomodoroCounter = 1
        remainingTime = WORK_DURATION;
        clearInterval(intervalId);
        console.log("Timer has been reset");
    }
}
function formatTime(ms)
{
    let minutes = Math.floor(ms / 1000 / 60);
    let seconds = Math.floor((ms / 1000) % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num)
{
    return num < 10 ? `0${num}` : num;
}



