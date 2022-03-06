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
  const tagIngredientList = tagListFactory(".ingredientstags");
  if (tagIngredientList.length > 0) {
    tagIngredientList.forEach((tag) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(tag)));
      });
    });
  }
  //Filtres des recettes par appareils (dropdown)
  const tagAppareilsList = tagListFactory(".appareilstags");
  if (tagAppareilsList.length > 0) {
    tagAppareilsList.forEach((tag) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return clearText(recipe.appliance).includes(clearText(tag));
      });
    });
  }
  //Filtres des recettes par ustensiles (dropdown)
  const tagUstensilesList = tagListFactory(".ustensilestags");
  if (tagUstensilesList.length > 0) {
    tagUstensilesList.forEach((tag) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ustensils.some((ustensile) => clearText(ustensile).includes(clearText(tag)));
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
      ingredientsList.includes(ingredientName) || tagIngredientList.includes(ingredientName)
        ? null
        : ingredientsList.push(ingredientName);
    });
    const appareilName = clearText(recipe.appliance);
    appareilsList.includes(appareilName) || tagAppareilsList.includes(appareilName)
      ? null
      : appareilsList.push(appareilName);
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = clearText(ustensil);
      ustensilesList.includes(ustensilName) || tagUstensilesList.includes(ustensilName)
        ? null
        : ustensilesList.push(ustensilName);
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

function onDropdownChange(dropdownClass, tagTargetClass, primaryColor, successColor, dangerColor) {
  document.querySelector(dropdownClass).addEventListener("change", (e) => {
    const tags = document.querySelector(tagTargetClass);
    const tag = document.createElement("button");
    tag.classList.add("tag", primaryColor, successColor, dangerColor, "btn", "position-relative", "me-2");
    tag.setAttribute("type", "button");
    tag.innerHTML = `${e.target.value}<img src="./img/cross.svg" alt="Cross" class="ms-2"/>`;
    tag.addEventListener("click", deletetag);
    tags.appendChild(tag);
    //Réinitialisation de la valeur de la recherche du dropdown
    e.target.value = "";
    init();
  });
}
onDropdownChange(".ingredientsList", ".ingredientsTags", "primaryColor");
onDropdownChange(".appareilsList", ".appareilsTags", "successColor");
onDropdownChange(".ustensilesList", ".ustensilesTags", "dangerColor");
