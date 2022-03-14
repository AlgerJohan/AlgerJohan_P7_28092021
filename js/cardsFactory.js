function cardsFactory(recipesFiltred) {
  const cards = document.querySelector(".cards");
  //pour chaque recette tu vas faire la fonction qui suit
  let allCards = ""; // allCards = allHtml et newCard = newHtml
  if (recipesFiltred.length > 0) {
    recipesFiltred.forEach((recipe) => {
      let newCard = `
 <div class="card col-4 p-3 border-0">
 <img src="./img/fotomelia-free-images-download-public-domain-8.jpg" class="card-img-top" alt="" />
 <div class="card-body backgroundColor">
  <div class="d-flex justify-content-between">
    <h5 class="card-title">${recipe.name}</h5>
    <p><img src="./img/clock.svg" alt="clock"/>
    ${recipe.time} min</p>
  </div>
  <div class="card-text row my-3">
    <div class="col-6 ingredientRecipe">`;
      // for (let i = 0; i < 5; i++) {
      //   const ingredient = recipe.ingredients[i];
      //   if (ingredient) {
      //     newCard += `<p><strong>${ingredient.ingredient}</strong>`;
      //     if (ingredient.quantity) {
      //       newCard += `<strong>:</strong> ${ingredient.quantity}`;
      //       newCard += ingredient.unit ? ` ${ingredient.unit}` : "";
      //     }
      //     newCard += `</p>`;
      //   }
      // }
      recipe.ingredients.forEach((ingredient, key) => {
        if (key < 5) {
          newCard += `<p><strong>${ingredient.ingredient}</strong>`;
          if (ingredient.quantity) {
            newCard += `<strong>:</strong> ${ingredient.quantity}`;
            newCard += ingredient.unit ? ` ${ingredient.unit}` : "";
          }
          newCard += `</p>`;
        }
      });

      newCard += recipe.ingredients.length > 5 ? "<p>...</p>" : "";
      newCard += `
      </div>
      <div class="col-6 descriptionRecipe"><p>${recipe.description}</p></div>
      </div>
    </div>
</div>`;
      allCards += newCard;
    });
    cards.innerHTML = allCards;
  } else {
    cards.innerHTML = `<div class="col-12 text-center"><h2>Aucune recette ne correspond à votre critère… vous pouvez
  chercher « tarte aux pommes », « poisson », etc.
  </h2></div>`;
  }
}
