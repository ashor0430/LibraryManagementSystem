function InsertError(error) {
  // let error = {};//TODO:引数
  // error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  // error.book = 1 + "貸出";
  // error.employeeName = "山田太郎";
  // error.employeeNumber = 1111;
  // error.formAnswer1 = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  // error.formAnswer2 = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  // error.where = "xxx";
  // error.what = "こんなエラーが起こりました";

  
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  // Logger.log(SS.getName());
  const ERROR_SHEET = SS.getSheetByName("エラー用");
  // Logger.log(ERROR_SHEET);
  let lastRow = ERROR_SHEET.getLastRow();
  Logger.log(lastRow);
  let range = ERROR_SHEET.getRange(lastRow + 1, 1, 1, 9);
  range.getCell(1,1).setValue("未");
  range.getCell(1,2).setValue(error.timestamp);
  range.getCell(1,3).setValue(error.book);
  range.getCell(1,4).setValue(error.employeeName);
  range.getCell(1,5).setValue(error.employeeNumber);
  range.getCell(1,6).setValue(error.formAnswer1);
  range.getCell(1,7).setValue(error.formAnswer2);
  range.getCell(1,8).setValue(error.where);
  range.getCell(1,9).setValue(error.what);
  return;
}
