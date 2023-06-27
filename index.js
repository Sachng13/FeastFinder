const searchInput = document.getElementById("search-input");

const displaySearchItem = document.getElementById("display-Search-Item");

var noSearchItem = displaySearchItem.innerHTML;

const searchBtn=document.getElementById("btn");



const asideMain = document.getElementById("aside-main");

const asideMainFavList=document.getElementById("aside-main-fav-list");





// Searching functionality-..................................................................
searchInput.addEventListener("input", readSearchInput);
searchBtn.addEventListener("click",readSearchInput);

// Reading INput given by the user
function readSearchInput(e) {
    let searchedItem = searchInput.value.trim();;
    if (searchedItem.length > 0) {
        loadSearchItem(searchedItem);
    }else {
        displaySearchItem.innerHTML = noSearchItem;
    }
}

// loading meals Array from api according to searched by user;
function loadSearchItem(searchedItem) {
    let x = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedItem}`);
    x.then(function (response) {
        return response.json();
    }).then(function (data) {
        renderList(data.meals);
    })
}
//  display the list on main............

function renderList(resultList) {
    if (resultList != undefined) {
        displaySearchItem.innerHTML = "";
        for (var i = 0; i < resultList.length; i++) {
            let renderItem = document.createElement("div");
            let renderListItem = resultList[i];
            renderItem.classList.add("search-item");
            renderItem.dataset.id=`${renderListItem.idMeal}`
            if (renderListItem.strMealThumb=="N/A"){
                renderListItem.strMealThumb="noImage.png";
            }
            renderItem.innerHTML = `
            <img src=${renderListItem.strMealThumb}
          alt="image not available">
        <div class="search-item-details">
          <p>${renderListItem.strMeal}</p>
          <p>${renderListItem.strCategory}</p>
          <p>${renderListItem.strArea}</p>
        </div>
        <div class="add-fav-info" >
        <i class="fa-solid fa-circle-info" data-id=${renderListItem.idMeal}></i>
          <i class="far fa-heart fa-lg fav-icon"  data-id=${renderListItem.idMeal}></i>
        </div>
            `
                displaySearchItem.append(renderItem);
        }
    } 
}


// callingApiToAddMealInFav
function callingApiToAddMealInFav(e) {
      let exitAlready=checkAlreadyExit(e.target);
      if (!exitAlready){
          //Calling api using imdbId
          let x = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.dataset.id}`);
          x.then(function (response) {
              return response.json();
          }).then(function (data) {
              addingElementToFavourite(data.meals[0]);
          })
      }else {
        alert("Meal already exist in favourites ");
      }
    }

//Checking meal Already exist in fav-list or not;
function checkAlreadyExit(item){
    let bool=false;
    if (asideMainFavList.children.length==0){
        return false;
    }
    for (let i=0;i<asideMainFavList.children.length;i++){
        if (item.dataset.id==asideMainFavList.children[i].dataset.id){
            bool=true;
        }
    }
    return bool;

}

// Adding Element to the favourites list;
function addingElementToFavourite(data) {
    let favMeal = document.createElement("li");

    favMeal.dataset.id=`${data.idMeal}`
    if (data.strMealThumb=="N/A"){
        data.strMealThumb="noImage.png";
    }
    favMeal.innerHTML = `
    <div class="fav-meals">
    <img src=${data.strMealThumb}
    alt="image not available">
     <div class="fav-meals-details">
      <p>${data.strMeal}</p>
      <p>${data.strCategory}</p>
      <p>${data.strArea}</p>
    </div>
    <div class="fav-meals-remove-fav">
    <i class="fa-solid fa-circle-info" data-id=${data.idMeal}></i>
    <i class="fa-solid fa-trash-can fa-lg un-fav-icon" data-id=${data.idMeal}></i>
    </div>
    </div>`
    asideMainFavList.append(favMeal);
    saveData();
}

// Removing element from fav list;
function removeMealFromFav(e){
   for (var x=0;x<asideMainFavList.children.length;x++){
    if (asideMainFavList.children[x].dataset.id==e.target.dataset.id){
        asideMainFavList.removeChild(asideMainFavList.children[x]);
   }
 }
   saveData()
}


document.addEventListener("click",clickEventHandlers);


function clickEventHandlers(e){

 if (e.target.className == "far fa-heart fa-lg fav-icon"){
    callingApiToAddMealInFav(e);
 }
  
 if (e.target.className =="fa-solid fa-trash-can fa-lg un-fav-icon"){
    removeMealFromFav(e);
 }

 if (e.target.className=="fa-solid fa-circle-info"){
    window.location.href=`mealPage/home.html?id=${e.target.dataset.id}`;
 }
}
function saveData(){
    localStorage.setItem("xdata",asideMainFavList.innerHTML);
}
function displayData(){
    asideMainFavList.innerHTML=localStorage.getItem("xdata");
}
displayData();