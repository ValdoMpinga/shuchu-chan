module.exports = function formatTime(ms)
{
    let minutes = Math.floor(ms / 1000 / 60);
    let seconds = Math.floor((ms / 1000) % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num)
{
    return num < 10 ? `0${num}` : num;
}

