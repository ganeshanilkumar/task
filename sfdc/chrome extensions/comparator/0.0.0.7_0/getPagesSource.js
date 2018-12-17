
function DOMtoString(document_root) {
	
 // get record ID From URL
 var recordId = getRecordIdFromUrl();
var objectAPIName; 
 if(recordId.substring(0, 3)=='01I')
 {
var htmlElements = document.getElementsByClassName('dataCol col02');

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
      if ((currentObjKeyPrefix=='01I' && generalMetadataResponse.sobjects[i].name==objectAPIName)||(generalMetadataResponse.sobjects[i].keyPrefix == currentObjKeyPrefix)) 
		{
		
		//console.log('Querying for ' + generalMetadataResponse.sobjects[i].name);
			//Query metadata for the relevant object (as objectMetadataResponse)
			 askSalesforce(generalMetadataResponse.sobjects[i].urls.describe, function(responseText) {
       
			var objectMetadataResponse = JSON.parse(responseText);

			// prepare a new json var and hold the details of the record in this var
			var fields = {};
			
			// loop over the response and prepare the response such that the key is the field name and value is the array of metadata field and values
			for (var index in objectMetadataResponse.fields) 
			  {
                  fields[objectMetadataResponse.fields[index].name] = objectMetadataResponse.fields[index];
              }
		
          //Query data for the relevant object (as objectDataResponse) and merge it with objectMetadataResponse in the fields array 
          askSalesforce(objectMetadataResponse.urls.rowTemplate.replace("{ID}", recordId), function(responseText) {
           
		 var objectDataResponse = JSON.parse(responseText);
		
            for (var fieldName in objectDataResponse) {
              if (fieldName != 'attributes') {
                if (!fields.hasOwnProperty(fieldName)) {
                  fields[fieldName] = {};
                }
                fields[fieldName].dataValue = objectDataResponse[fieldName];
              }
            }
			
			         
            
			/*for (var index in fields) {
              var fieldTypeDesc = fields[index].type + ' (' + fields[index].length + ')';
			 // console.log('fields[index] is ' + fields[index]);
              fieldTypeDesc += (fields[index].calculated) ? '*' : '';
				srcMsg = srcMsg + 'srcRec' + fields[index].label + '#1601#' + fields[index].name + '#1601#'
				 + fields[index].dataValue + '#1601#'  + fieldTypeDesc + '#1601#';
			//	console.log(' Label is ' + fields[index].label);
			//	console.log(' name is ' + fields[index].name);
			//	console.log(' dataValue is ' + fields[index].dataValue);
			//	console.log(' fieldTypeDesc is ' + fieldTypeDesc);
				
              
            }*/
			
			
			var srcRecordDetail = JSON.stringify(fields);
			//console.log('Generated Response JSON string= ' + srcRecordDetail);
			
			// send the record details to the background page.
			chrome.extension.sendMessage({
											action: "getSource",
											source: srcRecordDetail
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

	

	
	return ;
	
}

chrome.extension.sendMessage({
    action: "getSource",
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
    if (location.hostname.indexOf("force.com") > -1) 
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