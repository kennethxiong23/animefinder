import {anime} from "../modules/mal.js"
var genre = [ // array of possible genres to chose from can i make this an array of array
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
var obj = new anime ("wheathering with you")
console.log(obj)
var  randomGenre = genre[Math.floor(Math.random() * genre.length)]; //select random genre
var amountOfShows = 4;

document.getElementById("recGenre").innerHTML = "Check out top shows from " + randomGenre[1];
var shows = recShows( randomGenre[0], amountOfShows) //get promise of shows from api
.then(response =>{
    var spotNum
    for (spotNum = 0; spotNum<amountOfShows; spotNum++){
        console.log(spotNum+1)
         let image = response[spotNum].malStat("image_url")
         let title = response[spotNum].malStat("title")
         console.log(response[spotNum].availSites())
         displayShows(image, title, spotNum+1)
     
}
return response
})
document.getElementById("link1").onclick = function() { showClicked(shows, 1)};
document.getElementById("link2").onclick = function() { showClicked(shows, 2)};
document.getElementById("link3").onclick = function() { showClicked(shows, 3)};
document.getElementById("link4").onclick = function() { showClicked(shows, 4)};
 function showClicked(array, index){
    
    var promise = array
    .then(response =>{
        var show = response[index - 1]
        console.log(index-1)
        chrome.storage.local.set({"show" : show})
    })

}
// show the shows, loading might be slow, api only allows 2 calles per second
 function displayShows(show, title, index){  
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
    var url = "https://jikan1.p.rapidapi.com/genre/anime/" + genreId + "/1";
     var  results =  await fetch(url, {
        "method": "GET",
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        var shows = [];
        let i;
        for (i = 0; i<amount; i++){
            shows.push( new anime(data.anime[i].title))
        }
        return shows;
    });
return await results
}