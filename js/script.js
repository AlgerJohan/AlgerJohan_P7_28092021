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
  /* A loop that iterates over each recipe in the list of recipes. */
  recipesFiltred.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient;
      ingredientsList.includes(ingredientName) || badgeIngredientList.includes(ingredientName)
        ? null
        : ingredientsList.push(ingredientName);
    });

    const appareilName = recipe.appliance;
    appareilsList.includes(appareilName) || badgeAppareilsList.includes(appareilName)
      ? null
      : appareilsList.push(appareilName);

    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = ustensil;
      ustensilesList.includes(ustensilName) || badgeUstensilesList.includes(ustensilName)
        ? null
        : ustensilesList.push(ustensilName);
    });
  });

  //Ajoute les options des dropdowns
  /* It creates a listener for each dropdown. */
  datalist(ingredientsList, "#ingredients", ".ingredientsList");
  datalist(appareilsList, "#appareils", ".appareilsList");
  datalist(ustensilesList, "#ustensiles", ".ustensilesList");
  /**
   * Fonction qui crée un écouteur d'événement pour chaque dropdown
   */
  /**
   * * For each element in the list, add an event listener to the element that will call the
   * `badgeFactory` function
   * @param sourceElements - The element that contains the list of elements that will be used to generate
   * the badges.
   * @param badgeTargetClass - The class of the element that will be the target of the badge.
   * @param color - The color of the badge.
   */
  function onElementClick(sourceElements, badgeTargetClass, color) {
    document.querySelectorAll(sourceElements + " li").forEach((element) =>
      element.addEventListener("click", (e) => {
        badgeFactory(badgeTargetClass, color, e.target.innerText, e.target.attributes["value"].value);
      })
    );
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
// document.querySelectorAll(".card").forEach((card) => {
//   card.addEventListener("click", (e) => {
//     console.log(e);
//     // let person = prompt("Choisissez une recette :", "e.target");
//     // let text;
//     // if (person == null || person == "") {
//     //   text = "Entrez une recette.";
//     // } else {
//     //   text = "Bonjour " + person + "! Que voulez-vous manger?";
//     // }
//   });
// });

// const invisibleList = document.querySelector(".ingredients");
// invisibleList.addEventListener("click", (e) => {
//   e.style.display = "none";
//   console.log("cliqué");
// });
