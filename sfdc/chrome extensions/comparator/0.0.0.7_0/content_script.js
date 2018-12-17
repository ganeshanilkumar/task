// @author Rajiv Bhatt rajiv.ashok.bhatt@gmail.com
// Date Sept 29, 2014
// version 0.0.1

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

	localStorage.setItem('sourceRecordMetadata',request.message);
    }
);