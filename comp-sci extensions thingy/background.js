
let color = '#3aa757';


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(newValue)
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
let currentTab = getCurrentTab()
.then(data =>{
  let url = data[0].url
  console.log(url)
  if  (url.indexOf("myanimelist.net/anime/") != -1){
    let title = url.replace("https://myanimelist.net/anime/", "")
    title = title.slice(title.indexOf('/') + 1)
    let animeTitle = "";
    for (let char of title){
      if (char == '_'){
        animeTitle = animeTitle + " "
      }
      else{
        animeTitle = animeTitle + char
      }
    }
    chrome.storage.local.set({"show" : animeTitle, "page" : "home"})
    chrome.runtime.sendMessage({updatePopup: true})
  }
  else{
    chrome.action.setPopup({
      popup: "animefinder.html"
  });
  }
});
});
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab;
}