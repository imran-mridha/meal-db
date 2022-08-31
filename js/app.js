
// Call MealDB Api
const loadMeals = async (search, dataLimit) => {
  console.log(search)
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

  const res = await fetch(url);
  const data = await res.json();

  displayMeals(data.meals, dataLimit)
}
// Display Meals
const displayMeals = (meals, dataLimit) => {
  console.log(meals)
  const showAll = document.getElementById('show-all');
  if (dataLimit && meals.length > 9) {
    meals = meals.slice(0, 9);
    showAll.classList.remove('hidden')
  } else {
    showAll.classList.add('hidden')
  }
  const mealsContainer = document.getElementById('meals-container');
  mealsContainer.innerHTML = '';
  const notFound = document.getElementById('not-found-massege');
  if (meals === null) {
    notFound.classList.remove('hidden');
  } else {
    notFound.classList.add('hidden')
  };
  meals.forEach(meal => {
    console.log(meal)
    const { strMealThumb, strMeal, strInstructions } = meal;
    const mealsDiv = document.createElement('div');
    mealsDiv.innerHTML = `
    <div class="rounded-lg shadow-lg bg-white ">
            <a href="#!">
              <img class="rounded-t-lg" src="${strMealThumb}" alt=""/>
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">${strMeal}</h5>
              <p class="text-gray-700 text-base mb-4">
                ${strInstructions.slice(0, 100)}...
              </p>
              
              <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
               Show Details
              </button>
            </div>
          </div>
    `;
    mealsContainer.append(mealsDiv);
    toggleSpinner(false)
  });
}
// Adding Search Proces
const searchProces = dataLimit => {
  toggleSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadMeals(searchText, dataLimit)
}
// Default Meals Showing one UI
const searchFoodLimit = () => {
  searchProces(9);
}

// Show All Meals On the UI

const searchFoodAll = () => {
  searchProces();
}

// Set Enter Event on the search field
document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(event.target.value)
  if (e.key === 'Enter') {
    searchFoodLimit(9);
  }
})

// Toggle Spinner

const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');

  if (isLoading) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}

const loadMealDetails = async id => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  // console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals)
}

const displayMealDetails = meal => {
  console.log(meal)
}
loadMeals('', 9)