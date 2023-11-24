let input=document.getElementById("input-box");
let button= document.getElementById("search");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date=new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue]= [ts, publicKey, hashVal];

//this will add the autocomplete showing list item to the search bar on clicking
function displayWords(value) {
    input.value = value;
    removeElements();
  }

function removeElements(){
    listContainer.innerHTML="";
}

input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
      return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((result) => {
      let name = result.name;
      let div = document.createElement("div");
      div.style.cursor = "pointer";
      div.classList.add("autocomplete-items");  
      div.setAttribute("onclick", "displayWords('" + name + "')");  //added onclick attribute to the items of the autocomplete list

      let word = "<b>" + name.substr(0, input.value.length) + "</b>";
      word += name.substr(input.value.length);
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
    });
  });

button.addEventListener("click", (getResult = async() => {
    if(input.value.trim().length < 1){
        // alert("Blank");
    }

    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;


    
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData);
        jsonData.data["results"].forEach((element)=> {
            showContainer.innerHTML = `<div class="card-container">
            <div class="container-character-image">
            <img src="${
                element.thumbnail["path"] + "." + element.thumbnail["extension"]
              }"/>
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description}
            </div>
            </div>`;
        });
    })
);
window.onload = () =>{
    getResult();
}