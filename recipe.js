const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";

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
    fetch (endpoint + "/ingredients/:id" + value).
    then(function (res) {
        return res.json();
    })
        .then(function (procedure){
            console.log(procedure)
        })
}

function appendDishOne (dish) {
    console.log(dish)
    const divSelect = document.querySelector("div.ret")
    let html = `
            <h1 class="header"> ${dish[0].dish_name}</h1>
            <div class="imageWrapper">
                <img id="dishImage" src="${dish[0].dish_image}" alt="Picture Of ${dish[0].dish_name}">
            </div>
    `
divSelect.innerHTML=html

}
function appendProcedure (procedure) {
    console.log(procedure)
    const divSelect = document.querySelector("div.procedure")
    for (let i = 0; i < procedure.length; i++) {
        divSelect.innerHTML+=`
      <div class="procedureDiv">
            <div class="procedureOne"> ${procedure[i].procedure_name} </div>   
            <div class="procedureOneDescription"> ${procedure[i].procedure_text}</div> 
      </div>
    `
    }
}





fetchingEndpoints ()
fetchingProcedureEndpoints()