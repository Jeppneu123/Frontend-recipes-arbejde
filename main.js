const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "https://recipe-api-0qy8.onrender.com";

const endpoint = isLocalhost ? "http://localhost:3000/" : serverUrl;


console.log("Hello Worlds")

// Const -

const input =  document.querySelector("input.input-filter")

    // - Form
const formBtn = document.querySelector("#form-button")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordCheck = document.querySelector("#password-check")

// addEventListener

        // Registration
formBtn.addEventListener("click", validateRegistration)

// Fetch Recipes
function fetchingEndpoints () {
    fetch (endpoint + "dishes").
    then(function (res) {
        return res.json();
    })
    .then(function (Recipes){
        appendDishes (Recipes)
        filterList(Recipes)
    })
};

function appendDishes (postList)
{
    let html = "";
    const divSelect = document.querySelector("div#list-recipes")
    divSelect.innerHTML = "";
    for (let i = 0; i < postList.length; i++)
    {
        const post = postList[i];

        html += `
       
            <div class="recipes-pictures">
                <div class="circle">
                </div>
                
                <div class="recipes-item">
                     <h2 class="headline"> ${post.dish_name}</h2>
                       
                            <img  width="100%" height="100%" src="${post.dish_image}">
                       
                        
                        <div class="description">
                        
                        <a> <span> Work time: </span> ${post.dish_work_time} <span> min</span></a>
                        <br>
                        <a> <span> Total time: </span> ${post.dish_time_total} <span> min</span></a>
                        <a href="recipe.html?id=${post.dish_id}">See Dish</a>
                        </div>
                
                </div>
            </div>  
`
    }
    document.querySelector("#list-recipes").innerHTML = html;
}

function filterList (dishToFilter) {
    const searchBar = document.querySelector("input.input-filter")

    searchBar.addEventListener("input", function () {


        const input = document.querySelector("input.input-filter")
        const inputValue = input.value
        const filteredDishes = [];
        for (let i = 0; i < dishToFilter.length; i++) {
            const newDish = dishToFilter[i]
            if (newDish.dish_name.toLowerCase().includes(inputValue)){
                filteredDishes.push(newDish)
            }
        }
        appendDishes(filteredDishes)
    })
}

// Registration

function validateRegistration (event){
    event.preventDefault()
    validateInputs ()
}

function success (element)
{
    const controllingInput = element.parentElement;
    const displayErrorDiv = controllingInput.querySelector(".fault")

    displayErrorDiv.innerHTML = "";
    controllingInput.classList.add ('success')
    controllingInput.classList.remove ('error')
}
function error (element, message)
{
    const controllingInput = element.parentElement;
    const inputControl = element.parentElement;
    const displayErrorDiv = inputControl.querySelector(".fault")

    displayErrorDiv.innerHTML = message;
    controllingInput.classList.add ('error')
    controllingInput.classList.remove ('success')
}

    // https://www.w3resource.com/javascript/form/email-validation.php

function ValidateEmail(email)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
    {
        return (true)
    }
        return (false)
}

    // trim = remove whitespace from the text that you type

function validateInputs ()
{
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim()

    if (usernameValue === "")
    {
        error(username, 'Username required');
    } else {
        success(username)
    }
    if (emailValue === ""){
        error(email, 'Email required')
    } else if (ValidateEmail(email)) {
        success(email)
    } else {
        error (email, 'Provide valid email address')
    }
    if (passwordValue === '')
    {
        error (password, 'Password required')
    } else if (passwordValue.length < 10 ){
        error (password, 'Password must be at least 10 characters')
    }else {
        success(password)
    }

    if (passwordCheckValue === ''){
        error (passwordCheck, 'Confirm password');
    } else if (passwordCheckValue !== passwordValue)
    {
        error(passwordCheck, "Password does not match")
    } else {
            success (passwordCheck)
        }
};

// === INITIALIZE APP === //
fetchingEndpoints()




