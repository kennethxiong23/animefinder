
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
        var animeSites = searchWeb(this.title)
        var utellyWatch = utellySites(this.imdbId())
        
        
       return animeSites
        
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


}   
}
async function searchWeb(title){
    let url = "https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDvDsw3M1OYZg3oycCb8__TXv39TLzalhY&lr=en&cx=7071425502d0f8570&&q=" + title
    let results = await fetch (url, {
        "method" : "GET"
    })
    .then(response => response.json ())
    .then(data =>{
        let sites = []
        for (let result of data.items){
            console.log(result.title.indexOf("Watch on"))
            if (result.title.indexOf("Watch on") != -1 || result.title.indexOf("Stream") != -1){
                let name = result.displayLink.replace("www.", "")
                name = name.replace(".com", "")
                
                var show = {
                    name : name,
                    url : result.formattedUrl
                }
                sites.push(show)
            }

        }
        return sites
    })
    return results
}
async function utellySites(imdbId){
    imdbId
    .then(response => {
    let url  = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + response + "&source=imdb&country=us"
    console.log(url)
    let results =  fetch(url, {
        "method": "GET",
        "headers" : {
            "Access-Control-Allow-Origin" : "*",
            "x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
        }

    })
    .then(response => response.json())
    .then(data => {
        data = data.collection.locations
        var sites = [];
        for (let result of data){
            if (result.display_name == "Hulu" || result.display_name == "Netflix" 
            || result.display_name == "Amazon Prime Video" || result.display_name == "Amazon Instant Video" 
            || result.display_name == "iTunes" || result.display_name == "Google Play" || result.display_name == "HBO Max"){
            var show = {
                name : result.display_name,
                url : result.url
            }
            console.log(result)
            sites.push(show)
        }
    }
    
        console.log(sites);
        return sites
    })
    .catch((error) =>{
        var sites = []
        return sites
    })
    return results
})
return imdbId;
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