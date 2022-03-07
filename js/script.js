//Création d'une liste vide pour les dropdowns
let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];

function init() {
  let searchText = document.querySelector(".form-control").value;
  searchText = searchText.length > 2 ? searchText : "";
  //Filtre des recettes dans l'onglet recherche
  let recipesFiltred = "";
  if (searchText) {
    recipesFiltred = recipes.filter((recipe) => {
      return (
        clearText(recipe.name).includes(clearText(searchText)) ||
        recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(searchText))) ||
        recipe.description.includes(clearText(searchText))
      );
    });
  } else {
    recipesFiltred = recipes;
  }

  //Filtres des recettes par ingrédients (dropdown)
  const badgeIngredientList = badgeListFactory(".ingredientsBadges");
  if (badgeIngredientList.length > 0) {
    badgeIngredientList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(badge)));
      });
    });
  }
  //Filtres des recettes par appareils (dropdown)
  const badgeAppareilsList = badgeListFactory(".appareilsBadges");
  if (badgeAppareilsList.length > 0) {
    badgeAppareilsList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return clearText(recipe.appliance).includes(clearText(badge));
      });
    });
  }
  //Filtres des recettes par ustensiles (dropdown)
  const badgeUstensilesList = badgeListFactory(".ustensilesBadges");
  if (badgeUstensilesList.length > 0) {
    badgeUstensilesList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ustensils.some((ustensile) => clearText(ustensile).includes(clearText(badge)));
      });
    });
  }
  //Création des cards avec les recettes filtrées et les afficher
  cardsFactory(recipesFiltred);

  //Réinitialisation des listes des dropdowns
  ingredientsList = [];
  appareilsList = [];
  ustensilesList = [];
  //Création des listes des dropdowns avec les recettes filtrées
  recipesFiltred.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = clearText(ingredient.ingredient);
      ingredientsList.includes(ingredientName) || badgeIngredientList.includes(ingredientName)
        ? null
        : ingredientsList.push(ingredientName);
    });
    const appareilName = clearText(recipe.appliance);
    appareilsList.includes(appareilName) || badgeAppareilsList.includes(appareilName)
      ? null
      : appareilsList.push(appareilName);
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = clearText(ustensil);
      ustensilesList.includes(ustensilName) || badgeUstensilesList.includes(ustensilName)
        ? null
        : ustensilesList.push(ustensilName);
    });
  });
  //Ajoute les options des dropdowns
  datalist(ingredientsList, "#ingredients");
  // datalist(appareilsList, "#appareils");
  // datalist(ustensilesList, "#ustensiles");
  document.querySelectorAll("li").forEach((element) =>
    element.addEventListener("click", (e) => {
      badgeFactory(".ingredientsBadges", "primaryColor", e.target.innerText);
    })
  );
}
init();
//Écoute le changement de la valeur de la recherche
document.querySelector(".form-control").addEventListener("input", (e) => {
  init();
});

function onDropdownChange(dropdownClass, badgeTargetClass, color) {
  document.querySelector(dropdownClass).addEventListener("change", (e) => {
    badgeFactory(badgeTargetClass, color, e.target.value);
    //Réinitialisation de la valeur de la recherche du dropdown
    e.target.value = "";
  });
}
onDropdownChange(".ingredientsList", ".ingredientsBadges", "primaryColor");
onDropdownChange(".appareilsList", ".appareilsBadges", "successColor");
onDropdownChange(".ustensilesList", ".ustensilesBadges", "dangerColor");

function badgeFactory(badgeTargetClass, color, value) {
  const badges = document.querySelector(badgeTargetClass);
  const badge = document.createElement("button");
  badge.classList.add("badge", color, "btn", "position-relative", "me-2");
  badge.setAttribute("type", "button");
  badge.innerHTML = `${value}<img src="./img/cross.svg" alt="Cross" class="ms-2"/>`;
  badge.addEventListener("click", deleteBadge);
  badges.appendChild(badge);
  init();
}
