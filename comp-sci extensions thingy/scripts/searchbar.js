import {anime} from "../modules/mal.js"
document.getElementById("searchButton").onclick = function(){
    let query = document.getElementById("searchBar").value;
    if (query != ""){
        chrome.storage.local.set({"query" : query})
        window.location.href = "../search.html"
    }

}
