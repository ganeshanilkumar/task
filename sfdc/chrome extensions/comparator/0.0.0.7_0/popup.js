// @author Rajiv Bhatt rajiv.ashok.bhatt@gmail.com
// Date September 30, 2014
// version 0.0.1






document.addEventListener('DOMContentLoaded',function() {
  $('#getSrcBtn').click(function() {
    
	var message = document.querySelector('#message');
	
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
	message.innerText="Please wait... Fetching Record Metadata...";
    if (chrome.extension.lastError) {
    //  message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
	message.innerText = 'Please use this extension only after opening up a valid record in Salesforce.com';
    }
  });
  
  

  });
  
    $('#getTgtBtn').click(function() {
    
	var message = document.querySelector('#message');
	//console.log('bg page is ' + chrome.extension.getBackgroundPage());
	//console.log('1local storage ext is ' + chrome.extension.getBackgroundPage().getLocalStorageStr());
	//console.log('2local storage ext is ' + chrome.extension.getBackgroundPage().SFProdDiffMapStr);
	var bg = chrome.runtime.getBackgroundPage(function (page) {  
     bg  = page;
	//console.log('Got background page ' + bg);
	bg.pop_alert(bg.getLocalStorageStr());
	chrome.tabs.executeScript(null, {
    code: 'var config = 123'
}, function() {
    chrome.tabs.executeScript(null, {file: 'getPagesSourceForTarget.js'},function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
	message.innerText="Please wait... Fetching Record Metadata...";
    if (chrome.extension.lastError) {
      // message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
	  message.innerText = 'Please use this extension only after opening up a record in Salesforce.com';
    }
  });
});
		});
	 //console.log('sending message to target');

	 

//bg.pop_alert(chrome.runtime.getBackgroundPage().getLocalStorageStr());
		


  /*chrome.tabs.executeScript(null, {
    file: "getPagesSourceForTarget.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      // message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
	  message.innerText = 'Please use this extension only after opening up a record in Salesforce.com';
    }
  });*/
	
  });
  
  
} );

chrome.extension.onMessage.addListener(function(request, sender) {
 
 //console.log('executing addListener');
  if (request.action == "getSource") {
   // message.innerText = request.source;
//	console.log(request.source);
//console.log('in popup event listener');
 var message = document.querySelector('#message');	
	
	if(request.source.indexOf("Unknown salesforce object") > -1)
	{
	message.innerText = request.source;
	}
	else
	{
	message.innerText="Parsed successfully. Please select the target record.";
	chrome.runtime.getBackgroundPage(function (page) {  
     bg  = page;
	//console.log('Got background page ' + bg);
	bg.addtoLocalStorage(request.source);
	});
	}
  }
  else
  {
  //console.log('action is getTarget');
  var message = document.querySelector('#message');
	message.innerText='Process Complete. Please check the popup for all the differences.';
	//message.innerText='Process Complete. Found ' + request.source + ' differences.';
  }

  
});



function onWindowLoad() {

  
var message = document.querySelector('#message');
message.innerHTML = "";
}

window.onload = onWindowLoad;



