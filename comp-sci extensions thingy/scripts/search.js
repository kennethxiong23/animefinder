/*
    Name: Kenneth
    Descrption: This programs gets the results from the user searching for an anime and loads
                        them as clickable links.
    Date: Spring 2021
*/
import {anime} from "../modules/mal.js"

//make it so that the user comes back to the search and not the home page
chrome.storage.local.set({"page" : "search"})
chrome.storage.local.get(["query"], result =>{//load user's query
    let  query = result.query
    document.getElementById("searchBar").value = query
    let results = search(query)
    .then(response => {
        for (let spotNum = 0; spotNum<5; spotNum++){//iterate through results
            //get the image url and title name of each anime in the array
             let image = response[spotNum].malStat("image_url")
             let title = response[spotNum].malStat("title")
             displayShows(image, title, spotNum+1)
        }
        return response
    })
    //store the data of any show that is clicked in the storage api
    document.getElementById("result1").onclick = function() { showClicked(results, 1)};
    document.getElementById("result2").onclick = function() { showClicked(results, 2)};
    document.getElementById("result3").onclick = function() { showClicked(results, 3)};
    document.getElementById("result4").onclick = function() { showClicked(results, 4)};
    document.getElementById("result5").onclick = function() { showClicked(results, 5)};
   

})

async function search(title){
    /* 
    Description: uses the jikan MAL api to search for anime results
    Parameter: Anime title(str)
    Return Val: Promise with array of anime obj
    */
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
        let shows = []
        for (let num = 0; num < 5; num ++){
            let obj = new anime (data.results[num].title)
            shows.push(obj)
        }
        return shows
    });
return await results;
}

function displayShows(image, title, index){  
    /*
    Description: Load the image and title of the anime with as a clickable hyper link
    Parameters: image(str), title(Str). index(int)
    Return Val: non
    */ 
    let imagePromise =  image
    .then(response =>{
        console.log('show' + index)
        document.getElementById('image' + String(index)).src = response
    })
    let titlePromise = title
    .then(response =>{
        console.log(response)
        document.getElementById('text' + String(index)).innerHTML = response
    })
}

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

