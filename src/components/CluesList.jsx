const generateNumberedWords = (words) => {
  const startMap = new Map();
  let count = 1;

  const sortedWords = [...words].sort((a, b) => a.row - b.row || a.col - b.col);
  return sortedWords.map(word => {
    const key = `${word.row}-${word.col}`;
    if (!startMap.has(key)) {
      startMap.set(key, count++);
    }
    return { ...word, number: startMap.get(key) };
  });
};

const CluesList = ({ words, setActiveWordId, activeWordId }) => {
  const across = words
    .filter(word => word.direction === 'across')
    .sort((a, b) => a.row - b.row || a.col - b.col);
  const down = words
    .filter(word => word.direction === 'down')
    .sort((a, b) => a.col - b.col || a.row - b.row);

  const handleClick = (word) => {
    setActiveWordId(word.id);

    // Focus automatique sur la première lettre si possible
    const cellId = `${word.id}-0`;
    const el = document.querySelector(`input[data-cellid="${cellId}"]`);
    if (el) el.focus();
  };

  return (
    <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
      <div>
        <h3>Mots horizontaux</h3>
        <ol>
          {across.map(word => (
            <li
              key={word.id}
              onClick={() => handleClick(word)}
              className={`clue-item ${word.id === activeWordId ? 'active' : ''}`}
            >
              {word.clue}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3>Mots verticaux</h3>
        <ol>
          {down.map(word => (
            <li
              key={word.id}
              onClick={() => handleClick(word)}
              className={`clue-item ${word.id === activeWordId ? 'active' : ''}`}
            >
              {word.clue}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};




export default CluesList;
