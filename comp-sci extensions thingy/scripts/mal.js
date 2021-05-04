
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
    constructor(title){
        this.title = title;
        this.malStat = search(this.title);
    }
    get malId(){
        var promise = this.malStat
        .then(response => {
            response = response.mal_id;
            return response;
        });
        return promise;
    }
    get image(){
        var promise = this.malStat
        .then(response => {
            response = response.image_url;
            return response;
        });
        return promise;

    
    }

}
async function search(title){
    console.log(title)
    var query = formatQuery(title);
    var url = "https://jikan1.p.rapidapi.com/search/anime?q=" + query;

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
        console.log(data)
        data  = data.results[0];
        return data;
    });
return await results;


// if (results.ok){
//     let json = await results.text()
//     // console.log(json)
//     return json
// }
// // console.log(results)
// return results

}

function formatQuery (title){
    var query;
    for (char in title){
        if (title[char] == ' '){
            query = query + '%20';
            
        }
        else{
            query = query + title[char];
        }
    }
    return query;
}
// function findSeasonal(numResults, season, year){
//     var url = "https://jikan1.p.rapidapi.com/season/" + year + "/" + season;
//     var results;
//     var bob ;
    
//     results = fetch(url, {
//         "method": "GET",
//         "headers": {
//             "Access-Control-Allow-Origin" : "*",
//             "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
//             "x-rapidapi-host": "jikan1.p.rapidapi.com"
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
        
//        bob = getData(data.anime, numResults);
//        console.log(bob)
  

//     })
//     .catch(err => {
        
//         console.error(err);
//     });
