const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

const display = document.getElementById("display");

const backButton=document.getElementById("back");

backButton.addEventListener("click",backToHome);

function backToHome(){
    window.location.href="../home.html";
}

const x = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
x.then(function (response) {
    return response.json();
}).then(function (data) {
    displaymealDetails(data.meals[0]);
})

function displaymealDetails(data) {
    const mealMain = document.createElement("div");
    mealMain.className= "meal-main";
    if (data.Poster=="N/A"){
        data.Poster="../noImage.png";
    }
    mealMain.innerHTML = `
    <div id="poster-details">
    <img src=${data.strMealThumb}
        alt="">
    <div id="meal-extras">
        
        <div id="meal-title">
            <b>${data.strMeal}</b>
        </div>
        <hr class="line">
        <div class="meal-details-1">
            <p>${data.strCategory}</p>
            <p>${data.strArea}</p>
        </div>
        <hr class="line">
        <div id="plot">
            <p>${data.strInstructions}</p>
        </div>
        </div>
    </div>
    `
    display.append(mealMain);
}