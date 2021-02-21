function BackBook(bookData, SS){
  
  // let bookData = {"bookNumber": 1, "sheetName" : "1-貸出"};//TODO:引数

  let answers = GetBackData(bookData);

  InsertBackLogData(answers, SS);

  ResetStatus(answers, SS);

  UpdateFormByBack(answers, SS);
}

function GetBackData(bookData){
  const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
  // const SHEETS = TriggerSS.getSheets();
  // let timestamp = [];
  // let sortedTimestamp = [];

  // for (let i = 0; i < SHEETS.length; i++){

  //   if (SHEETS[i].getName().indexOf("貸出") >= 0){
 
  //     timestamp[i] = SHEETS[i].getRange(2, 1).getCell(1,1).getValue();
  //     sortedTimestamp[i] = SHEETS[i].getRange(2, 1).getCell(1,1).getValue();

  //   } else if (SHEETS[i].getName().indexOf("返却")){

  //     timestamp[i] = SHEETS[i].getRange(SHEETS[i].getLastRow(), 1).getCell(1,1).getValue();
  //     sortedTimestamp[i] = SHEETS[i].getRange(SHEETS[i].getLastRow(), 1).getCell(1,1).getValue();
    
  //   }
  // }

  // sortedTimestamp.sort(function(a, b) {return b - a;});
 
  // for (let i = 0; i < SHEETS.length; i++){
  //   if (sortedTimestamp[0] == timestamp[i]){
  //     var sheet = SHEETS[i];
  //     var sheetName = SHEETS[i].getName().split("-");
  //     var bookNumber = sheetName[0];
  //   }
  // }

  // if (sheet.getName().indexOf("貸出")　>= 0){
  //   return;
  // }
  // let bookData = {"bookNumber" : "1", "sheetName" : "1-返却"};//TODO:引数

  let sheet = TriggerSS.getSheetByName(bookData.sheetName);

  let lastRow = sheet.getLastRow();
  let range = sheet.getRange("B:D");

  let answers = {};
  answers.bookNumber = bookData.bookNumber;
  answers.employeeName = range.getCell(lastRow, 1).getValue();
  answers.employeeNumber = range.getCell(lastRow, 2).getValue();
  answers.backDate = range.getCell(lastRow, 3).getValue();
  // Logger.log(answers);
  return answers;
}

function InsertBackLogData(answers, SS){
//  var answers = {
//   "bookNumber": 1,
//   "employeeName": "山田太郎",
//   "employeeNumber": 1111,
//   "borrowDate": new Date,
//   "backDeadline": new Date
//   };//TODO:配列から取ってくる

//   const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");

  let error = {};
  error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  error.book = answers.bookNumber　+ "-返却";
  error.employeeName = answers.employeeName;
  error.employeeNumber = answers.employeeNumber;
  error.formAnswer1 = answers.borrowDate;
  error.formAnswer2 = answers.backDeadline;
  error.where = "InsertBackLogData(BackManager)";

  // var answers = {"bookNumber" : 1}
  // Logger.log(answers.bookNumber);

  let sheet = SS.getSheetByName(answers.bookNumber);
  if (sheet == null || sheet == ""){
    error.what = "貸出履歴シート「" + answers.bookNumber + "」の取得に失敗しました";
    InsertError(error);
    return;
  }

  // Logger.log(sheets.getName());
  // var answers = {
  //   "bookNumber": 2,
  //   "employeeName": "山田太郎",
  //   "employeeNumber": 2222,
  //   "backDate": new Date,
  // };//TODO:配列から取ってくる

  // for (let i = 2; i < sheets.length; i++){
    // Logger.log(sheets[i]);
    // Logger.log(sheets[i].getName());
    // if (sheets[i].getName().indexOf(answers.bookNumber) < 0){
      // continue;
    // }
    //TODO:ひとつもないorふたつ以上あったらエラー
  let range = sheet.getRange("B:F");
  let flag = 0;
  for (let row = 2; row <= sheet.getLastRow(); row++){
    if (range.getCell(row, 2).getValue() == answers.employeeNumber && range.getCell(row, 5).isBlank()){
      if (flag > 0){
        error.what = "こちらの社員番号による，返却のない貸出記録が２か所以上見つかりました";
        InsertError(error);
        return;
      }
      range.getCell(row, 5).setValue(answers.backDate);
      flag++;
    }
  }
  if (flag == 0){
    error.what = "こちらの社員番号による，返却のない貸出記録が見つかりませんでした";
    InsertError(error);
    return;
  }

  // }
}



function ResetStatus(answers, SS){

//  var answers = {
//   "bookNumber": 1,
//   "employeeName": "山田太郎",
//   "employeeNumber": 0000,
//   "borrowDate": new Date,
//   "backDeadline": new Date
//   };//TODO:配列から取ってくる

//   const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");

  let error = {};
  error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  error.book = answers.bookNumber　+ "-返却";
  error.employeeName = answers.employeeName;
  error.employeeNumber = answers.employeeNumber;
  error.formAnswer1 = answers.borrowDate;
  error.formAnswer2 = answers.backDeadline;
  error.where = "ResetStatus(BackManager)";

  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  if (STATUS_SHEET == null || STATUS_SHEET == ""){
    error.what = "スプレッドシート「図書貸出管理」内，「貸出状況」シートの名前が間違っています";
    InsertError(error);
    return;
  }
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  // var answers = {"bookNumber": 3};

  let flag = 0;
  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      if (flag > 0){
        error.what = "「貸出状況」シートから書籍番号" + answers.bookNumber + "が２か所以上見つかりました";
        InsertError(error);
        return;
      }
      let cells = STATUS_SHEET.getRange(i, 3, 1, 4);
      cells.clear();
      flag++;
    }
  }
  if (flag == 0){
    error.what = "「貸出状況」シートから書籍番号が見つかりませんでした";
    InsertError(error);
    return;
  }
}

function UpdateFormByBack(answers, SS) {

  let error = {};
  error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  error.book = answers.bookNumber　+ "-返却";
  error.employeeName = answers.employeeName;
  error.employeeNumber = answers.employeeNumber;
  error.formAnswer1 = answers.borrowDate;
  error.formAnswer2 = answers.backDeadline;
  error.where = "UpdateFormByBack(BackManager)";

  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  if (STATUS_SHEET == null || STATUS_SHEET == ""){
    error.what = "スプレッドシート「図書貸出管理」内，「貸出状況」シートの名前が間違っています";
    InsertError(error);
    return;
  }
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  // var answers = {"bookNumber": 1};//TODO:配列から取ってくる
  if (answers.bookNumber == null || answers.bookNumber == ""){
    error.what = "answersが取得できませんでした";
    InsertError(error);
    return;
  }

  let flag = 0;
  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      if (flag > 0){
        error.what = "「貸出状況」シートから書籍番号" + answers.bookNumber + "が２か所以上見つかりました";
        InsertError(error);
        return;
      }
      var formId = range.getCell(i, 7).getValue();
      flag++;//TODO:ひとつもないorふたつ以上あったらエラー
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
  form.setDescription("");
  form.addTextItem().setTitle("お名前").setRequired(true);
  const validation = FormApp.createTextValidation().requireNumber().build();
  form.addTextItem().setTitle("社員番号").setRequired(true).setValidation(validation);
  form.addDateItem().setTitle('貸出日').setRequired(true);
  form.addDateItem().setTitle('返却日').setRequired(true);
}
