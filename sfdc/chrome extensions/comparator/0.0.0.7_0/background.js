// @author Rajiv Bhatt rajiv.ashok.bhatt@gmail.com
// Date March 4, 2014
// version 0.0.1

var SFProdDiffMapStr;

function addtoLocalStorage(msg) {

localStorage.setItem('sourceRecordMetadata',msg);
};


function getLocalStorageStr()
{
SFProdDiffMapStr = localStorage.getItem('sourceRecordMetadata');
localStorage.removeItem('sourceRecordMetadata');
return SFProdDiffMapStr;
};



// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains salesforce.com
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'force.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});



pop_alert = function(passed_message) {
	 //console.log('bg message to target ' + passed_message);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	 for(var i=0;i<tabs.length;i++)
	 {
	 //console.log('sending message to  ' + tabs[i].title);
        chrome.tabs.sendMessage(tabs[0].id, {message: passed_message},
            function(response) {  }
        );
		}
    });
}