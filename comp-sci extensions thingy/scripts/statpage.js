
chrome.storage.local.get(["page"], (result => {
  let page = result.page
    if (page == "search"){
      document.getElementById("back").href = "../search.html"
    }
    else{
      document.getElementById("back").href = "../animefinder.html"
    }
  }
))
chrome.storage.local.get(['show'], (result => {
  var  response = result.show
    document.getElementById('title').innerHTML = response.title
}))
