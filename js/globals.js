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
  // return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Ajoute des options dans un datalist d'un dropdown
 * @param {array} list Tableau de valeurs
 * @param {string} target ID de l'élément HTML qui contient la liste
 */
function datalist(list, target) {
  let html = "";
  list.forEach((element) => {
    html += `<li value="${element}">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`;
  });
  document.querySelector(target).innerHTML = html;
}

function deleteBadge() {
  this.remove();
  init();
}
/*
 * Création d'une liste de badges
 */
function badgeListFactory(source) {
  //Crée la liste des tags ingrédients
  const badgeListNode = document.querySelectorAll(source + " .badge");
  let badgeList = [];
  badgeListNode.forEach((badge) => {
    badgeList.push(badge.innerText);
  });
  return badgeList;
}
