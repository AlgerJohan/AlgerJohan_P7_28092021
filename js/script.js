//Création d'une liste vide pour les dropdowns
let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];

function init() {
  let searchText = document.querySelector(".form-control").value;
  searchText = searchText.length > 2 ? searchText : "";
  const badgeListNode = document.querySelectorAll(".badge");
  let badgeList = [];
  badgeListNode.forEach((badge) => {
    badgeList.push(badge.innerText);
  });
  console.log(badgeList);
  //Filtre des recettes
  let recipesFiltred = "";
  if (searchText) {
    recipesFiltred = recipes.filter((recipe) => {
      return (
        clearText(recipe.name).includes(clearText(searchText)) ||
        recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(searchText))) ||
        recipe.description.includes(searchText)
      );
    });
  } else {
    recipesFiltred = recipes;
  }
  console.log(badgeList);
  if (badgeList != []) {
    recipesFiltred = recipesFiltred.filter((recipe) => {
      return recipe.ingredients.filter((ingredient) => badgeList.includes(clearText(ingredient.ingredient)));
    });
  } else {
    recipesFiltred = recipesFiltred;
    console.log("pas de filtre");
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
      ingredientsList.includes(ingredientName) ? null : ingredientsList.push(ingredientName);
    });
    const appareilName = clearText(recipe.appliance);
    appareilsList.includes(appareilName) ? null : appareilsList.push(appareilName);
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = clearText(ustensil);
      ustensilesList.includes(ustensilName) ? null : ustensilesList.push(ustensilName);
    });
  });
  //Ajoute les options des dropdowns
  datalist(ingredientsList, "#ingredients");
  datalist(appareilsList, "#appareils");
  datalist(ustensilesList, "#ustensiles");
}
init();
//Écoute le changement de la valeur de la recherche
document.querySelector(".form-control").addEventListener("input", (e) => {
  init();
});
document.querySelector(".ingredientsList").addEventListener("change", (e) => {
  const badges = document.querySelector(".badges");
  const badge = document.createElement("button");
  badge.classList.add("badge", "color", "btn", "position-relative", "me-2");
  badge.setAttribute("type", "button");
  badge.innerHTML = `${e.target.value}<img src="./img/cross.svg" alt="Cross" class="ms-2"/>`;
  badge.addEventListener("click", deleteBadge);
  badges.appendChild(badge);
  //Réinitialisation de la valeur de la recherche du dropdown
  e.target.value = "";
  init();
});

function deleteBadge() {
  this.remove();
  init();
}
