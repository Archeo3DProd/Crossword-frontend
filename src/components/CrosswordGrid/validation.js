/**
 * Vérifie toutes les lettres saisies dans la grille
 * Retourne :
 * - un objet { cellId: true/false } pour la coloration
 * - un compteur d’erreurs
 */
export const verifyGrid = (grid, userInput) => {
  const result = {};
  let errors = 0;

  grid.forEach(row => {
    row.forEach(cell => {
      if (cell?.cellId) {
        const value = (userInput[cell.cellId] || '').toUpperCase();
        const isCorrect = value === cell.letter;
        result[cell.cellId] = isCorrect;
        if (!isCorrect) errors++;
      }
    });
  });

  return { result, errors };
};

/**
 * Détermine si la grille est entièrement correcte
 */
export const isGridComplete = (validationMap) =>
  Object.values(validationMap).length > 0 &&
  Object.values(validationMap).every(Boolean);
