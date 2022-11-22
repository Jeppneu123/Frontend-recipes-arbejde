const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";

const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;


console.log("Hello Worlds")

// Fetch Recipes
function fetchingEndpoints () {
    fetch (endpoint + "/dishes").
    then(function (res) {
        return res.json();
    })
    .then(function (Recipes){

        appendDishes (Recipes)

    })
};

function resetSite ()
{
    document.innerHTML = " ";
}

function appendDishes (postList)
{
    console.log(postList)
    let html = "";
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
                        </div>
                
                </div>
            </div>
`
    }
    document.querySelector("#list-recipes").innerHTML = html;
}


// === INITIALIZE APP === //
fetchingEndpoints()