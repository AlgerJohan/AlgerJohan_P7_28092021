/**
 * enlève les accents et les espaces inutiles d'un texte
 * @param {string} text Texte à nettoyer
 * @returns Texte nettoyé
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
function datalist(list, target) {
  let html = "";
  list.forEach((element) => {
    html += `<option value="${element}"></option>`;
  });
  document.querySelector(target).innerHTML = html;
}

function deletetag() {
  this.remove();
  init();
}
/*
 * Création d'une liste de tags
 */
function tagListFactory(source) {
  //Crée la liste des tags ingrédients
  const tagListNode = document.querySelectorAll(source + " .tag");
  let tagList = [];
  tagListNode.forEach((tag) => {
    tagList.push(tag.innerText);
  });
  return tagList;
}
