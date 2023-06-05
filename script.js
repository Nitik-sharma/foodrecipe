const button = document.getElementById('searchBtn');
const searchBox = document.querySelector('.searchBox');
const recipeCont = document.querySelector('.container_recipe');
const closeBtn = document.querySelector('.recipe-close-btn');
const recipedetailContent = document.querySelector('.recipe-detail-content')



const fetchApi = async (query) => {
    recipeCont.innerHTML = "Fetch recipee......";

    try {


        const a = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await a.json();
        recipeCont.innerHTML = "";
        response.meals.map(meal => {




            // create a div in js
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');


            recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal
                }</h3>

        <p> <span>${meal.strArea
                }</span>Dish</p>
        <p>Belongs to <span>${meal.strCategory
                }</span>Category</p>
        `



            //  create a button
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            button.classList.add('button');
            recipeDiv.appendChild(button);
            recipeCont.appendChild(recipeDiv);
            console.log(meal);


            // adding a event listener to button

            button.addEventListener('click', () => {
                popMsg(meal);
            })
        
        })
    } catch (error) {
            recipeCont.innerHTML=`<h1>Fatching error in recipe...........</h1>`    
    }



    }
const fatchIngredient = (meal) => {
        let IngredientList = "";
        for (let i = 1; i <= 20; i++) {
            const Ingredient = meal[`strIngredient${i}`];
            if (Ingredient) {
                const measure = meal[`strMeasure${i}`];
                IngredientList += `<li>${measure} ${Ingredient}</li>`
            } else {
                break;
            }
        }
        return IngredientList;
    }
    const popMsg = (meal) => {
        recipedetailContent.innerHTML = `<h2 class="recipeName">${meal.strMeal}</h2>
   <h2>Ingredient:</h2>
   <ul class="ingredientList">${fatchIngredient(meal)}</ul>
   
   <div class="instruction">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions
            }</p>
        </div>
    `

        recipedetailContent.parentElement.style.display = 'block';
    }

    closeBtn.addEventListener('click', () => {
        recipedetailContent.parentElement.style.display = 'none';
    })

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInput = searchBox.value.trim();
        if (!searchInput) {
            recipeCont.innerHTML = `<h2>Type in the search box!!!!</h2>`
            return;
        }
        fetchApi(searchInput);
    })


