
chrome.storage.local.get(['show'], (result => {
  var  response = result.show
    document.getElementById('title').innerHTML = response.title
}))
