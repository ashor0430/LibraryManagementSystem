function TruncateLogSheet() {
  let bookData = {sheetName : 1};
  const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = TriggerSS.getSheets(bookData.sheetName);

  for (var i = 0; i < sheets.length; i++){
    if (sheets[i].getName().lastIndexOf("貸出") >= 0){
      // Logger.log("入った");
      // Logger.log(i);
      // Logger.log(sheets[i].getName());
      // Logger.log(sheets[i].getName().lastIndexOf("貸出"));
      // var range = sheets[i].getRange("B:M");
      // var lastRow = sheets[i].getLastRow();
      // var cells1 = sheets[i].getRange(lastRow + 1, 2, 1, 4);
      // var cells2 = sheets[i].getRange(2, 6, 1, 4);
      // var cell3 = sheets[i].getRange(2, 9).getCell(1, 1);
      // Logger.log(sheets[i].getRange(2, 9).getCell(1, 1).isBlank());
      var flag = 0;
      while (sheets[i].getRange(2, 10).getCell(1, 1).isBlank() == false){
        var lastRow = sheets[i].getLastRow();
        var cells1 = sheets[i].getRange(lastRow + 1, 2, 1, 4);
        var cells2 = sheets[i].getRange(2, 6, 1, 4);

        cells1.setValues(cells2.getValues());
        // Logger.log(sheets[i]);
        sheets[i].deleteColumns(6, 4);
        flag++
      }
      if (flag >=1){
        sheets[i].insertColumnsAfter(9, 4)
      }
    }
  }
}

function reTruncateLogSheet() {
  let bookData = {"sheetName" : "1-貸出"};
  const TriggerSS = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = TriggerSS.getSheetByName(bookData.sheetName);
  let lastColomn = sheet.getLastColumn();
  let lastRow = sheet.getLastRow();
  let range = sheet.getRange(2, 2, lastRow, lastColomn);
  
  for (let row = 1; row < lastRow ; i++){
    while (range.getCell(row, 1) != 0){
      let cells = sheet.getRange(row, 1, 1, 4).deleteCells(SpreadsheetApp.Dimension.COLUMNS)
    }

    if (sheet.getLastColomn() = 5){
      return;
    }
  }
}