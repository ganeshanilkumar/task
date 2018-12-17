
function DOMtoString(document_root) {
   	
	  var pageHTML = '',
        node = document_root.firstChild;
		
    while (node) {
     
	  pageHTML+= node.outerHTML;
	  
	   node = node.nextSibling;
    }
	var srcMsg='';
	var customAppSettings, standardTabSettings, customTabSettings,standardRecordTypeSettings, customRecordTypeSettings,administrativePermissions,generalUserPermissions,standardObjectPermissions,customObjectPermissions,connectedAppAccess,serviceProviderAccess,enabledApexClassAccess,enabledVFPageAccess;
	
		
		var h3ElementHeader= document.getElementsByTagName('h3');
		//console.log( ' length is ' + h3ElementHeader.length);
		for(var h3ElementHeaderIndex=0;h3ElementHeaderIndex<h3ElementHeader.length;h3ElementHeaderIndex++)
		{
		//console.log( h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,""));
			if(h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Custom App Settings")
			{
			customAppSettings = h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML;
						
			}
			else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Tab Settings")
			{
			standardTabSettings= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			customTabSettings=  h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.nextSibling.innerHTML;
			}
				else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Record Type Settings")
			{
			standardRecordTypeSettings= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			customRecordTypeSettings=  h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.nextSibling.innerHTML;
			}
					else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Administrative Permissions")
			{
			administrativePermissions= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
					else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "General User Permissions")
			{
			generalUserPermissions= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
			
						else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Standard Object Permissions")
			{
			standardObjectPermissions= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
							else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Custom Object Permissions")
			{
			customObjectPermissions= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
						else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Connected App Access")
			{
			connectedAppAccess= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
				else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Service Provider Access")
			{
			serviceProviderAccess= h3ElementHeader[h3ElementHeaderIndex].parentNode.nextSibling.innerHTML ; 
			
			}
			
			else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Enabled Apex Class Access")
			{
			enabledApexClassAccess= h3ElementHeader[h3ElementHeaderIndex].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName('th'); 
			
			}
			
			else if (h3ElementHeader[h3ElementHeaderIndex].innerHTML.trim().replace(/<span class="titleSeparatingColon">:<\/span>/g,"") == "Enabled Visualforce Page Access")
			{
			enabledVFPageAccess= h3ElementHeader[h3ElementHeaderIndex].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName('th'); 
			
			}
			
			
			
			
		
		}
// ******************Custom App Settings - START ************************** 
		
	
 var index1 ,index2,codeBlock,splittedStr, values,keyValueMap;

var k=0;
	if(customAppSettings!=null && customAppSettings.length > 0)
	{
     values = customAppSettings.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,"").replace(/<td class="labelCol empty">&nbsp;/g,"").replace(/<table class="tabSetTable"><tbody><th scope="col">Visible<\/th><th scope="col">Default<\/th>/g,"").replace(/<\/tbody><\/table>/g,"").replace(/<table class="tabSetTable"><tbody><td>/g,"").replace(/<\/div>/g,"").replace(/<td><img/g,""); 
	 keyValueMap  = values.split('</td>');
	var newKeyValueMap = new Array();
	var newKeyValueMapIndex=0;
	for(var keyValueMapIndex=0;keyValueMapIndex<keyValueMap.length;keyValueMapIndex++)
	{
	if(keyValueMap[keyValueMapIndex]!=null && keyValueMap[keyValueMapIndex].trim().length > 0)
	{
	//console.log('keyValueMapIndex is ' + keyValueMapIndex + 'keyValueMap[keyValueMapIndex]= ' + keyValueMap[keyValueMapIndex] + 'length= ' + keyValueMap[keyValueMapIndex].length);
		newKeyValueMap[newKeyValueMapIndex++] = keyValueMap[keyValueMapIndex];
		
		}
	}
	
	//console.log('map value is ' + newKeyValueMap);
	
	for(var j=0;j<newKeyValueMap.length+3;j++)
	{
	
		if(k-1==2)
		{
		
		if(newKeyValueMap[j-3].trim()=="&nbsp;")
		{
			k=0;
			continue;
			
			}
		
			//console.log('key:' + 'srcsrts'+keyValueMap[j-1] + "value:" + keyValueMap[j].trim());
		//console.log('j is ' + j + 'k is ' + k + 'newKeyValueMap[j-2] is ' + newKeyValueMap[j-3]);	
		//localstorage.setItem('srccas'+newKeyValueMap[j-3].trim(), newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3]);
		srcMsg = srcMsg + 'srccas'+newKeyValueMap[j-3].trim() + '1985'+newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3] + '1985';
		k=0;
		}
		
		k++;
		
		
	}
	}   
	
	
// ******************Custom App Settings - END ************************** 



srcMsg = srcMsg + '1601';
		//console.log('srcMsg is ' + srcMsg);
	// ******************Connected App Access - START ************************** 

	if(connectedAppAccess!=null && connectedAppAccess.length > 0)
	{
     values = connectedAppAccess.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,""); 
	 keyValueMap  = values.split('</td>');
	
	//console.log('map value is ' + keyValueMap);
	
	for(var j=0;j<keyValueMap.length-1;j++)
	{
		
		if((j+1)%2==0)
		{
			//console.log('key:' + 'srcsrts'+keyValueMap[j-1] + "value:" + keyValueMap[j].trim());
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		
		//localstorage.setItem('srccap'+keyValueMap[j-1].trim(), keyValueMap[j].split('"')[3]);
		srcMsg = srcMsg + 'srccaa'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j].split('"')[3] + '1985';
		}
		
		
	}
	 }  
	
	
// ******************Connected App Access - END ************************** 	



srcMsg = srcMsg + '1601';
		//console.log('srcMsg is ' + srcMsg);
	// ******************Service Provider - START ************************** 

	if(serviceProviderAccess!=null && serviceProviderAccess.length > 0)
	{
     values = serviceProviderAccess.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,"").replace(/<table class="serviceProviderTable">/g,"").replace(/<\/tbody><\/table>/g,""); 
	 keyValueMap  = values.split('</td>');
	
	//console.log('map value is ' + keyValueMap);
	
	for(var j=0;j<keyValueMap.length-1;j++)
	{
		
		if((j+1)%2==0)
		{
			
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		
		//console.log('key:' + 'srcspa'+keyValueMap[j-1].trim() + "value:" + keyValueMap[j].split('"')[3]);
		//console.log('value is ' + keyValueMap[j].split('"'));
		//localstorage.setItem('srcspa'+keyValueMap[j-1].trim(), keyValueMap[j].split('"')[3]);
		srcMsg = srcMsg + 'srcspa'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j].split('"')[3] + '1985';
		}
		
		
	}
	 }  
	
	
// ******************Service Provider Access - END **************************

srcMsg = srcMsg + '1601';
//console.log('srcMsg is ' + srcMsg);
	// ******************TAB SETTINGS - START  ************************** 


	if(standardTabSettings!=null && standardTabSettings.length > 0)
	{
     values = standardTabSettings.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"");
	 keyValueMap  = values.split('</td>');
	
	for(var j=1;j<keyValueMap.length-1;j++)
	{
		if(j%2==0)
		{
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		//console.log('key:' + 'srcsts'+keyValueMap[j-1] + "value:" + keyValueMap[j]);
		//localstorage.setItem('srcsts'+keyValueMap[j-1].trim(), keyValueMap[j]);
		srcMsg = srcMsg + 'srcsts'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j] + '1985';
		
		}
		
	}
	}
	if(customTabSettings!=null && customTabSettings.length > 0)
	{
	 values = customTabSettings.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"");
	 keyValueMap  = values.split('</td>');
	
	for(var j=1;j<keyValueMap.length-1;j++)
	{
		if(j%2==0)
		{
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		
		//console.log('key:' + 'srccts'+keyValueMap[j-1].trim()+ "value:" + keyValueMap[j].trim());
		//localstorage.setItem('srccts'+keyValueMap[j-1].trim(), keyValueMap[j].trim());
		srcMsg = srcMsg + 'srccts'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j] + '1985';
		
		
		}
		
	}
	
	}

	//console.log('Source ' + //localstorage.getItem('srcctsCloud MDM'));
   
	
	
		// ******************TAB SETTINGS - END ************************** 
	
	srcMsg = srcMsg + '1601';
	//console.log('srcMsg is ' + srcMsg);
	
	
	// ******************RECORD TYPE SETTINGS - START ************************** 
	 
		if(standardRecordTypeSettings!=null && standardRecordTypeSettings.length > 0)
	{
     values = standardRecordTypeSettings.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"");
	 keyValueMap  = values.split('</td>');
	
	for(var j=1;j<keyValueMap.length-1;j++)
	{
		if(j%2==0)
		{
	
		//console.log('key:' + 'srcsrts'+keyValueMap[j-1] + "value:" + keyValueMap[j].trim());
		if(keyValueMap[j].trim().indexOf("[") > 0)
		{
		keyValueMap[j] = keyValueMap[j].trim().substring(0,keyValueMap[j].indexOf("["));
		}
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		//localstorage.setItem('srcsrts'+keyValueMap[j-1].trim(), keyValueMap[j]);
		srcMsg = srcMsg + 'srcsrts'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j] + '1985';
		}
		
		
		
		
	}
	}
	
		if(customRecordTypeSettings!=null && customRecordTypeSettings.length > 0)
	{
	values = customRecordTypeSettings.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"");
	 keyValueMap  = values.split('</td>');
	
	for(var j=1;j<keyValueMap.length-1;j++)
	{
		if(j%2==0)
		{
		
		//console.log('key:' + 'srccrts'+keyValueMap[j-1].trim()+ "value:" + keyValueMap[j].trim());
		if(keyValueMap[j].trim().indexOf("[") > 0)
		{
		keyValueMap[j] = keyValueMap[j].trim().substring(0,keyValueMap[j].indexOf("["));
		}
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		//localstorage.setItem('srccrts'+keyValueMap[j-1].trim(), keyValueMap[j].trim());
		srcMsg = srcMsg + 'srccrts'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j].trim() + '1985';
		
		
		
		}
		
	}
	}
	//console.log('Source ' + //localstorage.getItem('srcctsCloud MDM'));
   
	
	
	// ******************RECORD TYPE SETTINGS - END ************************** 
	
	srcMsg = srcMsg + '1601';
	
	
	// ******************Administrative Permissions - START ************************** 
	
	if(administrativePermissions!=null && administrativePermissions.length > 0)
	{
     values = administrativePermissions.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,""); 
	 keyValueMap  = values.split('</td>');
	
	//console.log('map value is ' + keyValueMap);
	
	for(var j=0;j<keyValueMap.length-1;j++)
	{
		
		if((j+1)%2==0)
		{
			//console.log('key:' + 'srcsrts'+keyValueMap[j-1] + "value:" + keyValueMap[j].trim());
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		
		//localstorage.setItem('srcap'+keyValueMap[j-1].trim(), keyValueMap[j].split('"')[3]);
		srcMsg = srcMsg + 'srcap'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j].split('"')[3] +'1985'; 
		}
		
		
	}
	 }  
	
	 	
	// ******************Administrative Permissions - END ************************** 	
		
		srcMsg = srcMsg + '1601';
		//console.log('srcMsg is ' + srcMsg);
	// ******************General User Permissions - START ************************** 

	if(generalUserPermissions!=null && generalUserPermissions.length > 0)
	{
     values = generalUserPermissions.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,""); 
	 keyValueMap  = values.split('</td>');
	
	//console.log('map value is ' + keyValueMap);
	
	for(var j=0;j<keyValueMap.length-1;j++)
	{
		
		if((j+1)%2==0)
		{
			//console.log('key:' + 'srcsrts'+keyValueMap[j-1] + "value:" + keyValueMap[j].trim());
		if(keyValueMap[j-1].trim()=="&nbsp;")
		{
			continue;
		}
		
		//localstorage.setItem('srcgup'+keyValueMap[j-1].trim(), keyValueMap[j].split('"')[3]);
		srcMsg = srcMsg + 'srcgup'+keyValueMap[j-1].trim() + '1985' + keyValueMap[j].split('"')[3] + '1985';
		}
		
		
	}
	 }  
	
	
// ******************General User Permissions - END ************************** 		




	srcMsg = srcMsg + '1601';
//console.log('srcMsg is ' + srcMsg);

// ******************Standard Object Permissions - START ************************** 

	
var k=0;
		if(standardObjectPermissions!=null && standardObjectPermissions.length > 0)
	{
     values = standardObjectPermissions.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,"").replace(/<td class="crudCol">/g,"").replace(/<td class="marvarCol">/g,"").replace(/<table class="crudTable"><tbody><th class="whiteText tertiaryPalette crudCols" colspan="4" scope="col">Basic Access<\/th><th class="whiteText tertiaryPalette marvarCols" colspan="2" scope="col">Data Administration<\/th>/g,"").replace(/<th class="crudCol" scope="col">Read<\/th><th class="crudCol" scope="col">Create<\/th><th class="crudCol" scope="col">Edit<\/th><th class="crudCol" scope="col">Delete<\/th><th class="marvarCol" scope="col">/g,"").replace(/View All&nbsp;<\/th><th class="marvarCol" scope="col">Modify All&nbsp;<\/th>/g,"").replace(/<\/tbody><\/table>/g,"").replace(/<\/tbody><\/table>/g,"").replace(/<th class="labelCol" scope="row">/g,"").replace(/<\/th>/g,"</td>").replace(/<table class="crudTable"><tbody><tr class="crudTable">/g,"").replace(/<\/div>/g,"").replace(/<td class="labelCol empty">&nbsp;/g,"").replace(/<th class="labelCol last" scope="row">/g,"");
	 keyValueMap  = values.split('</td>');
	var newKeyValueMap = new Array();
	var newKeyValueMapIndex=0;
	for(var keyValueMapIndex=0;keyValueMapIndex<keyValueMap.length;keyValueMapIndex++)
	{
	if(keyValueMap[keyValueMapIndex]!=null && keyValueMap[keyValueMapIndex].trim().length > 0)
	{
	//console.log('keyValueMapIndex is ' + keyValueMapIndex + 'keyValueMap[keyValueMapIndex]= ' + keyValueMap[keyValueMapIndex] + 'length= ' + keyValueMap[keyValueMapIndex].length);
		newKeyValueMap[newKeyValueMapIndex++] = keyValueMap[keyValueMapIndex];
		
		}
	}
	
	//console.log('map value is ' + newKeyValueMap);
	
	for(var j=0;j<newKeyValueMap.length+7;j++)
	{
	
		if(k-1==6)
		{
		if(newKeyValueMap[j-7].trim().trim()=="&nbsp;")
		{
			k=0;
			continue;
		}
			
		//console.log('j is ' + j + 'k is ' + k + 'newKeyValueMap[j-2] is ' + newKeyValueMap[j-6]);	
		//localstorage.setItem('srcsop'+newKeyValueMap[j-7].trim(), newKeyValueMap[j-6].split('"')[3]+','+newKeyValueMap[j-5].split('"')[3]+','+newKeyValueMap[j-4].split('"')[3]+','+newKeyValueMap[j-3].split('"')[3]+','+newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3]);
		srcMsg = srcMsg + 'srcsop'+newKeyValueMap[j-7].trim() + '1985' + newKeyValueMap[j-6].split('"')[3]+','+newKeyValueMap[j-5].split('"')[3]+','+newKeyValueMap[j-4].split('"')[3]+','+newKeyValueMap[j-3].split('"')[3]+','+newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3] + '1985';
		k=0;
		}
		
		k++;
		
		
	}
	 }  
	
	
// ******************Standard Object Permissions - END ************************** 	
	srcMsg = srcMsg + '1601';	
		
		// ******************Custom Object Permissions - START ************************** 

	
var k=0;
	if(customObjectPermissions!=null && customObjectPermissions.length > 0)
	{
     values = customObjectPermissions.replace(/<td class="dataCol">/g,"").replace(/<td class="dataCol col02">/g,"").replace(/<td class="labelCol">/g,"").replace(/<tr>/g,"").replace(/<\/tr>/g,"").replace(/<td class="dataCol last">/g,"").replace(/<td class="dataCol col02 last">/g,"").replace(/<td class="labelCol last">/g,"").replace(/<table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody>/g,"").replace(/<td class="labelCol empty last">/g,"").replace(/<td class="dataCol empty last">/g,"").replace(/<td class="crudCol">/g,"").replace(/<td class="marvarCol">/g,"").replace(/<table class="crudTable"><tbody><th class="whiteText tertiaryPalette crudCols" colspan="4" scope="col">Basic Access<\/th><th class="whiteText tertiaryPalette marvarCols" colspan="2" scope="col">Data Administration<\/th>/g,"").replace(/<th class="crudCol" scope="col">Read<\/th><th class="crudCol" scope="col">Create<\/th><th class="crudCol" scope="col">Edit<\/th><th class="crudCol" scope="col">Delete<\/th><th class="marvarCol" scope="col">/g,"").replace(/View All&nbsp;<\/th><th class="marvarCol" scope="col">Modify All&nbsp;<\/th>/g,"").replace(/<\/tbody><\/table>/g,"").replace(/<\/tbody><\/table>/g,"").replace(/<th class="labelCol" scope="row">/g,"").replace(/<\/th>/g,"</td>").replace(/<table class="crudTable"><tbody><tr class="crudTable">/g,"").replace(/<\/div>/g,"").replace(/<td class="labelCol empty">&nbsp;/g,"").replace(/<th class="labelCol last" scope="row">/g,"");
	 keyValueMap  = values.split('</td>');
	var newKeyValueMap = new Array();
	var newKeyValueMapIndex=0;
	for(var keyValueMapIndex=0;keyValueMapIndex<keyValueMap.length;keyValueMapIndex++)
	{
	if(keyValueMap[keyValueMapIndex]!=null && keyValueMap[keyValueMapIndex].trim().length > 0)
	{
	//console.log('keyValueMapIndex is ' + keyValueMapIndex + 'keyValueMap[keyValueMapIndex]= ' + keyValueMap[keyValueMapIndex] + 'length= ' + keyValueMap[keyValueMapIndex].length);
		newKeyValueMap[newKeyValueMapIndex++] = keyValueMap[keyValueMapIndex];
		
		}
	}
	
	//console.log('map value is ' + newKeyValueMap);
	
	for(var j=0;j<newKeyValueMap.length+7;j++)
	{
	
		if(k-1==6)
		{
		if(newKeyValueMap[j-7]=="&nbsp;")
		{
		k=0;
		continue;
		}	
		//console.log('j is ' + j + 'k is ' + k + 'newKeyValueMap[j-7] is ' + newKeyValueMap[j-7]);	
		//localstorage.setItem('srccop'+newKeyValueMap[j-7].trim(), newKeyValueMap[j-6].split('"')[3]+','+newKeyValueMap[j-5].split('"')[3]+','+newKeyValueMap[j-4].split('"')[3]+','+newKeyValueMap[j-3].split('"')[3]+','+newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3]);
		srcMsg = srcMsg + 'srccop'+newKeyValueMap[j-7].trim() + '1985' + newKeyValueMap[j-6].split('"')[3]+','+newKeyValueMap[j-5].split('"')[3]+','+newKeyValueMap[j-4].split('"')[3]+','+newKeyValueMap[j-3].split('"')[3]+','+newKeyValueMap[j-2].split('"')[3]+','+newKeyValueMap[j-1].split('"')[3] + '1985';
		k=0;
		}
		
		k++;
		
		
	}
	   
	}
	
// ******************Custom Object Permissions - END ************************** 	
	srcMsg = srcMsg + '1601';	
// ******************Enabled Apex Class Access - Start ************************** 	
if(enabledApexClassAccess!=null && enabledApexClassAccess.length > 0)
	{
	var innerHTMLStr;
	for(var i =2; i <enabledApexClassAccess.length;i++)
		{
			innerHTMLStr = enabledApexClassAccess[i].innerHTML.replace(/<\/a>/g,"");
			
			
			srcMsg = srcMsg + 'srceaca' + innerHTMLStr.split('"')[2].substring(1,innerHTMLStr.length) + '1985' + '#' + '1985';
				
		
		}
	}

// ******************Enabled Apex Class Access - END ************************** 	
	
	
		srcMsg = srcMsg + '1601';	
// ******************Enabled Apex Class Access - Start ************************** 	
if(enabledVFPageAccess!=null && enabledVFPageAccess.length > 0)
	{
	var innerHTMLStr;
	for(var i =2; i <enabledVFPageAccess.length;i++)
		{
			innerHTMLStr = enabledVFPageAccess[i].innerHTML.replace(/<\/a>/g,"");
			
			
			srcMsg = srcMsg + 'srcvfpa' + innerHTMLStr.split('"')[2].substring(1,innerHTMLStr.length) + '1985' + '#' + '1985';
				
		
		}
	}

// ******************Enabled Apex Class Access - END ************************** 	
	
	//return "Parsed successfully. Please select the target page.";
	return srcMsg;
	
}

chrome.extension.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});





