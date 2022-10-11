const time = () => {
  var dateObj = new Date();
  var text = '';

  var aryWeek = ['日', '月', '火', '水', '木', '金', '土'];

  text = ('00' + dateObj.getHours()).slice(-2) + ':' + //時
    (('00' + dateObj.getMinutes()).slice(-2)) //分

  return text;
}

export default time