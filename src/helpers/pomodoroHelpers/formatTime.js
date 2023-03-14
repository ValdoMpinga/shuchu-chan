const ms = require('ms'); // Import the 'ms' library

module.exports = function formatTime(timeInMs)
{
    const timeInSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const minuteStr = minutes === 1 ? 'minute' : 'minutes';
    const secondStr = seconds === 1 ? 'second' : 'seconds';
    return `${padZero(minutes)} ${minuteStr} : ${padZero(seconds)} ${secondStr}`;
}

function padZero(num)
{
    return num.toString().padStart(2, '0'); // Add leading zero if needed
}

