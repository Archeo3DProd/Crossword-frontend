import { useState, useEffect } from 'react';

/**
 * Gère la logique principale de la grille :
 * - création dynamique des cases
 * - mapping des cellules vers leurs mots
 * - saisie utilisateur
 * - validation
 */
export const useCrosswordLogic = (words, gridSize) => {
  const [grid, setGrid] = useState([]);
  const [cellToWordMap, setCellToWordMap] = useState(new Map());
  const [userInput, setUserInput] = useState({});
  const [validationMap, setValidationMap] = useState({});

  // 🧱 Construction de la grille à partir des mots
  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));

    const wordMap = new Map();

    words.forEach(({ word, row, col, direction, id }) => {
      for (let i = 0; i < word.length; i++) {
        const r = direction === 'across' ? row : row + i;
        const c = direction === 'across' ? col + i : col;
        const cellId = `${id}-${i}`;

        newGrid[r][c] = {
          letter: word[i].toUpperCase(),
          cellId: cellId,
        };

        wordMap.set(cellId, {
          wordId: id,
          direction,
          row: r,
          col: c,
          index: i,
        });
      }
    });

    setGrid(newGrid);
    setCellToWordMap(wordMap);
    setUserInput({});
    setValidationMap({});
  }, [words, gridSize]);

  return {
    grid,
    cellToWordMap,
    userInput,
    setUserInput,
    validationMap,
    setValidationMap,
  };
};
