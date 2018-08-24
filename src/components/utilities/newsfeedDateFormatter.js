export default function newsfeedDateFormatter(timestamp) {
    let timeSinceCurrent = new Date().getTime() - timestamp;
    let minute = Math.floor(timeSinceCurrent / 6000);
    let hour;
    let day;
    
    hour = Math.floor(minute / 60);
    hour > 0 ? minute = minute - (hour * 60) : hour = 0;
    day = Math.floor(hour / 24);
    day > 0 ? hour = hour - (day * 24) : day = 0;

    if (day > 0) {
        return day + ' days';
    } else if ( hour > 0 ) {
        return hour + ' hours';
    } else {
        return minute + ' minutes';
    }
}