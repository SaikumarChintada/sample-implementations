(function(){
	//config
	const CS_DIV = '__my__simple__cxt__wrapper__';

	//setup 
	var loc = window.location.href;
	var div = document.createElement('div');
	div.id = CS_DIV;
	div.setAttribute('style','position:fixed;top:20px;font:30px;z-index:10;background:yellow');
	document.body.appendChild(div);

	//chrome ext events -------------------

	//emmit new url
	chrome.runtime.sendMessage({event : "url.new",data : loc});

	// handler ext click  : receive all urls to log
	// handle url save response : console log result
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.event == "ext.click"){
			chrome.storage.local.get('urls',(items) => console.log(items));
			addTextToPage();
		}else if(request.event == "url.save"){
			console.log({logSuccess : request.data});
		}
	});
	
	// chrome.storage.local.get('urls',(items) => console.log(items));
	

	//helpers -----------------------------
	function addTextToPage(){
		var extDiv = document.getElementById(CS_DIV);
		var span = document.createElement('div');
		span.setAttribute('style','position:relative');
	    span.innerText = "Horray! my extension clicked ..";
	    extDiv.appendChild(span);
	}

})(chrome);