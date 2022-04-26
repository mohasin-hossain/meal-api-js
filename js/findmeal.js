// Search on keyboard Enter
const inputField = document.getElementById("meal-search");
const searchBtn = document.getElementById("search-btn");
inputField.addEventListener("keypress", function(event) {
    if (event.key == 'Enter') {
        searchBtn.click();
    }
});

// Search Meal
const searchMeal = async () => {
  const searchField = document.getElementById("meal-search");
  const searchValue = searchField.value;

  // Clear Input Field
  searchField.value = "";

  // Show spinner
  toggleSpinner("block");

  if (searchValue == "") {
    const error = document.getElementById("error");
    // Clearing previous error message
    error.textContent = "";

    // Showing error
    error.innerHTML = `
      <p class="text-center text-danger fw-bold"> Please write any meal name!</p>
    `;
  } else {
    // Search Meal
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
    displaySearchResult(data.meals);
  }
};

const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");

  // Clearing previous result
  searchResult.textContent = "";
  const error = document.getElementById("error");
  error.textContent = "";
  const mealDetails = document.getElementById("meal-details");
  // Clearing previous meal details
  mealDetails.textContent = "";

  if (meals == null) {
    const error = document.getElementById("error");
    // Clearing previous error message
    error.textContent = "";

    // Showing error
    error.innerHTML = `
    <p class="text-center text-danger fw-bold"> No meal found! Please try another food name.</p>
  `;
    // Hide spinner
    toggleSpinner("none");
  } else {
    // Looping through meals
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div onclick="leadMealDetails('${meal.idMeal}')" class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal item">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
          </div>
      </div>
      `;
      searchResult.appendChild(div);
    });
    // Hide spinner
    toggleSpinner("none");
  }
};

const leadMealDetails = async (mealID) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  const response = await fetch(url);
  const data = await response.json();
  displayMealDetails(data.meals[0]);
};

const displayMealDetails = (meal) => {
  const mealDetails = document.getElementById("meal-details");

  // Clearing previous meal details
  mealDetails.textContent = "";

  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="card-body p-2">
        <h5 class="card-title text-center display-3">${meal.strMeal}</h5>
        <img src="${meal.strMealThumb}" class="card-img-top mb-3" alt="Meal item">
        <p class="card-text p-2">${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" class="btn btn-danger btn-lg">Watch on Youtube</a>
    </div>
    `;
  mealDetails.appendChild(div);
  window.scrollTo(0, 0);
};
