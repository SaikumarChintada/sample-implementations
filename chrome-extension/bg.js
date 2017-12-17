// todo: 
// + message passing request object  as a seperate interface
// + use async/promises 
// + use mvc


initStorage();

// Event 1:  on receiving a url from content script
// store url, maintain cache ??, send success
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.event == "url.new"){
		setUrl(request.data,sender.tab.id);
	}
});

// Event 2 : console.log the urlArray from localstorage
chrome.browserAction.onClicked.addListener(function(tab) {
	// getAllUrls(() => chrome.tabs.sendMessage(tab.id, {event: "ext.click"}) );
	chrome.tabs.sendMessage(tab.id, {event: "ext.click"});
});



// definitions
function initStorage(){
	chrome.storage.local.get('urls', (item) => {
		if(!item){
			StorageArea.set({"urls" : []});
		}
	});
}
function getAllUrls(cb){
	chrome.storage.local.get('urls', (item) => cb(item));
}
function setUrl(data,tab_id){
	chrome.storage.local.get('urls',(item) => {
		if(item){
			var updatedUrls = item.urls || [];
			updatedUrls.push(data);
			chrome.storage.local.set({"urls" : updatedUrls},() => {
				var success = true;
				if (typeof chrome.runtime.lastError !== 'undefined') {
					success = false;
				}
				chrome.tabs.sendMessage(tab_id,{event : "url.save",data: success});
			});
		}
	});
}