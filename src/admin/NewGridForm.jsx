import { useState } from 'react';
import api from '/api';
import { useNavigate } from 'react-router-dom';

const NewGridForm = () => {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState(12);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post('/admin/grids', {
        title,
        size: parseInt(size),
      });

      // Rediriger vers l'éditeur de cette grille
      navigate(`/admin/edit/${res.data.id}`);
    } catch (err) {
      setError('Erreur lors de la création de la grille');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>➕ Nouvelle grille</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label>Taille de la grille :</label>
        <input
          type="number"
          min="5"
          max="25"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Créer la grille
        </button>
      </form>
    </div>
  );
};

export default NewGridForm;
