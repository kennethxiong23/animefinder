
 class anime{
    constructor(title){
        this.title = title;
        this.query = formatQuery(title)
        this.mal = search(this.query);
    }

     malStat(stat){
        var promise = this.mal
        .then(response => {
            response = response[stat];
            return response;
        });
        return promise;
    }
    async imdbId(){
        var url = "https://imdb8.p.rapidapi.com/auto-complete?q=" + this.query;
    
         var results =  await fetch(url, {
            "method": "GET",
            "headers": {
                "Access-Control-Allow-Origin" : "*",
                "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
                "x-rapidapi-host": "imdb8.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            data  = data.d[0].id;
            return data;
        });
    return await results;

    }

    availSites(){
        // var fun = searchWeb("funimation.com");
        // var vrv = searchWeb("vrv.co");
        // var hidive = searchWeb("hidive.com");
        // var crunchyRoll = searchWeb("crunchyroll.com");
        // var utelly = utellySites(this.title);
        // var watchMode = watchModeSites(this.title);
        console.log("anime.availSites");

        // var availSites = Promise.all([fun, vrv, hidive, crunchyRoll, utelly, watchMode]);
        
    }


async  getEpisode(){
    var episodes = this.malStat('mal_id') 
    .then(response => { 
        console.log(response)
        var url = "https://jikan1.p.rapidapi.com/anime/" + response + "/episodes";
        var  results =   fetch(url, {
            "method": "GET",
            "headers": {
                "Access-Control-Allow-Origin" : "*",
                "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
                "x-rapidapi-host": "jikan1.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            data  = data.episodes[0].title;
            console.log(data);
            return data;
        });
        return results

    })
     return await episodes

//return await episodes;
}   
}

async function search(title){
    var url = "https://jikan1.p.rapidapi.com/search/anime?q=" + title;
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
        data  = data.results[0];
        return data;
    });
return await results;

}

function formatQuery (title){
    var query = '';
    var letters = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
    for (let char of title){
        if (char == ' '){
            query = query + '%20';
            
        }
        else{
            if (letters.includes(char)) {
                query = query + char;
            }

        }
    }
    return query;
}

export {anime};