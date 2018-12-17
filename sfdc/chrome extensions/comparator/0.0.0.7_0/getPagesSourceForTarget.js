



function DOMtoString(document_root) {

 // get record ID From URL
	var recordId = getRecordIdFromUrl();
	var objectAPIName; 
 if(recordId.substring(0, 3)=='01I')
 {

var htmlElements = document_root.getElementsByClassName('dataCol col02');

if(htmlElements!=null && htmlElements.length > 0)
{
	for(var i = 0; i < htmlElements.length;i++)
	{

		if( htmlElements[i].previousSibling.innerHTML!=null &&  htmlElements[i].previousSibling.innerHTML.length>0 &&  htmlElements[i].previousSibling.innerHTML =='API Name')
		{
		objectAPIName = htmlElements[i].innerHTML;

		}
	}

}
	}



 // Load a blank page and then inject the HTML 
  // An empty string as URL loads about:blank synchronously
	var popupWin;
    popupWin = open('', '', 'width=1050,height=800');
	var document = popupWin.document;
  document.head.innerHTML = '\
  <title>Please Wait... Loading all data...</title>\
  <style>\
  body {\
    font-family: Arial, Helvetica, sans-serif;\
    font-size: 11px;\
  }\
  table {\
    width: 100%;\
    border-spacing: 0px;\
    font-size: 11px;\
    word-wrap: break-word;\
    white-space: pre-wrap;\
    table-layout: fixed;\
  }\
  tr.calculated {\
    color: #777777;\
    background-color: #CCCCCC;\
    font-style: italic;\
  }\
  tr:hover, tr.calculated:hover {\
    background-color: lightblue;\
  }\
  th {\
    text-align: left;\
  }\
  .field-label {\
    width: 20em;\
  }\
  .target-field-label {\
    width: 20em;\
  }\
  .field-name {\
    text-decoration: underline;\
	width: 20em;\
  }\
  .field-name-noissue {\
    text-decoration: underline;\
	color: rgb(0, 193, 12);\
    width: 20em;\
  }\
  .field-name-datavalue-mismatch {\
    text-decoration: underline;\
	color: red;\
    width: 20em;\
  }\
  .field-name-metadata-mismatch {\
    text-decoration: underline;\
	color: rgb(239, 0, 239);\
    width: 20em;\
  }\
 .field-name-data-and-metadata-mismatch {\
    text-decoration: underline;\
	color: gold;\
    width: 20em;\
  }\
 .field-name-missing-in-target {\
    text-decoration: underline;\
	color: rgb(101, 98, 227);\
    width: 20em;\
  }\
   .field-name-missing-in-source {\
    text-decoration: underline;\
	color: rgb(46, 194, 203);\
    width: 20em;\
  }\
  .field-value {\
    text-align: right;\
  }\
  .target-field-value {\
    text-align: right;\
  }\
  .field-type {\
    text-align: right;\
    width: 9em;\
  }\
  .target-field-type {\
    text-align: right;\
    width: 9em;\
  }\
  #fieldDetailsView {\
    display: none;\
    position: fixed;\
    top: 0;\
    right: 0;\
    bottom: 0;\
    left: 0;\
    background: rgba(0,0,0,0.8);\
    z-index: 99999;\
  }\
  \
  #fieldDetailsView > div.container {\
    width: 400px;\
    height: 500px;\
    position: relative;\
    margin: 10% auto;\
    border-radius: 10px;\
    background: #fff;\
  }\
  #fieldDetailsView > div.container > div.mainContent {\
    overflow: auto;\
    height: 470px;\
    padding: 5px 20px 13px 20px;\
  }\
  .closeLnk {\
    background: #606061;\
    color: #FFFFFF;\
    line-height: 25px;\
    position: absolute;\
    right: -12px;\
    text-align: center;\
    top: -10px;\
    width: 24px;\
    text-decoration: none;\
    font-weight: bold;\
    border-radius: 12px;\
    box-shadow: 1px 1px 3px #000;\
  }\
  .closeLnk:hover {\
    background: #00d9ff;\
  }\
  </style>\
  ';

  document.body.innerHTML = '\
  <h1 id="headingMain" align="center" style"color:#039;">Record and Metadata Comparator</h1>\
  <h2 id="heading" background="wheat">Please Wait... Loading all data...<img src="http://simplysalesforcedotcom.files.wordpress.com/2014/09/spinner-gif-red.gif" style="height:20;"/></h2>\
  <table style="width:25%;"><tr><h4>Legend: &nbsp;&nbsp;<font class="field-name-datavalue-mismatch">Data Mismatch</font>&nbsp;&nbsp;&nbsp;<font class="field-name-metadata-mismatch">Metadata Mismatch</font>&nbsp;&nbsp;&nbsp;<font class="field-name-data-and-metadata-mismatch">Data and Metadata Mismatch</font>\
  &nbsp;&nbsp;&nbsp;<font class="field-name-missing-in-source">Field missing in Source Org</font>&nbsp;&nbsp;&nbsp;<font class="field-name-missing-in-target">Field missing in Target Org</font>&nbsp;&nbsp;&nbsp;<font class="field-name-noissue">No Issue</font></h4></tr></table>\
  <table style="background:aliceblue;">\
  <thead>\
  <th class="field-name">API Name</th>\
  <th class="field-label">Source Field Label</th>\
  <th class="target-field-label">Target Field Label</th>\
  <th class="field-value">Source Data Value</th>\
  <th class="target-field-value">Target Data Value</th>\
  <th class="field-type">Source Datatype</th>\
  <th class="target-field-type">Target Datatype</th>\
  </thead>\
  <tbody id="dataTableBody">\
  </tbody>\
  </table>\
  <div id="fieldDetailsView">\
  <div class="container">\
  <a href="#" class="closeLnk">X</a>\
  <div class="mainContent"></div>\
  </div>\
  </div>\
  ';
  
   //Setup eventlisteners for static content
 
	
	
	var srcRecordDetails = localStorage.getItem('sourceRecordMetadata');
	
	//console.log('source Record is ' + srcRecordDetails);
	
	
	//console.log('target Record is ' + recordId);
	
	//invoke salesforce rest api to get sObject Details
  askSalesforce('/services/data/v31.0/sobjects/', function(responseText) {
    
	// get the prefix of the current record
	var currentObjKeyPrefix = recordId.substring(0, 3);
    
	var matchFound = false;
    
	// parse the metadata response of /services/data/v31.0/sobjects/ as JSON
	var generalMetadataResponse = JSON.parse(responseText);
    
	// loop over the response and get the metadata details of the current object
	for (var i = 0; i < generalMetadataResponse.sobjects.length; i++) 
	 {
	   // when the prefix matches 
      if ( (currentObjKeyPrefix=='01I' && generalMetadataResponse.sobjects[i].name==objectAPIName)||(generalMetadataResponse.sobjects[i].keyPrefix == currentObjKeyPrefix) )
		{
			
			//console.log('Querying for ' + generalMetadataResponse.sobjects[i].name);
			var objectNameStr = generalMetadataResponse.sobjects[i].name;
			//Query metadata for the relevant object (as objectMetadataResponse)
			askSalesforce(generalMetadataResponse.sobjects[i].urls.describe, function(responseText) {
       
			var objectMetadataResponse = JSON.parse(responseText);

			// prepare a new json var and hold the details of the record in this var
			var fields = {};
			
			// loop over the response and prepare the response such that the key is the field name and value is the array of metadata field and values
			for (var index in objectMetadataResponse.fields) 
			  {
                  fields[objectMetadataResponse.fields[index].name] = objectMetadataResponse.fields[index];
				  fields[objectMetadataResponse.fields[index].name].isProcessed='false';
              }
		
          //Query data for the relevant object (as objectDataResponse) and merge it with objectMetadataResponse in the fields array 
          askSalesforce(objectMetadataResponse.urls.rowTemplate.replace("{ID}", recordId), function(responseText) {
			
			
			var compareOnlyMetadata = false;
			
			if(recordId!=null && ( recordId.length==3 || recordId.indexOf('/') > 0 || recordId.substring(0, 3)=='01I'))
			{
			  compareOnlyMetadata = true; 
			}
			  
		 var objectDataResponse = JSON.parse(responseText);
		
            for (var fieldName in objectDataResponse) {
              if (fieldName != 'attributes') {
                if (!fields.hasOwnProperty(fieldName)) {
                  fields[fieldName] = {};
                }
                fields[fieldName].dataValue = objectDataResponse[fieldName];
				
              }
            }
		      
           // console.log('SOURCE Record is ' + srcRecordDetails);
			
			var srcRecordJSON = JSON.parse(srcRecordDetails);
			var tgtRecordDetail = JSON.stringify(fields);
			//console.log('Generated TARGET Response JSON string= ' + tgtRecordDetail);
			
			if(compareOnlyMetadata)
			{
			
			document.title = 'Metadata Comparison Result for: ' + objectNameStr;
			document.querySelector('#heading').textContent= 'Metadata Comparison Result for: ' + objectNameStr ;
			}			
			else			
			{
			document.title = 'Record/Metadata Comparison Result: ' + objectDataResponse.attributes.type + ' (' + srcRecordJSON.Id.dataValue + ' vs ' + objectDataResponse.Id + ')';
			
			//document.querySelector('#heading').textContent = objectDataResponse.attributes.type + ' (' + srcRecordJSON.Name.dataValue + ' vs ' + objectDataResponse.Name + ')';
			document.querySelector('#heading').textContent=objectDataResponse.attributes.type + ' (' + srcRecordJSON.Id.dataValue + ' vs ' + objectDataResponse.Id + ')'
			}
			
			for (var index in srcRecordJSON) 
			{
              var targetFieldTypeDesc;
			  var sourceFieldTypeDesc;
			  
				
				
			if(srcRecordJSON[index].type == 'double' || srcRecordJSON[index].type == 'int' || srcRecordJSON[index].type == 'currency')
				{
				sourceFieldTypeDesc= srcRecordJSON[index].type + ' (' + srcRecordJSON[index].precision + ',' + srcRecordJSON[index].scale+')';
				}
				 else if(srcRecordJSON[index].type =='reference')
				 {
					sourceFieldTypeDesc= srcRecordJSON[index].type + ' (' + srcRecordJSON[index].referenceTo + ')';
				 }
				else if(srcRecordJSON[index].type =='boolean' || srcRecordJSON[index].type =='datetime' || 
				 srcRecordJSON[index].type =='date' || srcRecordJSON[index].type =='percent' )
				 {
				 sourceFieldTypeDesc= srcRecordJSON[index].type;
				 }
				else
				{
					sourceFieldTypeDesc= srcRecordJSON[index].type + ' (' + srcRecordJSON[index].length + ')';
				}
				
              sourceFieldTypeDesc += (srcRecordJSON[index].calculated) ? '*' : '';
			  
			if(fields.hasOwnProperty(index))
			{
			fields[index].isProcessed = 'true';
			
			if(fields[index].type == 'double' || fields[index].type == 'int' || fields[index].type == 'currency')
				{
				targetFieldTypeDesc= fields[index].type + ' (' + fields[index].precision + ',' + fields[index].scale+')';
				}
				 else if(fields[index].type =='reference') {
				 
					targetFieldTypeDesc= fields[index].type + ' (' + fields[index].referenceTo + ')';
				 }
				 else if(fields[index].type =='boolean' || fields[index].type =='datetime' || 
				 fields[index].type =='date' || fields[index].type =='percent' )
				 {
				 targetFieldTypeDesc= fields[index].type;
				 }
				else
				{
					targetFieldTypeDesc= fields[index].type + ' (' + fields[index].length + ')';
				}
				
              targetFieldTypeDesc += (fields[index].calculated) ? '*' : '';
			
			var className = 'field-name-noissue';
			
			var metadataMismatch = false;
			for(var fieldName in fields[index])
			{
				if( (fieldName=='autoNumber' || fieldName=='byteLength' || fieldName=='calculated' || fieldName=='calculatedFormula' || fieldName=='caseSensitive' || fieldName=='custom' || fieldName=='defaultValue' || fieldName=='defaultValueFormula' || fieldName=='defaultedOnCreate' || fieldName=='dependentPicklist' || fieldName=='digits' || fieldName=='label' || fieldName=='inlineHelpText' || fieldName=='length' || fieldName=='name' || fieldName=='nameField' || fieldName=='nillable' || fieldName=='picklistValues' || fieldName=='precision' || fieldName=='referenceTo' || fieldName=='scale' || fieldName=='soapType' || fieldName=='sortable' || fieldName=='unique' || fieldName=='updateable') && (JSON.stringify((fields[index])[fieldName])!=JSON.stringify((srcRecordJSON[index])[fieldName])))
					{
						
						metadataMismatch = true;
						className='field-name-metadata-mismatch';
						break;
					}
			
			}
			
		
			if(fields[index].dataValue != srcRecordJSON[index].dataValue)
			{
				if(metadataMismatch)
				{
					className='field-name-data-and-metadata-mismatch';
				}
				else
				{
					className='field-name-datavalue-mismatch';
				}
			}
			
			if(srcRecordJSON[index].name!=null)
			 addRowToDataTable(
                [srcRecordJSON[index].name,
				 srcRecordJSON[index].label,
				 fields[index].label,
                 srcRecordJSON[index].dataValue,
				 fields[index].dataValue,
                  sourceFieldTypeDesc,
				  targetFieldTypeDesc				  
                ], [{
                  class: className,
                  'data-all-sfdc-metadata': JSON.stringify(fields[index]), 
				  'data-all-sfdc-metadata-source': JSON.stringify(srcRecordJSON[index])
                },{
                  class: 'field-label'
                }, {
                  class: 'target-field-label'
                }, {
                  class: 'field-value'
                }, {
                  class: 'target-field-value'
                },{
                  class: 'field-type'
                },{
                  class: 'target-field-type'
                }], [function(event) {
                    showAllFieldMetadataUpdated(JSON.parse(event.currentTarget.getAttribute('data-all-sfdc-metadata')), JSON.parse(event.currentTarget.getAttribute('data-all-sfdc-metadata-source')));
                  },null,
                  null,
                  null,null,null,null
                ],
                (srcRecordJSON[index].calculated) ? 'calculated' : null
              );
			
			  
		
			  
			  
			}
			  else
			  {
				
				
				addRowToDataTable(
                [srcRecordJSON[index].name,
				 srcRecordJSON[index].label,
				 'Field Not Found on Target',
                  srcRecordJSON[index].dataValue,
                  'Field Not Found on Target',
                  sourceFieldTypeDesc,
				  'Field Not Found on Target'
                ], [{
                  class: 'field-name-missing-in-target',
                  'data-all-sfdc-metadata': JSON.stringify(srcRecordJSON[index])
                },{
                  class: 'field-label'
                }, {
                  class: 'target-field-label'
                }, {
                  class: 'field-value'
                }, {
                  class: 'target-field-value'
                },{
                  class: 'field-type'
                },{
                  class: 'target-field-type'
                }], [function(event) {
                    showAllFieldMetadata(JSON.parse(event.currentTarget.getAttribute('data-all-sfdc-metadata')));
                  },null,
                  null,
                  null,null,null,null
                ],
                (srcRecordJSON[index].calculated) ? 'calculated' : null
              );
			  
			  
			  
			  }
			  
			  
			  }
			  
			  
			  // loop over the 
			  for(index2 in fields)
			  {
			  
			  
				if(fields[index2].isProcessed=='false')
				 {
				 
					
					 addRowToDataTable(
                [fields[index2].name,
				 'Field Not Found on Source',
				 fields[index2].label,
				 'Field Not Found on Source',
				 fields[index2].dataValue,
                  'Field Not Found on Source', 
                  targetFieldTypeDesc				 
                ], [{
                  class: 'field-name-missing-in-source',
                  'data-all-sfdc-metadata': JSON.stringify(fields[index2])
                },{
                  class: 'field-label'
                }, {
                  class: 'target-field-label'
                }, {
                  class: 'field-value'
                }, {
                  class: 'target-field-value'
                },{
                  class: 'field-type'
                },{
                  class: 'target-field-type'
                }], [function(event) {
                    showAllFieldMetadata(JSON.parse(event.currentTarget.getAttribute('data-all-sfdc-metadata')));
                  },null,
                  null,
                  null,null,null,null
                ],
                (fields[index2].calculated) ? 'calculated' : null
              );
			  
			     }
			  }
			  
			   document.querySelector('#fieldDetailsView .closeLnk').addEventListener('click', function(event) {
    hideAllFieldMetadataView();
  });
			 function addRowToDataTable(cellData, cellAttributes, onClickFunctions, rowClass) {
    var tableRow = document.createElement('tr');
    tableRow.setAttribute('class', rowClass);

    for (var i = 0; i < cellData.length; i++) {
      var tableCell = document.createElement('td');
      for (var attributeName in cellAttributes[i]) {
        tableCell.setAttribute(attributeName, cellAttributes[i][attributeName]);
      }
      if (onClickFunctions[i] != null) {
        tableCell.addEventListener('click', onClickFunctions[i]);
      }
      tableCell.textContent = cellData[i];
      tableRow.appendChild(tableCell);
    }

    document.querySelector('#dataTableBody').appendChild(tableRow);
  }
  
   function showAllFieldMetadataUpdated(allFieldMetadata,allSourceFieldMetadata) {
   
	 var fieldDetailsView = document.querySelector('#fieldDetailsView');

    var heading = document.createElement('h3');
    heading.textContent = 'All available metadata for "' + allFieldMetadata.name + '"';


    var table = document.createElement('table');

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var thKey = document.createElement('th');
    var thValue = document.createElement('th');
	var thTargetValue = document.createElement('th');
    thKey.textContent = 'Key';
    thValue.textContent = 'Source Value';
	thTargetValue.textContent = 'Target Value';
    tr.appendChild(thKey);
    tr.appendChild(thValue);
	tr.appendChild(thTargetValue);
    thead.appendChild(tr);
    table.appendChild(thead);
	
    var tbody = document.createElement('tbody');
    for (var fieldMetadataAttribute in allSourceFieldMetadata) {
      var tr = document.createElement('tr');
      var tdKey = document.createElement('td');
      var tdValue = document.createElement('td');
	  var tdTargetValue = document.createElement('td');
      tdKey.textContent = fieldMetadataAttribute;
      tdValue.textContent = JSON.stringify(allSourceFieldMetadata[fieldMetadataAttribute]);
	  tdTargetValue.textContent = JSON.stringify(allFieldMetadata[fieldMetadataAttribute]);
	  if(tdValue.textContent!=tdTargetValue.textContent)
	  {
		tdKey.style.color = "red";
		tdValue.style.color = "red";
		tdTargetValue.style.color = "red";
		
	  }
      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
	  tr.appendChild(tdTargetValue);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    var mainContentElm = fieldDetailsView.querySelector('.mainContent');
    mainContentElm.textContent = '';
    mainContentElm.appendChild(heading);
    mainContentElm.appendChild(table);
    fieldDetailsView.style.display = 'block';
	
	
	
  }
   
   function showAllFieldMetadata(allFieldMetadata) {
   
	

   var fieldDetailsView = document.querySelector('#fieldDetailsView');

    var heading = document.createElement('h3');
    heading.textContent = 'All available metadata for "' + allFieldMetadata.name + '"';

    var table = document.createElement('table');

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var thKey = document.createElement('th');
    var thValue = document.createElement('th');
    thKey.textContent = 'Key';
    thValue.textContent = 'Value';
    tr.appendChild(thKey);
    tr.appendChild(thValue);
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    for (var fieldMetadataAttribute in allFieldMetadata) {
      var tr = document.createElement('tr');
      var tdKey = document.createElement('td');
      var tdValue = document.createElement('td');
      tdKey.textContent = fieldMetadataAttribute;
      tdValue.textContent = JSON.stringify(allFieldMetadata[fieldMetadataAttribute]);
      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    var mainContentElm = fieldDetailsView.querySelector('.mainContent');
    mainContentElm.textContent = '';
    mainContentElm.appendChild(heading);
    mainContentElm.appendChild(table);
    fieldDetailsView.style.display = 'block';
	
	
  }

  function hideAllFieldMetadataView() {
    var fieldDetailsView = document.querySelector('#fieldDetailsView');
    fieldDetailsView.style.display = 'none';
  }

 


  function sortTable(table, col, dir) {
    var tbody = table.tBodies[0];
    var rows = Array.prototype.slice.call(tbody.rows, 0);
    rows = rows.sort(function (a, b) {
      return dir * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
    });
    for (var i = 0; i < rows.length; ++i) {
      tbody.appendChild(rows[i]);
    }
  }

  function makeSortable(table) {
    var thead = table.tHead.rows[0].cells;
    var sortCol = 0;
    var sortDir = -1;
    for (var col = 0; col < thead.length; col++) {
      thead[col].tabIndex = 0;
      (function (col) {
        thead[col].addEventListener("click", function () {
          thead[sortCol].style.background = '';
          sortDir = col == sortCol ? -sortDir : 1;
          sortCol = col;
          thead[sortCol].style.backgroundImage = sortDir > 0 ? 'url(/img/colTitle_downarrow.gif)' : 'url(/img/colTitle_uparrow.gif)';
          sortTable(table, sortCol, sortDir);
        });
      }(col));
    }
  }
			localStorage.removeItem('sourceRecordMetadata');
chrome.extension.sendMessage({
    action: "getTarget",
    source: 'Process Complete'
});			
          });

        });

        matchFound = true;
        break;
      }
    }
    if (!matchFound) {
     // popupWin.alert('Unknown salesforce object. Unable to identify current page\'s object type based on key prefix: ' + currentObjKeyPrefix)
	  chrome.extension.sendMessage({
											action: "getSource",
											source: 'Unknown salesforce object. Unable to identify current page\'s object type based on key prefix: ' + currentObjKeyPrefix
					});
      return;
    }
  });
	
	
	
	//console.log('Storage size ' + JSON.stringify(localStorage).length);

	//return totalMismatchCount;
	return;
	
}


chrome.extension.sendMessage({
    action: "getTarget",
    source: DOMtoString(document)
});

function getRecordIdFromUrl() {
    var urlSearch = document.location.search;
    var recordId = urlSearch.indexOf('?id=') > -1 ? urlSearch.substring(urlSearch.indexOf('?id=') + '?id='.length)
        : urlSearch.indexOf('&id=') > -1 ? urlSearch.substring(urlSearch.indexOf('&id=') + '&id='.length)
        : document.location.pathname.substring(1);
    if (recordId.indexOf('&') > -1) {
        recordId = recordId.substring(0, recordId.indexOf('&'));
    }
    return recordId;
}

function askSalesforce(url, callback){
		var session;
	    var orgId = document.cookie.match(/(^|;\s*)sid=(.+?)!/)[2];
    if (location.hostname.indexOf(".salesforce.com") > -1) 
	{
        session = document.cookie.match(/(^|;\s*)sid=(.+?);/)[2];
	}

    if (!session) {
        alert("Session not found");
        callback();
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://" + document.location.hostname + url, true);
    xhr.setRequestHeader('Authorization', "OAuth " + session);
    xhr.setRequestHeader('Accept', "application/json");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
            //console.log(JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function askSalesforceMetadata(request, callback) {
    if (!session) {
        alert("Session not found");
        callback();
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://" + document.location.hostname + '/services/Soap/m/30.0', true);
    xhr.setRequestHeader('Content-Type', "text/xml");
    xhr.setRequestHeader('SOAPAction', '""');
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            callback(xhr.responseXML.documentElement.firstChild.firstChild);
        }
    }
    xhr.send('<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Header xmlns="http://soap.sforce.com/2006/04/metadata"><SessionHeader><sessionId>' + session + '</sessionId></SessionHeader></soapenv:Header><soapenv:Body xmlns="http://soap.sforce.com/2006/04/metadata">' + request + '</soapenv:Body></soapenv:Envelope>');
}


