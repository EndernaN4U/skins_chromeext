const inject_content = (url) => {
    if(!url.startsWith("https://csgo-skins.com/case/")) return;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: "inject_content"});
    });
}


let last_case = null;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo, tab);

    const case_name = tab.url.split('/').pop();
    if(changeInfo.status === 'complete' && last_case !== case_name) {
        last_case = case_name;
        inject_content(tab.url);
    }
}); // This one works only if url changes

chrome.webNavigation.onCommitted.addListener((details) => { 
    last_case = null;
    inject_content(details.url);
}); // This works only when page is reloaded