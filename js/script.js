const ingredientsList = [];
const appareilsList = [];
const ustensilesList = [];
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    const ingredientName = ingredient.ingredient.toLowerCase();
    ingredientsList.includes(ingredientName) ? null : ingredientsList.push(ingredientName);
  });
  const appareilName = recipe.appliance.toLowerCase();
  appareilsList.includes(appareilName) ? null : appareilsList.push(appareilName);
  recipe.ustensils.forEach((ustensil) => {
    const ustensilName = ustensil.toLowerCase();
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

///

// const displayFilteredList = (recipes, _dropdownIngredient) => {
//   console.log(recipes);
//   const ul = document.querySelector("dropdownIngredient");
//   console.log(ul);
//   ul.innerHTML = "";
//   recipes.forEach((ingredient) => {
//     const li = document.createElement("li");
//     li.innerText = ingredient;
//     ul.appendChild(li);
//   });
// };

// const filterListByValue = (recipes, value) => {
//   return recipes.filter((recipe) => recipe.includes(value));
// };

// document.getElementById("#input-ingredient").addEventListener("change", (e) => {
//   const newTabIngredients = filterListByValue(ingredients, e.target.value);
//   displayFilteredList(newTabIngredients, "dropdownIngredient");
// });

// // document.getElementById("input-ustensil").addEventListener("change", (e) => {
// //   const newTabIngredients = filterListByValue(ustensils, e.target.value);
// //   displayFilteredList(newTabIngredients, ".ustensils ul");
// // });

// displayFilteredList(ingredients, "dropdownIngredient");

// const ingredients = ["coco", "cerises", "fraises"];
// const ustensils = ["casserole", "cuillière"];

// const displayFilteredList = (elementList, selector) => {
//   const ul = document.querySelector(selector);
//   ul.innerHTML = "";
//   elementList.forEach((ingredient) => {
//     // ...
//     const li = document.createElement("li");
//     li.innerText = ingredient;
//     ul.appendChild(li);
//   });
// };

// const filterListByValue = (list, value) => {
//   return list.filter((element) => element.includes(value));
// };

// document.getElementById("input-ingredient").addEventListener("change", (e) => {
//   const newTabIngredients = filterListByValue(ingredients, e.target.value);
//   displayFilteredList(newTabIngredients, ".ingredients ul");
// });

// document.getElementById("input-ustensil").addEventListener("change", (e) => {
//   const newTabIngredients = filterListByValue(ustensils, e.target.value);
//   displayFilteredList(newTabIngredients, ".ustensils ul");
// });

// displayFilteredList(ingredients, ".ingredients ul");
