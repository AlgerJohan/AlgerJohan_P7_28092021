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
