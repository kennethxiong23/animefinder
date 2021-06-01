import {anime} from "../modules/mal.js"
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
  var  response
  if (result.show == "undefined"){
    response = new anime(result.show)
    document.getElementById("back").remove();
  }
  else{
    alert(response.title)
    response = result.show
  }
    document.getElementById('title').innerHTML = response.title
    document.getElementById('image').src = response.malStat("image_url")
    document.getElementById("description").innerHtml = response.malStat("synopsis")
    let availSites = response.availSites()
    .then(data =>{
        for (sites in data){
            let img = sites.name + "_img"
            let link = sites.name + "_link"
            let href = sites.name
            document.getElementById(img).src = "./images/" + sites.name + ".png"
            document.getElementById(link).innerHTML = sites.name
            document.getElementById(hreft).href = sites.url
        }
    })
}))

