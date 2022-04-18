// https://www.themealdb.com/api.php

const searchMeal = () => {
  const searchField = document.getElementById("meal-search");
  const searchValue = searchField.value;

  // Clear Input Field
  searchField.value = "";

  // Search Meal
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySearchResult(data.meals));
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
    
  // Clearing previous result   
  searchResult.innerHTML = "";

 // Looping through meals
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div onclick="leadMealDetails('${meal.idMeal}')" class="card">
            <img src="${
              meal.strMealThumb
            }" class="card-img-top" alt="Meal item">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};

const leadMealDetails = (mealID) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="card-body p-2">
        <h5 class="card-title text-center display-1">${meal.strMeal}</h5>
        <img src="${meal.strMealThumb}" class="card-img-top mb-3" alt="Meal item">
        <p class="card-text p-2">${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" class="btn btn-danger btn-lg">Watch on Youtube</a>
    </div>
    `;
  mealDetails.appendChild(div);
  window.scrollTo(0, 0);
};