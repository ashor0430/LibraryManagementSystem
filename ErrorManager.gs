function InsertError() {
  let error = {};//TODO:引数
  error.timestamp = new Date(),"JST", "yyyy/MM/dd HH:mm:ss";
  error.whichFunction = "xxx";
  error.book = 1 + "貸出";
  error.employeeName = "山田太郎";
  error.employeeNumber = 1111;
  error.formAnswer1 = 2020/01/01;
  error.formAnswer2 = 2020/01/14;
  error.where = "ここでエラーが起こりました";
  error.what = "こんなエラーが起こりました";

  
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  // Logger.log(SS.getName());
  const ERROR_SHEET = SS.getSheetByName("エラー用");
  // Logger.log(ERROR_SHEET);
  let lastRow = ERROR_SHEET.getLastRow();
  Logger.log(lastRow);
  let range = ERROR_SHEET.getRange(lastRow + 1, 2, 1, 8);
  range.getCell(1,1).setValue(error.timestamp);
  range.getCell(1,2).setValue(error.book);
  range.getCell(1,3).setValue(error.employeeName);
  range.getCell(1,4).setValue(error.employeeNumber);
  range.getCell(1,5).setValue(error.formAnswer1);
  range.getCell(1,6).setValue(error.formAnswer2);
  range.getCell(1,7).setValue(error.where);
  range.getCell(1,8).setValue(error.what);
}
