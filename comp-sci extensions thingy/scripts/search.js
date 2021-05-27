import {anime} from "../modules/mal.js"
chrome.storage.local.set({"page" : "search"})
chrome.storage.local.get(["query"], result =>{
    let  query = result.query
    document.getElementById("searchBar").value = query
    var results = search(query)
    .then(response => {
        var spotNum
        for (spotNum = 0; spotNum<5; spotNum++){
            console.log(spotNum+1)
             let image = response[spotNum].malStat("image_url")
             let title = response[spotNum].malStat("title")
             console.log(response[spotNum].availSites())
             displayShows(image, title, spotNum+1)
        }
        return response
    })
    document.getElementById("result1").onclick = function() { showClicked(results, 1)};
    document.getElementById("result2").onclick = function() { showClicked(results, 2)};
    document.getElementById("result3").onclick = function() { showClicked(results, 3)};
    document.getElementById("result4").onclick = function() { showClicked(results, 4)};
    document.getElementById("result5").onclick = function() { showClicked(results, 5)};
   

})

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
        let shows = []
        for (let num = 0; num < 5; num ++){
            let obj = new anime (data.results[num].title)
            shows.push(obj)
        }
        return shows
    });
return await results;

}
function displayShows(show, title, index){  
    let imagePromise =  show
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
        
    var promise = array
    .then(response =>{
        var show = response[index - 1]
        console.log(index-1)
        chrome.storage.local.set({"show" : show})
    })

}

