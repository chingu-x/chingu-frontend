export default function newsfeedDateFormatter(timestamp) {
    let timeSinceCurrent = new Date().getTime() - timestamp;
    let minute = Math.floor(timeSinceCurrent / 60000);
    let hour;
    let day;
    
    hour = Math.floor(minute / 60);
    minute = minute - (hour * 60);
    day = Math.floor(hour / 24);
    hour = hour - (day * 24);

    if (day > 0) {
        return day + ' days';
    } else if ( hour > 0 ) {
        return hour + ' hours';
    } else {
        return minute + ' minutes';
    }
}