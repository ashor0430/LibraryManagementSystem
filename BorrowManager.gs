function InsertBorrowLogData(){
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  let sheets = SS.getSheets();

  var answers = {
    "bookNumber": 1,
    "employeeName": "山田太郎",
    "employeeNumber": 0000,
    "borrowDate": new Date,
    "backDeadline": new Date
  };//TODO:配列から取ってくる

  for (let i = 2; i < sheets.length; i++){
    // Logger.log(sheets[i]);
    // Logger.log(sheets[i].getName());
    if (sheets[i].getName().indexOf(answers.bookNumber) >= 0){
      // Logger.log("入った");
      //TODO:ひとつもないorふたつ以上あったらエラー
      let range = sheets[i].getRange("B:E")
      let lastRow = sheets[i].getLastRow();
      range.getCell(lastRow +1, 1).setValue(answers.employeeName);
      range.getCell(lastRow +1, 2).setValue(answers.employeeNumber);
      range.getCell(lastRow +1, 3).setValue(answers.borrowDate);
      range.getCell(lastRow +1, 4).setValue(answers.backDeadline);
    }
  }
}

function ResisterStatus(){
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  var answers = {
    "bookNumber": 1,
    "employeeName": "山田太郎",
    "employeeNumber": 0000,
    "borrowDate": new Date,
    "backDeadline": new Date
  };//TODO:配列から取ってくる

  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      //TODO:ひとつもないorふたつ以上あったらエラー
      range.getCell(i, 3).setValue(answers.employeeName);
      range.getCell(i, 4).setValue(answers.employeeNumber);
      range.getCell(i, 5).setValue(answers.borrowDate);
      range.getCell(i, 6).setValue(answers.backDeadline);
    }
  }
}

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


// function logDate(e){
//   // let answers = e.response.getItemResponses()
//   var itemResponses = e.response.getItemResponses();
//   const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
//   const sheet = TriggerSS.getSheetByName("3返却");
//   let cell = sheet.getRange(2,5).getCell(1,1);
//   cell.setValue(itemResponses[4]);
//   sheet.getRange(3,5).getCell(1,1).setValue("動いた");
// }
