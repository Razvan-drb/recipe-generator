/* 



const recettesG = document.getElementById('recettes');
const generer = document.getElementById('Generate');
const plats_url = 'https://www.themealdb.com/api/json/v1/1/random.php';






generer.addEventListener('click', () => {

    fetch(plats_url)
        .then(Response => Response.json())
        .then(ResponseJson => {
            console.log(ResponseJson);
            document.getElementById('recettes').innerHTML = JSON.stringify(obj);
            console.log(ResponseJson['idMeal']);
            document.getElementById('recettes').innerHTML = plats_url;
        })


})

 */

/* for (const { plats } of ResponseJson) {
    console.log(plats);
    const choix = document.getElementById('Generate');
    choix.innerText = plats;
    recettesG.append(choix);
} */


const get_meal_btn = document.getElementById('Generate');
const meal_container = document.getElementById('recettes');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    
    //on recupere tous les ingredients. max 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // s'il y a plus d'ingredients, on s'arrete
            break;
        }
    }
   
//on cherche l'image du plat avec ${meal.strMealThumb}
//
    const newInnerHTML = `
		<div class="row">

			<div class="columns five">
    
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>

			<div class="columns seven">

				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>

			</div>

		</div>


		${meal.strYoutube ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

    meal_container.innerHTML = newInnerHTML;
}

/* When the input field receives input, convert the value from pounds to kilograms */
function weightConverter(valNum) {
    document.getElementById("outputGrams").innerHTML = valNum / 0.0022046;
  } 




