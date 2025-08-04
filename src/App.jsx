import { useEffect, useState } from 'react';
import { fetchGrid } from './api/crossword';
import { CrosswordGrid } from './components/CrosswordGrid';
import CluesList from './components/CluesList';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [gridId, setGridId] = useState(1);
  const [gridData, setGridData] = useState(null);
  const [activeWordId, setActiveWordId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setGridData(null); // clear current view while loading new one
    fetchGrid(gridId).then(res => setGridData(res.data));
  }, [gridId]);

  const handleNextGrid = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      /*setGridId(prev => prev + 1);*/
      setGridId(prev => prev);
      setActiveWordId(null);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="container">
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: darkMode ? '#444' : '#ddd',
          color: darkMode ? '#eee' : '#222',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
      </button>

      <h1>🧩 Mots croisés interactifs</h1>

      {gridData ? (
        <>
          <h2>{gridData.title}</h2>

          <div className={`grid-transition ${isTransitioning ? 'fade-out' : ''}`}>
            <CrosswordGrid
              words={gridData.words}
              gridSize={12}
              activeWordId={activeWordId}
              setActiveWordId={setActiveWordId}
            />
          </div>

          <CluesList
            words={gridData.words}
            activeWordId={activeWordId}
            setActiveWordId={setActiveWordId}
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
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default App;
