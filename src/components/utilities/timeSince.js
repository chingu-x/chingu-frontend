export default timestamp => {
  const now = new Date()
  const secondsPast = (now.getTime() - new Date(timestamp).getTime()) / 1000;
  if (secondsPast < 60) return parseInt(secondsPast) + 's';
  if (secondsPast < 3600) return parseInt(secondsPast/60) + 'm';
  if (secondsPast <= 86400) return parseInt(secondsPast/3600) + 'h';
  if (secondsPast > 86400) {
    const day = timestamp.getDate();
      
    const month = timestamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      
    const year = timestamp.getFullYear() == now.getFullYear() ? "" :  " "+timestamp.getFullYear();
      return day + " " + month + year;
  }
}