/**
 * enlève les accents et les espaces inutiles d'un texte
 * @param {string} text Texte à nettoyer
 * @returns Texte nettoyé
 */
/**
 * Replace special characters in a string with their English equivalents, and then convert the entire
 * string to lowercase
 * @param text - The text to be cleaned.
 * @returns The text is being returned in lowercase and without any special characters.
 */
function clearText(text) {
  text = text
    .replace(/é|è|ê|ë/gi, "e")
    .replace(/â|ä|à/gi, "a")
    .replace(/ô|ö/gi, "o")
    .replace(/î|ï/gi, "i")
    .replace(/û|ü/gi, "u")
    .toLowerCase();
  return text;
}

/**
 * Ajoute des options dans un datalist d'un dropdown
 * @param {array} list Tableau de valeurs
 * @param {string} target ID de l'élément HTML qui contient la liste
 */
/**
 * The function takes a list of ingredients and a target element, and creates a list of ingredients
 * that match the search term
 * @param list - the list of ingredients to be filtered
 * @param target - The HTML element that will be updated with the new list.
 * @param inputClass - The class of the input element.
 */
function datalist(list, target, inputClass) {
  //Filtres inputDropdown
  const text = document.querySelector(inputClass).value;
  if (text.length > 0) {
    list = list.filter((ingredient) => {
      return clearText(ingredient).includes(clearText(text));
    });
  }
  let html = "";
  for (const element of list) {
    html += `<li class="recipe" value="${element}">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`;
  }
  document.querySelector(target).innerHTML = html;
}

/**
 * Delete the badge from the DOM and re-initialize the badge
 */
function deleteBadge() {
  this.remove();
  init();
}

/**
 * Create a list of all the tags in the source
 * @param source - The CSS selector for the element that contains the badges.
 * @returns The list of tags.
 */
function badgeListFactory(source) {
  //Crée la liste des tags ingrédients
  const badgeListNode = document.querySelectorAll(source + " .badge");
  let badgeList = [];
  for (const badge of badgeListNode) {
    badgeList.push(badge.attributes["data"].value);
  }
  return badgeList;
}

/**
 * Create a badge with a value and a cross icon
 * @param badgeTargetClass - The class of the element where the badge will be appended.
 * @param color - The color of the badge.
 * @param value - The value of the badge.
 * @param originValue - The value of the badge that will be deleted.
 */
function badgeFactory(badgeTargetClass, color, value, originValue) {
  const badges = document.querySelector(badgeTargetClass);
  const badge = document.createElement("button");
  badge.classList.add("badge", color, "btn", "position-relative", "me-2");
  badge.setAttribute("type", "button");
  badge.setAttribute("data", originValue);
  badge.innerHTML = `${value}<img src="./img/cross.svg" alt="Cross" class="ms-2"/>`;
  badge.addEventListener("click", deleteBadge);
  badges.appendChild(badge);
  init();
}
