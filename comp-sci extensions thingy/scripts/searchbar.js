/*
Description: This program just deals with the search bar on the home page. It stores the 
query and only lets the user search if they typed something.
Name: Kenneth
Date: Spring 2021
*/

document.getElementById("searchButton").onclick = function(){
    let query = document.getElementById("searchBar").value;
    if (query != ""){
        chrome.storage.local.set({"query" : query})
        window.location.href = "../search.html"
    }
}
