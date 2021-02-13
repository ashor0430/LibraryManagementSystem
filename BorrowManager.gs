//FormApp.getActiveForm();
function UpdateFormByBorrow() {
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  var answers = {"bookNumber": 1, "backDeadline": new Date};//TODO:配列から取ってくる
  // answers.backDeadline = '"' + xxx +'"';
  //  Logger.log(answers.backDeadline);
  // answers.backDeadline.toString();
  // Logger.log(answers.backDeadline);

  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      var formId = range.getCell(i, 7).getValue();
      //TODO:ひとつもないorふたつ以上あったらエラー
    }
  }
  
  // var formId = statusRange.getCell(BookNumber + 1, 7).getValue();

  var form = FormApp.openById(formId);
 
  let items = form.getItems();  
  for (let i = 0; i < items.length; i++){
    form.deleteItem(items[i]);
  }
  form.setDescription("貸出中につき現在借りられません。しばらくお待ちください。 \n 返却予定日：" + answers.backDeadline);
}


function logDate(e){
  // let answers = e.response.getItemResponses()
  var itemResponses = e.response.getItemResponses();
  const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = TriggerSS.getSheetByName("3返却");
  let cell = sheet.getRange(2,5).getCell(1,1);
  cell.setValue(itemResponses[4]);
  sheet.getRange(3,5).getCell(1,1).setValue("動いた");
}
