
import {anime} from "../modules/mal.js"
var genre = [ // array of possible genres to chose from
    "action",
    "adventure",
    "cars",
    "comedy",
    "dementia",
    "demons",
    "mystery",
    "drama",
    "null",
    "fantasy",
    "game",
    "null",
    "historical",
    "horror",
    "kids",
    "magic",
    "martial arts",
    "mecha",
    "music",
    "parody",
    "samurai",
    "null",
    "school",
    "sci fi",
    "shoujo",
    "null",
    "shounen",
    "null",
    "space",
    "sports",
    "super power",
    "vampire",
    "null",
    "null",
    "null",
    "slice of life",
    "supernatural",
    "military",
    "police",
    "psychological",
    "thriller",
    "seinen",
    "josei"
]

var recGenre = new Map() //assign them to specifc key on map, api call uses number not name
var index = 0;
for (index; index < genre.length; index ++ ){ //make sure that the inapropriate ones are not shown
    if (genre[index] == "null"){
        console.log('null')
    }
    else{
    recGenre.set(index + 1, genre[index])
    }

}
var keys = recGenre.keys()
var keyNum = [] //convert iterable map obj to array
for (const item of keys){
    keyNum.push(item)
}


var  randomIndex = keyNum[Math.floor(Math.random() * keyNum.length)]; //select random genre
var amountOfShows = 4;

document.getElementById("recGenre").innerHTML = "Check out top shows from " + genre[randomIndex - 1];
var shows = recShows(randomIndex, amountOfShows) //get promise of shows from api
.then(response =>{
    var spotNum
    for (spotNum = 0; spotNum<amountOfShows; spotNum++){
        console.log(spotNum+1)
         let image = response[spotNum].malStat("image_url")
         let title = response[spotNum].malStat("title")
         console.log(response[spotNum].availSites())
         displayShows(image, title, spotNum+1)
}
})

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