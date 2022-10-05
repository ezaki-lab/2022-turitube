const today = () => {
  var dateObj = new Date();
  var text = '';

  var aryWeek = ['日', '月', '火', '水', '木', '金', '土'];

  text = dateObj.getFullYear() + '年' + //年の取得
    (dateObj.getMonth() + 1) + '月' + //月の取得 ※0~11で取得になるため+1
    dateObj.getDate() + '日' + //日付の取得
    '(' + aryWeek[dateObj.getDay()] + ')'; //曜日の取得

  console.log(text);
  return text;
}

export default today