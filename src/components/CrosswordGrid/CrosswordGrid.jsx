import React, { useEffect, useState } from 'react';
import { useCrosswordLogic } from './useCrosswordLogic';
import { useNavigation } from './useNavigation';
import { verifyGrid, isGridComplete } from './validation';
import { launchConfetti } from './confetti';

const CELL_SIZE = 35;

const CrosswordGrid = ({ words, gridSize, activeWordId, setActiveWordId }) => {
  const {
    grid,
    cellToWordMap,
    userInput,
    setUserInput,
    validationMap,
    setValidationMap,
  } = useCrosswordLogic(words, gridSize);

  const {
    handleChange,
    handleKeyDown,
    handleFocus,
    inputRefs,
  } = useNavigation(grid, cellToWordMap, userInput, setUserInput, setActiveWordId);

  const [errorCount, setErrorCount] = useState(0);
  const complete = isGridComplete(validationMap);

  // 🎉 Déclenche les confettis une seule fois
  useEffect(() => {
    if (complete) {
      launchConfetti();
    }
  }, [complete]);

  // ✅ Vérifie les lettres
  const handleVerify = () => {
    const { result, errors } = verifyGrid(grid, userInput);
    setValidationMap(result);
    setErrorCount(errors);
  };

  // 🔄 Réinitialise la grille
  const handleReset = () => {
    setUserInput({});
    setValidationMap({});
    setErrorCount(0);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            {[...Array(gridSize)].map((_, c) => (
              <th
                key={`col-${c}`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: 'var(--header-bg)',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  border: '1px solid #ccc',
                  fontWeight: 'bold',
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, r) => (
            <tr key={`row-${r}`}>
              <th
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: '#f0f0f0',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  border: '1px solid #ccc',
                  fontWeight: 'bold',
                }}
              >
                {r}
              </th>
              {row.map((cell, c) => (
                <td key={`cell-${r}-${c}`} style={{ padding: 0 }}>
                  {cell ? (
                    <input
                      type="text"
                      maxLength={1}
                      ref={(el) => {
                        if (el) inputRefs.current[cell.cellId] = el;
                      }}
                      data-cellid={cell.cellId}
                      value={userInput[cell.cellId] || ''}
                      onChange={(e) => handleChange(cell.cellId, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, cell.cellId)}
                      onFocus={() => handleFocus(cell.cellId)}
                      disabled={complete}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        textAlign: 'center',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        border: '1px solid #999',
                        outline: 'none',
                        backgroundColor:
                          validationMap[cell.cellId] === true
                            ? '#d4edda' // vert clair
                            : validationMap[cell.cellId] === false
                            ? '#f8d7da' // rouge clair
                            : activeWordId === cellToWordMap.get(cell.cellId)?.wordId
                            ? '#fff3cd' // surbrillance
                            : 'white',
                        transition: 'background-color 0.2s',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: '#ccc',
                        border: '1px solid #999',
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔘 Boutons */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleVerify}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Vérifier
        </button>

        <button
          onClick={handleReset}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Réinitialiser
        </button>
      </div>

      {/* 🎉 Message de victoire */}
      {complete && (
        <div className="victory-message">
          🎉 Bravo ! Vous avez complété la grille !
          <p style={{ marginTop: '0.5rem' }}>
            ❌ Erreurs cumulées : {errorCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default CrosswordGrid;
