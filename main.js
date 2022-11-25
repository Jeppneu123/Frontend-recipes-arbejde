const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";

const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;


console.log("Hello Worlds")

// Const
const input =  document.querySelector("input.input-filter")
const divSelect = document.querySelector("div#list-recipes")
const searchBtn = document.querySelector("button.button-filter")

// EventListeners


// Fetch Recipes
function fetchingEndpoints () {
    fetch (endpoint + "/dishes").
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
    console.log(postList)
    let html = "";
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
                       
                            <img width="100%" height="100%" src="${post.dish_image}">
                       
                        
                        <div  class="description">
                        
                        <a> <span> Work time: </span> ${post.dish_work_time} <span> min</span></a>
                        <br>
                        <a> <span> Total time: </span> ${post.dish_time_total} <span> min</span></a>
                   
                        </div>
                    <a href="recipe.html?id=${post.dish_id}"> saasea  </a>
                </div>
            </div>
`
    }
    document.querySelector("#list-recipes").innerHTML = html;
}


function filterList (dishToFilter) {
    console.log(dishToFilter)
    input.addEventListener("input", function () {
        console.log("lasse")
        console.log(input)
        const inputValue = input.value
        console.log(inputValue)
        const filteredDishes = [];
        for (let i = 0; i < dishToFilter.length; i++) {
            const newDish = dishToFilter[i]
            console.log(newDish.dish_name)
            if (newDish.dish_name.toLowerCase().includes(inputValue)){
                filteredDishes.push(newDish)
            }
        }
        appendDishes(filteredDishes)
        console.log(filteredDishes)
    })
}


input.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        searchBtn.click()
    }
})

// form
const form = document.querySelector("#form")
const formBtn = document.querySelector("#form-button")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordCheck = document.querySelector("#password-check")

formBtn.addEventListener("click", function (event) {
    event.preventDefault()
    console.log("Hello")
    validateInputs ()
})

function success (element)
{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".fault")

    errorDisplay.innerHTML = "";
    inputControl.classList.add ('success')
    inputControl.classList.remove ('error')
}
function error (element, message)
{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".fault")

    errorDisplay.innerHTML = message;
    inputControl.classList.add ('error')
    inputControl.classList.remove ('success')
}

// https://www.w3resource.com/javascript/form/email-validation.php

function ValidateEmail(email)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
    {
        return (true)
    }
    alert("You have entered an invalid email address!")
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
        error(username, 'Username is requried');
    } else {
        success(username)
    }

    if (emailValue === ""){
        console.error(email, 'Email is requried')
    } else if (ValidateEmail(email)) {
        error (email, 'Provide valid email adress')
    } else {
        success(email)
    }
    if (passwordValue === '')
    {
        error (password, 'Password is required')
    } else if (passwordValue.length < 8 ){
        error (password, 'Password myst be a t least 8 characters')
    }else {
        success(password)
    }

    if (passwordCheckValue === ''){
        error (passwordCheck, 'Please confirm your password');
    } else if (passwordCheckValue !== passwordValue)
    {
        error(passwordCheck, "Password does not match")
    } else {
            success (passwordCheck)
        }
};




// === INITIALIZE APP === //
fetchingEndpoints()