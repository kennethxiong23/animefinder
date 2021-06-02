//adds listener to debug the storage api
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(newValue)
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

//listener to check when the extension has been run to make see if it is on a mal page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
let currentTab = getCurrentTab()
.then(data =>{
  let url = data[0].url
  //if on a mal anime site, go straight to the stat page
  if  (url.indexOf("myanimelist.net/anime/") != -1){
    let title = url.replace("https://myanimelist.net/anime/", "")
    title = title.slice(title.indexOf('/') + 1)
    title = title.slice(0, title.indexOf('?') )
    //acummulator to slice the url into an anime title
    let animeTitle = "";
    for (let char of title){
      if (char == '_'){
        animeTitle = animeTitle + " "
      }
      else{
        animeTitle = animeTitle + char
      }
    }
    //save the anime title to the storage api so it can be called on another page
    chrome.storage.local.set({"show" : animeTitle, "page" : "home"})
    //message homepage to upadate html page
    chrome.runtime.sendMessage({updatePopup: true})
  }
});
});

async function getCurrentTab() {
  /*
  Description: Gets the current tab that the user is one
  Parameters: none
  Return Val: Current tab(obj)
  */
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab;
}