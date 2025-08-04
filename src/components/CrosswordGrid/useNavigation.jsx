import { useRef } from 'react';

/**
 * Gère la navigation dans la grille :
 * - déplacement automatique dans le mot
 * - retour avec Backspace
 * - gestion des références de cases
 */
export const useNavigation = (grid, cellToWordMap, userInput, setUserInput, setActiveWordId) => {
  const inputRefs = useRef({});

  /**
   * Saisie dans une case
   * → Met à jour la lettre
   * → Passe à la case suivante dans la direction du mot
   */
  const handleChange = (cellId, value) => {
    const nextValue = value.toUpperCase().slice(0, 1);
    setUserInput(prev => ({
      ...prev,
      [cellId]: nextValue,
    }));

    const wordInfo = cellToWordMap.get(cellId);
    if (!wordInfo) return;

    const { direction, index, wordId } = wordInfo;
    const nextCellId = `${wordId}-${index + 1}`;
    const nextRef = inputRefs.current[nextCellId];

    if (nextRef) {
      nextRef.focus();
    }
  };

  /**
   * Gestion de la touche Backspace :
   * - efface la lettre si présente
   * - sinon revient à la case précédente
   */
  const handleKeyDown = (e, cellId) => {
    if (e.key !== 'Backspace') return;

    const currentValue = userInput[cellId] || '';
    if (currentValue !== '') {
      setUserInput(prev => ({
        ...prev,
        [cellId]: '',
      }));
      return;
    }

    const wordInfo = cellToWordMap.get(cellId);
    if (!wordInfo || wordInfo.index === 0) return;

    const prevCellId = `${wordInfo.wordId}-${wordInfo.index - 1}`;
    const prevRef = inputRefs.current[prevCellId];

    if (prevRef) {
      setUserInput(prev => ({
        ...prev,
        [cellId]: '',
      }));
      prevRef.focus();
    }
  };

  /**
   * Focus depuis la grille (clic clavier)
   */
  const handleFocus = (cellId) => {
    const wordInfo = cellToWordMap.get(cellId);
    if (wordInfo) {
      setActiveWordId(wordInfo.wordId);
    }
  };

  return {
    handleChange,
    handleKeyDown,
    handleFocus,
    inputRefs,
  };
};
