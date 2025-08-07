import { useEffect, useState } from 'react';
import api from '/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [grids, setGrids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/grids')
      .then(res => setGrids(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠️ Interface d’administration</h2>

      <button
        onClick={() => navigate('/admin/new')}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        ➕ Nouvelle grille
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th>Titre</th>
            <th>Mots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(grids) && grids.map(grid => (
            <tr key={grid.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{grid.id}</td>
              <td>{grid.title}</td>
              <td style={{ textAlign: 'center' }}>{grid.words_count}</td>
              <td>
                <button onClick={() => navigate(`/admin/edit/${grid.id}`)}>✏️ Modifier</button>
                {' '}
                <button onClick={() => handleDelete(grid.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id) {
    if (!window.confirm('Supprimer cette grille ?')) return;

    axios.delete(`/api/admin/grids/${id}`)
      .then(() => setGrids(prev => prev.filter(g => g.id !== id)))
      .catch(err => console.error(err));
  }
};

export default AdminDashboard;
