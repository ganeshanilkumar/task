function save_options() {
	var hexMapping = {},
		rows = document.getElementById('hex-table').rows;
	for (var i = 1;i < rows.length;i++) {
		var hexInput = rows[i].cells[1].firstChild;
		hexMapping[hexInput.id] = {color : hexInput.value, icon : null};
	}
	localStorage['hexMapping'] = JSON.stringify(hexMapping);
}

document.querySelector('#save').addEventListener('click', save_options);

if (localStorage['hexMapping']) {
	var hexMapping = JSON.parse(localStorage['hexMapping']),
		hexTable = document.getElementById('table-body'),
		sortedInstances = [];
	for (var instance in hexMapping) {
		sortedInstances.push(instance);
	}
	sortedInstances.sort();
	for (var i = 0;i < sortedInstances.length;i++) {
		var key = sortedInstances[i];
		
		var newRow = hexTable.insertRow(hexTable.rows.length);
		newRow.id = key+'-row';
		
		var instanceCell = newRow.insertCell(0);
		var icon = document.createElement("img");
		icon.id = key+'-icon';
		icon.className = 'icon';
		icon.src = hexMapping[key].icon;
		updateIcon(key,hexMapping[key].color);
		instanceCell.appendChild(icon);
		instanceCell.innerHTML += key.toUpperCase();
		
		var hexCell = newRow.insertCell(1);
		hexCell.style.textAlign = 'center';
		
		var hexInput = document.createElement('input');
		hexInput.id = key;
		hexInput.className = "color";
		hexInput.value = hexMapping[key].color.toUpperCase();
		hexInput.onchange = function() {updateIcon(event.target.id,event.target.value);};
		hexCell.appendChild(hexInput);
		
		var remLink = document.createElement('a');
		remLink.innerText = 'Remove';
		remLink.className = key;
		remLink.style.cursor = 'pointer';
		remLink.onclick = function() {removeColor(this.className);};
		hexCell.appendChild(remLink);
	}
}

function updateIcon(key,hex) {
	var oid,instance,p = key.indexOf('|');
	if (p >= 0) {
		oid = key.substring(p+1);
		instance = key.substring(0,p);
	} else {
		instance = key;
	}
	chrome.extension.sendRequest({instance: instance,oid: oid,hex: hex,temp: true}, function(response) {document.getElementById(key+'-icon').src = response;});
}

function removeColor(instance) {
	console.log(instance);
	delete hexMapping[instance];
	document.getElementById(instance+'-row').remove();
	save_options();
}