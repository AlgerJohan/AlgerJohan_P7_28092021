//Création d'une liste vide pour les dropdowns
/* Creating a list of empty variables. */
let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];

/**
 * It creates a listener for each dropdown.
 */
function init() {
  //Filtre des recettes dans l'onglet recherche
  let searchText = document.querySelector(".form-control").value;
  searchText = searchText.length > 2 ? searchText : "";
  // let recipesFiltred = "";

  let recipesFiltred = [];
  if (searchText) {
    for (const recipe of recipesFiltred) {
      if (
        clearText(recipe.name).includes(clearText(searchText)) ||
        recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(searchText))) ||
        recipe.description.includes(clearText(searchText))
      ) {
        recipesFiltred.push(recipe);
      }
    }
  } else {
    recipesFiltred = recipes;
  }

  //Filtres des recettes par ingrédients (dropdown)
  const badgeIngredientList = badgeListFactory(".ingredientsBadges");
  if (badgeIngredientList.length > 0) {
    for (const badge of badgeIngredientList) {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(badge)));
      });
    }
  }
  //Filtres des recettes par appareils (dropdown)
  const badgeAppareilsList = badgeListFactory(".appareilsBadges");
  if (badgeAppareilsList.length > 0) {
    for (const badge of badgeAppareilsList) {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return clearText(recipe.appliance).includes(clearText(badge));
      });
    }
  }
  //Filtres des recettes par ustensiles (dropdown)
  const badgeUstensilesList = badgeListFactory(".ustensilesBadges");
  if (badgeUstensilesList.length > 0) {
    for (const badge of badgeUstensilesList) {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ustensils.some((ustensile) => clearText(ustensile).includes(clearText(badge)));
      });
    }
  }
  //Création des cards avec les recettes filtrées et les afficher
  cardsFactory(recipesFiltred);

  //Réinitialisation des listes des dropdowns
  ingredientsList = [];
  appareilsList = [];
  ustensilesList = [];
  //Création des listes des dropdowns avec les recettes filtrées
  for (const recipe of recipesFiltred) {
    /* A loop that iterates over the elements of the array. */
    for (const ingredient of recipe.ingredients) {
      const ingredientName = ingredient.ingredient;
      ingredientsList.includes(ingredientName) || badgeIngredientList.includes(ingredientName)
        ? null
        : ingredientsList.push(ingredientName);
    }

    const appareilName = recipe.appliance;
    appareilsList.includes(appareilName) || badgeAppareilsList.includes(appareilName)
      ? null
      : appareilsList.push(appareilName);

    for (const ustensil of recipe.ustensils) {
      const ustensilName = ustensil;
      ustensilesList.includes(ustensilName) || badgeUstensilesList.includes(ustensilName)
        ? null
        : ustensilesList.push(ustensilName);
    }
  }

  //Ajoute les options des dropdowns
  /* It creates a listener for each dropdown. */
  datalist(ingredientsList, "#ingredients", ".ingredientsList");
  datalist(appareilsList, "#appareils", ".appareilsList");
  datalist(ustensilesList, "#ustensiles", ".ustensilesList");

  /**
   * It creates badges for each element of the dropdown.
   * @param sourceElements - The element that contains the list of elements to be clicked.
   * @param badgeTargetClass - The class of the badge that will be created.
   * @param color - The color of the badge.
   */
  function onElementClick(sourceElements, badgeTargetClass, color) {
    for (const element of document.querySelectorAll(sourceElements + " li")) {
      element.addEventListener("click", (e) => {
        badgeFactory(badgeTargetClass, color, e.target.innerText, e.target.attributes["value"].value);
      });
    }
  }
  onElementClick("#ingredients", ".ingredientsBadges", "primaryColor");
  onElementClick("#appareils", ".appareilsBadges", "successColor");
  onElementClick("#ustensiles", ".ustensilesBadges", "dangerColor");
}
init();
//Écoute le changement de la valeur de la recherche
document.querySelector(".form-control").addEventListener("input", (e) => {
  init();
});

function onDropdownChange(dropdownClass, badgeTargetClass, color) {
  document.querySelector(dropdownClass).addEventListener("change", (e) => {
    badgeFactory(badgeTargetClass, color, e.target.value, e.target.value);
    //Réinitialisation de la valeur de la recherche du dropdown
    e.target.value = "";
  });
}
document.querySelector(".ingredientsList").addEventListener("input", (e) => {
  init();
});
document.querySelector(".appareilsList").addEventListener("input", (e) => {
  init();
});
document.querySelector(".ustensilesList").addEventListener("input", (e) => {
  init();
});
const dropdownDownIngredients = document.querySelector(".dropdownDownIngredients");
const dropdownUpIngredients = document.querySelector(".dropdownUpIngredients");
const ingredientsTagBtn = document.getElementById("ingredients-tag-btn");
const openedBtningredients = document.querySelector(".opened-btn-ingredients");

const dropdownDownAppareils = document.querySelector(".dropdownDownAppareils");
const dropdownUpAppareils = document.querySelector(".dropdownUpAppareils");
const appareilsTagBtn = document.getElementById("appareils-tag-btn");
const openedBtnAppareils = document.querySelector(".opened-btn-appareils");

const dropdownDownUstensiles = document.querySelector(".dropdownDownUstensiles");
const dropdownUpUstensiles = document.querySelector(".dropdownUpUstensiles");
const ustensilesTagBtn = document.getElementById("ustensiles-tag-btn");
const openedBtnUstensiles = document.querySelector(".opened-btn-ustensiles");

/**
 * The function launches a dropdown menu by adding an event listener to the dropdownDown button.
 * When the dropdownDown button is clicked, the openedBtn and tagBtn elements are displayed.
 * When the dropdownUp button is clicked, the tagBtn and openedBtn elements are hidden
 * @param dropdownDown - the button that opens the dropdown
 * @param dropdownUp - the button that closes the dropdown
 * @param openedBtn - the button that opens the dropdown
 * @param tagBtn - the button that opens the dropdown
 */
function launchDropdown(dropdownDown, dropdownUp, openedBtn, tagBtn) {
  dropdownDown.addEventListener("click", () => {
    openedBtn.style.display = "block";
    tagBtn.style.display = "none";
  });
  dropdownUp.addEventListener("click", () => {
    tagBtn.style.display = "block";
    openedBtn.style.display = "none";
  });
}

launchDropdown(dropdownDownIngredients, dropdownUpIngredients, openedBtningredients, ingredientsTagBtn);
launchDropdown(dropdownDownAppareils, dropdownUpAppareils, openedBtnAppareils, appareilsTagBtn);
launchDropdown(dropdownDownUstensiles, dropdownUpUstensiles, openedBtnUstensiles, ustensilesTagBtn);
