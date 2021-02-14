function BorrowBook(){

  let bookData = {"bookNumber": 1, "sheetName" : "1-貸出"};//TODO:引数

  let answers = GetBorrowData(bookData);

  InsertBorrowLogData(answers);

  ResisterStatus(answers);

  UpdateFormByBorrow(answers);

}

function GetBorrowData(bookData){
   const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
  // const SHEETS = TriggerSS.getSheets();
  // let timestamp = [];
  // let sortedTimestamp = [];

  // for (let i = 0; i < SHEETS.length; i++){
  //   if (SHEETS[i].getName().indexOf("貸出") >= 0){
  //     // Logger.log(i);
  //     // Logger.log(SHEETS[i].getRange(2, 1).getCell(1,1).getValue());
  //     timestamp[i] = SHEETS[i].getRange(2, 1).getCell(1,1).getValue();
  //     sortedTimestamp[i] = SHEETS[i].getRange(2, 1).getCell(1,1).getValue();
  //   } else if (SHEETS[i].getName().indexOf("返却")){
  //     // Logger.log(i);
  //     // Logger.log(SHEETS[i].getRange(2, 1).getCell(1,1).getValue());
  //     // timestamp[0] = 6;
  //     timestamp[i] = SHEETS[i].getRange(SHEETS[i].getLastRow(), 1).getCell(1,1).getValue();
  //     sortedTimestamp[i] = SHEETS[i].getRange(SHEETS[i].getLastRow(), 1).getCell(1,1).getValue();
  //   }
  // }
  // // let originalTimestamp = timestamp;
  // // Logger.log(timestamp);
  // // Logger.log(sortedTimestamp);
  // sortedTimestamp.sort(function(a, b) {return b - a;});
  // // Logger.log(timestamp);
  // // Logger.log(sortedTimestamp);

  // for (let i = 0; i < SHEETS.length; i++){
  //   if (sortedTimestamp[0] == timestamp[i]){
  //     // Logger.log(sortedTimestamp[0]);
  //     // Logger.log(i);
  //     // Logger.log(timestamp[i]);
  //     var sheet = SHEETS[i];
  //     var sheetName = SHEETS[i].getName().split("-");
  //     var bookNumber = sheetName[0];
  //   }
  // }
// Logger.log(bookNumber);
// Logger.log(sheet.getName());

  // if (sheet.getName().indexOf("返却")　>= 0){
  //   return;
  // }//エラー？　要らない？
  
  // let bookData = {"bookNumber" : "1", "sheetName" : "1-貸出"};//TODO:引数

  let sheet = TriggerSS.getSheetByName(bookData.sheetName);

  let lastColomn = sheet.getLastColumn();
  let range = sheet.getRange(2, lastColomn - 3, 1, 4);

  let answers = {};
  answers.bookNumber = bookData.bookNumber;
  answers.employeeName = range.getCell(1, 1).getValue();
  answers.employeeNumber = range.getCell(1, 2).getValue();
  answers.borrowDate = range.getCell(1, 3).getValue();
  answers.backDeadline = range.getCell(1, 4).getValue();
   Logger.log(answers);
  return answers;
}


function InsertBorrowLogData(answers){
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  let sheets = SS.getSheets();

  // var answers = {
  //   "bookNumber": 1,
  //   "employeeName": "山田太郎",
  //   "employeeNumber": 0000,
  //   "borrowDate": new Date,
  //   "backDeadline": new Date
  // };//TODO:配列から取ってくる

  for (let i = 2; i < sheets.length; i++){
    // Logger.log(sheets[i]);
    // Logger.log(sheets[i].getName());
    if (sheets[i].getName().indexOf(answers.bookNumber) < 0){
      return;
    }
    //TODO:ひとつもないorふたつ以上あったらエラー
    let range = sheets[i].getRange("B:E")
    let lastRow = sheets[i].getLastRow();
    range.getCell(lastRow +1, 1).setValue(answers.employeeName);
    range.getCell(lastRow +1, 2).setValue(answers.employeeNumber);
    range.getCell(lastRow +1, 3).setValue(answers.borrowDate);
    range.getCell(lastRow +1, 4).setValue(answers.backDeadline);
  
  }
}

function ResisterStatus(answers){
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  // var answers = {
  //   "bookNumber": 1,
  //   "employeeName": "山田太郎",
  //   "employeeNumber": 0000,
  //   "borrowDate": new Date,
  //   "backDeadline": new Date
  // };//TODO:配列から取ってくる

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

function UpdateFormByBorrow(answers) {
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  // var answers = {"bookNumber": 1, "backDeadline": new Date};//TODO:配列から取ってくる
  // answers.backDeadline = '"' + xxx +'"';
  //  Logger.log(answers.backDeadline);
  // answers.backDeadline.toString();
  // Logger.log(answers.backDeadline);
  answers.backDeadline = Utilities.formatDate(answers.backDeadline,"JST", "yyyy/MM/dd");

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
