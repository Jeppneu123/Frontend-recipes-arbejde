const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "https://recipe-api-0qy8.onrender.com/";

const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.id; // "some_value"

// Fetch Recipes
function fetchingEndpoints () {
    fetch (endpoint + "/dishes/" + value).
    then(function (res) {
        return res.json();
    })
        .then(function (dish){
            appendDishOne(dish)
        })
}

// Fetch Procedure
function fetchingProcedureEndpoints () {
    fetch (endpoint + "/procedure/" + value).
    then(function (res) {
        return res.json();
    })
        .then(function (procedure){
            console.log(procedure)
            appendProcedure(procedure)
        })
}

// Fetch Ingredients
function fetchingIngredientsEndpoint () {
    fetch (endpoint + "/ingredients/" + value).
    then(function (res) {
        return res.json();
    })
        .then(function (ingredients){
            console.log(ingredients)
            appendIngredients(ingredients)
        })
}

function appendDishOne (dish) {
    console.log(dish)
    const divSelect = document.querySelector("div.ret")
    let html = `
            <h2 class="dish-name"> ${dish[0].dish_name}</h2>
            <div class="imageWrapper">
                <img id="dish-image" width=50% height=50% src="${dish[0].dish_image}" alt="Picture Of ${dish[0].dish_name}">
            </div>
    `
divSelect.innerHTML=html

}
function appendProcedure (procedure) {
    console.log(procedure)
    const divSelect = document.querySelector("div.procedure")
    for (let i = 0; i < procedure.length; i++) {
        divSelect.innerHTML+=`
      <div class="procedure-name-wrapper">            
            <div class="procedure-one"> ${procedure[i].procedure_name} </div>   
      </div>
      <div class="procedureDiv">
                   <pre class="procedureIngredientsText">${procedure[i].procedure_ingredients_text}</pre> 

                   <div class="procedure-one-description"><span class="procedureBoldText">Procedure</span> <br></br>${procedure[i].procedure_text}</div> 
      </div>
    `
    }
}





fetchingIngredientsEndpoint()
fetchingEndpoints ()
fetchingProcedureEndpoints()