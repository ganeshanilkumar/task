function getFavicon(request, sender, callback) {
	console.log(request);
	var faviconUrl = 'chrome://favicon/' + request.url;
	
	function onImageLoaded() {
		console.log('load');
		var hex,hexMapping,key = request.instance;
		if (request.temp) {
			hex = request.hex;
		} else {
			if (localStorage['hexMapping']) {
				hexMapping = JSON.parse(localStorage['hexMapping']);
				
				if (hexMapping[key]) {
					if (hexMapping[key].icon) {
						callback(hexMapping[key].icon);
						return;
					}
					hex = hexMapping[key].color;
				} else if (hexMapping[request.instance]) {
					hexMapping[key] = hexMapping[request.instance];
					localStorage['hexMapping'] = JSON.stringify(hexMapping);
					if (hexMapping[key].icon) {
						callback(hexMapping[key].icon);
						return;
					}
					hex = hexMapping[key].color;
				} else {
					hexMapping[key] = {};
				}
			} else {
				hexMapping = {};
				hexMapping[key] = {};
			}
			
			if (!hex) {
				hex = randomHex();
				hexMapping[key].color = hex;
			}
		}
		
		var canvas = document.createElement('canvas');
		canvas.width = 16;
		canvas.height = 16;
		
		var context = canvas.getContext('2d');
		context.drawImage(img, 0, 0);
		context.globalCompositeOperation = 'source-in';
		
		context.fillStyle = '#' + hex;
		context.fillRect(0, 0, 16, 16);
		context.fill();
		
		if (!request.temp) {
			hexMapping[key].icon = canvas.toDataURL();
			localStorage['hexMapping'] = JSON.stringify(hexMapping);
		}
		console.log(canvas.toDataURL());
		callback(canvas.toDataURL());
	};
	var img = document.createElement('img');
	img.addEventListener('load', onImageLoaded);
	img.src = (request.instance.indexOf('cs') == -1 && request.instance.indexOf('--') == -1) ? '/favicon.ico' : '/favicon-s.ico';
};
chrome.extension.onRequest.addListener(getFavicon);

function randomHex(hex) {
	hex = hex || '';
	return hex.length == 6 ? hex : randomHex(hex + [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]);
}