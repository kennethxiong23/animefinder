
import {anime} from "../modules/mal.js"
let genre = [
    "action",
    "adventure",
    "cars",
    "comedy",
    "dementia",
    "demons",
    "mystery",
    "drama",
    "ecchi",
    "fantasy",
    "game",
    "hentai",
    "historical",
    "horror",
    "kids",
    "magic",
    "martial arts",
    "mecha",
    "music",
    "parody",
    "samurai",
    "romance",
    "school",
    "sci fi",
    "shoujo",
    "shoujo ai",
    "shounen",
    "shounen ai",
    "space",
    "sports",
    "super power",
    "vampire",
    "yaoi",
    "yuri",
    "harem",
    "slice of life",
    "supernatural",
    "military",
    "police",
    "psychological",
    "thriller",
    "seinen",
    "josei"
]
var  randomIndex = Math.floor(Math.random() * genre.length);
if (randomIndex == 12){
    randomIndex = 1;
}
var amountOfShows = 4;
document.getElementById("recGenre").innerHTML = "Check out top shows from " + genre[randomIndex];
var shows = recShows(randomIndex +1, amountOfShows)
.then(response =>{
    var d
    for (d = 0; d<amountOfShows; d++){
        console.log(d+1)
         var show = response[d].malStat("image_url")
         displayShows(show, d+1)
        

}
})

async function displayShows(show, index){  
    let imagePromise =  show
    .then(response =>{
        console.log('show' + index)
        document.getElementById('show' + String(index)).src = response
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
            console.log('hey')
            shows.push( new anime(data.anime[i].title))
        }
        return shows;
    });
return await results
}