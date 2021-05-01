
// fetch("https://jikan1.p.rapidapi.com/top/anime/1/upcoming", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
// 		"x-rapidapi-host": "jikan1.p.rapidapi.com"
// 	}
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
    
// 	console.error(err);
// });
class anime{
    constructor(show){
        this.malId = show.mal_id;
        this.title = show.title;
        this.image = show.image_url;
    }
    get title(){
        return this.title;
    }

}

function findSeasonal(numResults, season, year){
    var url = "https://jikan1.p.rapidapi.com/season/" + year + "/" + season 
    var results
    
    fetch(url, {
        "method": "GET",
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        
        results = data.anime;
        console.log(results[0])
    })
    .catch(err => {
        
        console.error(err);
    });
    var i;
    for (i = 0; i < numResults + 1; i++ ){
        console.log(i);
        console.log(results[i]);
        const obj = new anime(results[i]);
        console.log(obj.title);
        
    }

}