  // const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
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



function CreateNewForm() {
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  let bookNumber = range.getCell(lastRow, 1).getValue();
  let bookTitle = range.getCell(lastRow, 2).getValue();

  let borrowForm;
  let backForm;

  let borrowFormTitle = bookNumber + "-『" + bookTitle + "』の貸出";
  let backFormTitle = bookNumber + "-『" + bookTitle + "』の返却";


  borrowForm = FormApp.create(borrowFormTitle);
  let borrowFormId = borrowForm.getId();
  let borrowFormFile = DriveApp.getFileById(borrowFormId);

  // borrowForm.setDescription();
  borrowForm.addTextItem().setTitle("お名前").setRequired(true);
  borrowForm.addTextItem().setTitle("社員番号").setRequired(true);//半角数字のみにしてみたい！
  borrowForm.addDateItem().setTitle('貸出日').setRequired(true);
  borrowForm.addDateItem().setTitle('返却日').setRequired(true);

  DriveApp.getFolderById("1-Ewm2Q3zt7fA2OVeePWFqgukVWB9rhG1").addFile(borrowFormFile);
  DriveApp.getRootFolder().removeFile(borrowFormFile);
  range.getCell(lastRow, 7).setValue(borrowFormId);


  backForm = FormApp.create(backFormTitle);
  let backFormId = backForm.getId();
  let backFormFile = DriveApp.getFileById(backFormId);
 
  // backForm.setDescription();
  backForm.addTextItem().setTitle("お名前").setRequired(true);
  backForm.addTextItem().setTitle("社員番号").setRequired(true);//半角数字のみにしてみたい！
  backForm.addDateItem().setTitle('返却日').setRequired(true);
   
  DriveApp.getFolderById("1-Ewm2Q3zt7fA2OVeePWFqgukVWB9rhG1").addFile(backFormFile);
  DriveApp.getRootFolder().removeFile(backFormFile);

  const TRIGGER_SS = SpreadsheetApp.getActiveSpreadsheet();
 // let borrowSheet = TRIGGER_SS.insertSheet(bookNumber + "貸出");

  // let name = "あフォームの回答";
  // let flag = name.indexOf("フォームの回答");

//フォームとシートを紐づけ
  borrowForm.setDestination(FormApp.DestinationType.SPREADSHEET, TRIGGER_SS.getId());
//紐づけされたシートの名前変更
  var triggerSheets = TRIGGER_SS.getSheets();
  // Logger.log(triggerSheets);
  for (let i = 0; i < triggerSheets.length; i++) {
    let sheetName = triggerSheets[i].getName();
    if (sheetName.indexOf("フォームの回答") >= 0) {
        triggerSheets[i].setName(bookNumber + "-貸出");
        //TODO:フラグを立てて、２枚以上のシートが検索にヒットしたらエラー
    }
  }
//  var flag = 0;
//フォームとシートを紐づけ
  backForm.setDestination(FormApp.DestinationType.SPREADSHEET, TRIGGER_SS.getId());
//紐づけされたシートの名前変更
  // const TRIGGER_SS2 = SpreadsheetApp.getActiveSpreadsheet();
  var triggerSheets = TRIGGER_SS.getSheets();
  // Logger.log(triggerSheets);

// var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
// var name0 = triggerSheets[0].getName();
// var name1 = triggerSheets[1].getName();
// var name2 = triggerSheets[2].getName();
  for (let i = 0; i < triggerSheets.length; i++) {
        // Logger.log(triggerSheets[i].getName());
        // Logger.log(i);

    let sheetName = triggerSheets[i].getName();
    if (sheetName.indexOf("フォームの回答") >= 0) {
        // flag++;
        triggerSheets[i].setName(bookNumber + "-返却");
        // triggerSheets[i].getRange(2,6).getCell(2,6).setValue(1);
        // Logger.log("入った！");
        // Logger.log(i);
        //TODO:フラグを立てて、２枚以上のシートが検索にヒットしたらエラー
    }
  }

}

// function countSheet(){
//   const SS =SpreadsheetApp.getActiveSpreadsheet();
//   var number = SS.getSheets();
//   SS.insertSheet("新規");
//   var number = SS.getSheets();
// }