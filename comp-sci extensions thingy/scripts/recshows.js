/*
    Description: This program displays the top anime from a recommend genre,
    Name: Kenneth
    Date: Spring 2021
*/
import {anime} from "../modules/mal.js"

chrome.storage.local.set({"page" : "home"}) //make it so it comes back to the home page
chrome.runtime.sendMessage({startup: true}); //tell background.js that the extension started
//change the html page if it's on a MAL anime page
chrome.runtime.onMessage.addListener(function(response){
    window.location.href = "../statpage.html"
})

let genre = [ // array of possible genres to chose from
    [1,"action"],
    [2,"adventure"],
    [3,"cars"],
    [4,"comedy"],
    [5,"dementia"],
    [6,"demons"],
    [7,"mystery"],
    [8,"drama"],
    [10,"fantasy"],
    [11,"game"],
    [13,"historical"],
    [14,"horror"],
    [15,"kids"],
    [16,"magic"],
    [17,"martial arts"],
    [18,"mecha"],
    [19,"music"],
    [20,"parody"],
    [21,"samurai"],
    [23,"school"],
    [24,"sci fi"],
    [25,"shoujo"],
    [27,"shounen"],
    [29,"space"],
    [30,"sports"],
    [31,"super power"],
    [32,"vampire"],
    [36,"slice of life"],
    [37,,"supernatural"],
    [38,"military"],
    [39,"police"],
    [40,"psychological"],
    [41,"thriller"],
    [42,"seinen"],
    [43,"josei"]
]

let  randomGenre = genre[Math.floor(Math.random() * genre.length)]; //select random genre
//how many shows to display
let amountOfShows = 4;

document.getElementById("recGenre").innerHTML = "Check out top shows from " + randomGenre[1];
let shows = recShows( randomGenre[0], amountOfShows) //get promise of shows from api
.then(response =>{
    let spotNum
    for (spotNum = 0; spotNum<amountOfShows; spotNum++){
        console.log(spotNum+1)
         let image = response[spotNum].malStat("image_url")
         let title = response[spotNum].malStat("title")
         console.log(response[spotNum].availSites())
         displayShows(image, title, spotNum+1)
     
}
return response
})
//store the show that was clicked in the storage api
document.getElementById("link1").onclick = function() { showClicked(shows, 1)};
document.getElementById("link2").onclick = function() { showClicked(shows, 2)};
document.getElementById("link3").onclick = function() { showClicked(shows, 3)};
document.getElementById("link4").onclick = function() { showClicked(shows, 4)};
function showClicked(array, index){
    /*
    Description: Stores the data of the clicked anime in the storage api
    Parameters: list of anime(array), index of the clicked show(int)
    Return Val
    */
    let promise = array
    .then(response =>{
        let show = response[index - 1]
        console.log(index-1)
        chrome.storage.local.set({"show" : show})
    })

    }

// show the shows, loading might be slow, api only allows 2 calles per second
 function displayShows(show, title, index){  
     /*
    Description: Load the image and title of the anime with as a clickable hyper link
    Parameters: image(str), title(Str). index(int)
    Return Val: non
    */ 
    let imagePromise =  show
    .then(response =>{
        console.log('show' + index)
        document.getElementById('show' + String(index)).src = response
    })
    let titlePromise = title
    .then(response =>{
        console.log(response)
        document.getElementById('title' + String(index)).innerHTML = response
    })
}

async function recShows(genreId, amount){
    /*
    Description: Gets an array of shows from a specifc genre
    Paramters: The genre id(int), how many shows to get(int)
    Return Val: array of results(array)
    */
    let url = "https://jikan1.p.rapidapi.com/genre/anime/" + genreId + "/1";
     let  results =  await fetch(url, {
        "method": "GET",
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        let shows = [];
        for (let i = 0; i<amount; i++){
            shows.push( new anime(data.anime[i].title))
        }
        return shows;
    });
return await results
}