import { useEffect, useState } from 'react';
import { fetchGrid } from './api/crossword';
import { CrosswordGrid } from './components/CrosswordGrid';
import CluesList from './components/CluesList';

function App() {
  const [gridId, setGridId] = useState(1);
  const [gridData, setGridData] = useState(null);
  const [activeWordId, setActiveWordId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const handleNextGrid = () => {
    setIsTransitioning(true); // déclenche fade-out

    setTimeout(() => {
      setGridId(prev => prev + 1); // change la grille après 500ms
      setActiveWordId(null);
      setIsTransitioning(false); // reset pour fade-in
    }, 500); // doit correspondre à la durée CSS
  };

  useEffect(() => {
    setGridData(null); // pour déclencher l'état "Chargement..."
    fetchGrid(gridId)
      .then(res => setGridData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>🧩 Mots croisés interactifs</h1>

      {gridData ? (
        <>
          <h2>{gridData.title}</h2>

          <div
            className={`grid-transition ${isTransitioning ? 'fade-out' : ''}`}
            style={{ transitionDelay: isTransitioning ? '0s' : '0.2s' }}
          >
            <CrosswordGrid
              words={gridData.words}
              gridSize={12}
              activeWordId={activeWordId}
              setActiveWordId={setActiveWordId}
            />
          </div>

          <CluesList
            words={gridData.words}
            setActiveWordId={setActiveWordId}
            activeWordId={activeWordId}
          />

          <button
            onClick={handleNextGrid}
            style={{
              marginTop: '2rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Nouvelle grille
          </button>

          <div className="clues-wrapper">
            <div className="clues-section">
              <h3>Mots horizontaux</h3>
              <ol>
                {gridData.words
                  .filter(w => w.direction === 'across')
                  .map((word, i) => (
                    <li key={word.id}>{word.clue}</li>
                  ))}
              </ol>
            </div>

            <div className="clues-section">
              <h3>Mots verticaux</h3>
              <ol>
                {gridData.words
                  .filter(w => w.direction === 'down')
                  .map((word, i) => (
                    <li key={word.id}>{word.clue}</li>
                  ))}
              </ol>
            </div>
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default App;
