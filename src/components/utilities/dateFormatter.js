export default function dateFormatter (timestamp) {
    let newDate = new Date(timestamp).toDateString().split(' ');
    newDate.shift();
    newDate.pop();
    return newDate.join(' ');
  }