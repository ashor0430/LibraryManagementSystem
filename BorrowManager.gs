function BorrowBook(bookData, SS){
  // Logger.log(bookData);
  
  // let bookData = {"bookNumber": 4, "sheetName" : "4-貸出"};//TODO:引数

  let answers = GetBorrowData(bookData);

  InsertBorrowLogData(answers, SS);

  ResisterStatus(answers, SS);

  UpdateFormByBorrow(answers, SS);
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

  // let lastColomn = sheet.getLastColumn();
  // let range = sheet.getRange(2, lastColomn - 3, 1, 4);

  // let answers = {};
  // answers.bookNumber = bookData.bookNumber;
  // answers.employeeName = range.getCell(1, 1).getValue();
  // answers.employeeNumber = range.getCell(1, 2).getValue();
  // answers.borrowDate = range.getCell(1, 3).getValue();
  // answers.backDeadline = range.getCell(1, 4).getValue();
  // Logger.log(sheet.getRange(6,1).getCell(1,1).getValue());
  let lastRow = sheet.getLastRow();
  // Logger.log(lastRow);
  let range = sheet.getRange(lastRow, 2, 1, sheet.getLastColumn());
  // Logger.log(sheet.getLastColumn());
  let col = 1;
  Logger.log("cell(1, col).getValue + " + range.getCell(1, col).getValue());
  while (range.getCell(1, col).isBlank()){
    Logger.log("while in");
    Logger.log(col);
    Logger.log(range.getCell(1, col).getValue());
    Logger.log(range.getCell(1, col).isBlank());
    col++
  }
  Logger.log(col);
  let answers = {};
  answers.bookNumber = bookData.bookNumber;
  answers.employeeName = range.getCell(1, col).getValue();
  answers.employeeNumber = range.getCell(1, col + 1).getValue();
  answers.borrowDate = range.getCell(1, col + 2).getValue();
  answers.backDeadline = range.getCell(1, col + 3).getValue();
  Logger.log(answers);
  return answers;
}


function InsertBorrowLogData(answers, SS){
  let sheet = SS.getSheetByName(answers.bookNumber);

  // var answers = {
  //   "bookNumber": 1,
  //   "employeeName": "山田太郎",
  //   "employeeNumber": 0000,
  //   "borrowDate": new Date,
  //   "backDeadline": new Date
  // };//TODO:配列から取ってくる

  // for (let i = 2; i < sheets.length; i++){
    // Logger.log(sheets[i]);
    // Logger.log(sheets[i].getName());
    // if (sheets[i].getName().indexOf(answers.bookNumber) < 0){
      // return;
    // }
    //TODO:ひとつもないorふたつ以上あったらエラー
    let range = sheet.getRange("B:E")
    let lastRow = sheet.getLastRow();
    range.getCell(lastRow +1, 1).setValue(answers.employeeName);
    range.getCell(lastRow +1, 2).setValue(answers.employeeNumber);
    range.getCell(lastRow +1, 3).setValue(answers.borrowDate);
    range.getCell(lastRow +1, 4).setValue(answers.backDeadline);
  
  // }
}

function ResisterStatus(answers, SS){
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  if (STATUS_SHEET == null || STATUS_SHEET == ""){
    let error = {};
    error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
    error.book = answers.bookNumber +"-貸出";
    error.employeeName = answers.employeeName;
    error.employeeNumber = answers.employeeNumber;
    error.formAnswer1 = answers.borrowDate;
    error.formAnswer2 = answers.backDeadline;
    error.where = "UpdateFormByBorrow(BorrowManager)";
    error.what = "スプレッドシート「図書貸出管理」内，「貸出状況」シートの名前が間違っています";
    InsertError(error);
    return;
  }

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

function UpdateFormByBorrow(answers){

  let error = {};
  error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  error.book = answers.bookNumber +"-貸出";
  error.employeeName = answers.employeeName;
  error.employeeNumber = answers.employeeNumber;
  error.formAnswer1 = answers.borrowDate;
  error.formAnswer2 = answers.backDeadline;
  error.where = "UpdateFormByBorrow(BorrowManager)";

  // var answers = {
  //   "bookNumber" : 1,
  //   "employeeName": "山田太郎",
  //   "employeeNumber": 1111,
  //   "borrowDate": new Date,
  //   "backDeadline": new Date
  // };//TODO:配列から取ってくる

  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  // Logger.log(STATUS_SHEET);
  if (STATUS_SHEET == null || STATUS_SHEET == ""){
    error.what = "スプレッドシート「図書貸出管理」内，「貸出状況」シートの名前が間違っています";
    InsertError(error);
    return;
  }
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  // var answers = {"bookNumber": 1, "backDeadline": new Date};//TODO:配列から取ってくる
  // answers.backDeadline = '"' + xxx +'"';
  //  Logger.log(answers.backDeadline);
  // answers.backDeadline.toString();
  // Logger.log(answers.backDeadline);
  if (answers.bookNumber == null || answers.bookNumber == "" 
      || answers.backDeadline == null || answers.backDeadline ==""){
    error.what = "answersが取得できませんでした";
    InsertError(error);
    return;
  }
  answers.backDeadline = Utilities.formatDate(answers.backDeadline,"JST", "yyyy/MM/dd");

  let flag = 0;
  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      if (flag > 0){
        error.what = "「貸出状況」シートから書籍番号" + answers.bookNumber + "が２か所以上見つかりました";
        InsertError(error);
        return;
      }
      var formId = range.getCell(i, 7).getValue();
      flag++;
    }
  }
  if (flag == 0){
    error.what = "「貸出状況」シートから書籍番号が見つかりませんでした";
    InsertError(error);
    return;
  }
  if (formId == null || formId == ""){
    error.what = "「貸出状況」シートにフォームIDがありません";
    InsertError(error);
    return;
  }
  
  // var formId = statusRange.getCell(BookNumber + 1, 7).getValue();

  var form = FormApp.openById(formId);
  if (form == null || form == ""){
    error.what = "「貸出状況」シートのフォームIDが間違っています";
    InsertError(error);
    return;
  }
 
  let items = form.getItems();  
  for (let i = 0; i < items.length; i++){
    form.deleteItem(items[i]);
  }
  form.setDescription("貸出中につき現在借りられません。しばらくお待ちください。 \n返却予定日：" + answers.backDeadline);
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
