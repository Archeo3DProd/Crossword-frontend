import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '/api';

const EditGrid = () => {
  const { id } = useParams();
  const [grid, setGrid] = useState(null);
  const [newWord, setNewWord] = useState({
    word: '',
    clue: '',
    row: 0,
    col: 0,
    direction: 'across',
  });

  useEffect(() => {
    api.get(`/admin/grids/${id}`)
      .then(res => {
        console.log(res);
        setGrid(res.data);
    })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddWord = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/admin/grids/${id}/words`, newWord);
      setGrid(prev => ({
        ...prev,
        words: [...prev.words, res.data]
      }));
      setNewWord({ word: '', clue: '', row: 0, col: 0, direction: 'across' });
    } catch (err) {
      console.error('Erreur ajout mot', err);
    }
  };

  if (!grid) return <p>Chargement de la grille...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✏️ Édition : {grid.title} (ID: {grid.id})</h2>
      <p>Taille : {grid.size} × {grid.size}</p>

      <h3>Ajouter un mot</h3>
      <form onSubmit={handleAddWord} style={{ maxWidth: '500px' }}>
        <input
          type="text"
          placeholder="Mot"
          value={newWord.word}
          onChange={(e) => setNewWord({ ...newWord, word: e.target.value.toUpperCase() })}
          required
        />
        <input
          type="text"
          placeholder="Indice"
          value={newWord.clue}
          onChange={(e) => setNewWord({ ...newWord, clue: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Ligne"
          value={newWord.row}
          onChange={(e) => setNewWord({ ...newWord, row: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Colonne"
          value={newWord.col}
          onChange={(e) => setNewWord({ ...newWord, col: parseInt(e.target.value) })}
          required
        />
        <select
          value={newWord.direction}
          onChange={(e) => setNewWord({ ...newWord, direction: e.target.value })}
        >
          <option value="across">Horizontal</option>
          <option value="down">Vertical</option>
        </select>

        <button type="submit" style={{ marginLeft: '1rem' }}>➕ Ajouter</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>Mots existants</h3>
      <ul>
        {grid.words.map(word => (
          <li key={word.id}>
            <strong>{word.word}</strong> ({word.direction}) [{word.row}, {word.col}] — {word.clue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditGrid;
