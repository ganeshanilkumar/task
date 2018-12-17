var instance,host = window.location.host.split('.');

for (var i = 0;i <host.length;i++) {
	var temp = host[i].toLowerCase();
	if ((temp == 'my' || temp == 'lightning') && i > 0) {
		instance = host[i-1].toLowerCase();
		break;
	} else if (temp.indexOf('--') > -1) {
		instance = temp;
	} else if ((/^(na|ap|eu|cs|gs)\d+$/).test(temp)) {
		if (instance && temp.substring(0,2) != 'cs')
			instance = instance.split('--')[0];
		else if (instance) {
			if (instance.split('--').length == 3)
				instance = instance.substring(0,instance.lastIndexOf('--'));
		} else
			instance = temp;
		break;
	}
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

if (instance) {
	document.querySelectorAll("link[rel~='icon']").remove();
	var link;
	
	if (!link) {
	  link = document.createElement("link");
	  link.setAttribute("rel", "icon");
	  document.head.appendChild(link);
	}
	
	chrome.extension.sendRequest({url: window.location.href,instance: instance}, function(response) {
		console.log(response);
		link.type = "image/x-icon";
		link.href = response;
	});
}