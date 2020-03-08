function getNamesList()
{
   var sheet=getSheetByName('names');
  var lastRow=sheet.getLastRow();
  var res='';
  var data=sheet.getRange(1,2,lastRow).getValues();
  for(var i=0;i<data.length;i++)
  {
    if(i!=0)
      res+=',';
   res+= data[i][0];
  }
  Logger.log(res);
}


function getSheetByName(name)
{
  var spread=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=spread.getSheetByName(name);
   if (sheet == null) //create if new id
            {
                sheet = spread.insertSheet();
                sheet.setName(name);
            }
  return sheet;
}

function getFaceName(faceId)
{
  var sheet=getSheetByName('names');
  var lastRow=sheet.getLastRow();
  if(lastRow>0){
  var data=sheet.getRange(1,1,lastRow,2).getValues();
  for(var i=0; i<data.length; i++)
  {
    if(data[i][0]==faceId)
      return data[i][1];
  }
  }
  sheet.getRange(lastRow+1,1).setValue(faceId);
  var name="name"+faceId;
  sheet.getRange(lastRow+1,2).setValue(name);
  return name;
}


function doGet(e)
{
  
  var getNames=e.parameters.getnames;
    if (typeof getNames!= 'undefined') {
      var res='';
    var sheet=getSheetByName('names');
      var data=sheet.getRange(1, 2, sheet.getLastRow()).getValues();
      if(data.length==0)
        res='-1';
      else
      for(var i=0; i<data.length; i++)
      {
        if(i!=0)
          res+=',';
        res+=data[i];
      }
      return ContentService.createTextOutput(res);
    }
  
  var faceId=e.parameters.faceid;
  if(typeof faceId!='undefined'){
  var name=getFaceName(faceId);
  
  var logsheet=getSheetByName('log');
  var lastRow=logsheet.getLastRow();

  logsheet.getRange(lastRow+1,1).setValue(faceId);
  logsheet.getRange(lastRow+1,2).setValue(name);
    logsheet.getRange(lastRow+1,3).setValue(new Date());

  return ContentService.createTextOutput("Ok");
  }
  return ContentService.createTextOutput("nothing to do");
}


