/*
Description: This program creates the class that is used for all anime objects and exports
it as a module
Name: Kenneth
Date: Spring 2021
*/

 class anime{
    constructor(title){
        this.title = title;
        this.query = formatQuery(title)
        this.mal = search(this.query);
    }

     malStat(stat){
         //Get data that mal provides
        let promise = this.mal
        .then(response => {
            response = response[stat];
            return response;
        });
        return promise;
    }

    async imdbId(){
        //Find the imdbId for the anime, needed for utelly api
        let url = "https://imdb8.p.rapidapi.com/auto-complete?q=" + this.query;
         let results =  await fetch(url, {
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
        //Find which streaming sites it can be watched on
        let animeSites = searchWeb(this.title)
        let utellyWatch = utellySites(this.imdbId())

       return Promise.all([animeSites, utellyWatch])
    }
    
async  getEpisode(){
    //Find episode data for each show, not used
    let episodes = this.malStat('mal_id') 
    .then(response => { 
        let url = "https://jikan1.p.rapidapi.com/anime/" + response + "/episodes";
        let  results =   fetch(url, {
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

            return data;
        });

        return results
    })

     return await episodes
}   
}

async function searchWeb(title){
    //use custom search api to find shows not on utelly, note 100 calls per day
    let url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDvDsw3M1OYZg3oycCb8__TXv39TLzalhY&lr=en&cx=7071425502d0f8570&&q=" + title
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
                let show = {
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
    //find sites to whatch anime on most mainstream sites

    let utellySites = imdbId.then(response => {
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
        let sites = [];
        for (let result of data){
            if (result.display_name == "Hulu" || result.display_name == "Netflix" 
            || result.display_name == "Amazon Prime Video" || result.display_name == "Amazon Instant Video" 
            || result.display_name == "iTunes" || result.display_name == "Google Play" || result.display_name == "HBO Max"){
            let show = {
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
        let sites = []
        return sites
    })
    return results
})
return utellySites
}

async function search(title){
    //Search on mal api for mal stat, this is why everything is so slow, only lets 2 calls per second
    let url = "https://jikan1.p.rapidapi.com/search/anime?q=" + title;
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
        data  = data.results[0];
        return data;
    });

return await results;
}

function formatQuery (title){
    //Format the seach query in for each api, replaced spaces with the uncode character
    let query = '';
    let letters = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
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