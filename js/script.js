let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];
function init(searchText) {
  let recipesFiltred = "";
  if (searchText) {
    recipesFiltred = recipes.filter((recipe) => {
      return clearText(recipe.name).includes(clearText(searchText));
    });
  } else {
    recipesFiltred = recipes;
  }
  cardsFactory(recipesFiltred);
  ingredientsList = [];
  appareilsList = [];
  ustensilesList = [];
  recipesFiltred.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = clearText(ingredient.ingredient);
      ingredientsList.includes(ingredientName) ? null : ingredientsList.push(ingredientName);
    });
    const appareilName = clearText(recipe.appliance);
    appareilsList.includes(appareilName) ? null : appareilsList.push(appareilName);
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = clearText(ustensil);
      ustensilesList.includes(ustensilName) ? null : ustensilesList.push(ustensilName);
    });
  });
  function datalist(list, target) {
    let html = "";
    list.forEach((element) => {
      html += `<option value="${element}"></option>`;
    });
    document.querySelector(target).innerHTML = html;
  }
  datalist(ingredientsList, ".showIngredients");
  datalist(appareilsList, ".showAppareils");
  datalist(ustensilesList, ".showUstensiles");
}
init();
//Écoute le changement de la valeur de la recherche
document.querySelector(".form-control").addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    init(e.target.value);
  } else {
    init();
  }
});
