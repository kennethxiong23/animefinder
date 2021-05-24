import {anime} from "../modules/mal.js"
var flag = document.getElementById("searchBar").value
chrome.storage.local.get(["query"], result =>{
    let  query = result.query
    document.getElementById("searchBar").value = query
})
while (document.getElementById("searchBar").value == flag){

}
alert(document.getElementById("searchBar").value)
