function ResetStatus(){

  
}

function UpdateFormByBack() {
  const SS = SpreadsheetApp.openById("1d-DK2eNTH6iUVlj_kyNE6lvSp20eQiIR1ydu-6lf9RA");
  const STATUS_SHEET = SS.getSheetByName("貸出状況");
  let range = STATUS_SHEET.getRange("A:G");
  let lastRow = STATUS_SHEET.getLastRow();

  var answers = {"bookNumber": 1};//TODO:配列から取ってくる

  for (let i = 2; i <= lastRow; i++){
    if (range.getCell(i, 1).getValue() == answers.bookNumber){
      var formId = range.getCell(i, 7).getValue();
      //TODO:ひとつもないorふたつ以上あったらエラー
    }
  }

  var form = FormApp.openById(formId);
 
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
