/*
  Description: This programs updates the stat page with information about a specific anime.
                      It displays the availiable sites and a little synopsis about the show
  Name: Kenneth
  Date: Spring 2021
*/
import {anime} from "../modules/mal.js"

//This is just to determine which page the user goes back to
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

//get the show that the user wanted
chrome.storage.local.get(['show'], (result => {
  let  response;
  //if it's getting from mal it is a string not an obj, however need to remake the object
  //the storage api does not like promises for some reason
  if (typeof (result.show) == "string"){
    response = new anime(result.show)
    document.getElementById("back").remove();
  }
  else{
    response = new anime(result.show.title)
  }

    document.getElementById('title').innerHTML = response.title
    //use callback to get image url and display it
    let image = response.malStat("image_url")
    .then(data =>{
      document.getElementById("image").src = data});
    //use callback to get synopsis and display it
    let text = response.malStat("synopsis")
    .then (data =>{
      document.getElementById("text").innerHTML = data
    })
    //Display the availiable sites
    let availSites = response.availSites()
    .then(data =>{
        for (let array of data){
          for (let sites of array){
          console.log(sites)
            let img = sites.name + "_img"
            let link = sites.name + "_link"
            let href = sites.name
            document.getElementById(img).src = "./images/" + sites.name + ".png"
            document.getElementById(img).width = 64
            document.getElementById(img).height = 64
            document.getElementById(link).innerHTML = sites.name
            document.getElementById(href).href = sites.url
          }
        }
    })
}))

