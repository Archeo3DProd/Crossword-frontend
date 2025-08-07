import React, { useEffect, useState }  from "react";
import api from '/api';
import { useNavigate } from 'react-router-dom';

const Grids = () => {
    const [grids, setGrids] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        api.get('/grids')
          .then(res => setGrids(res.data))
          .catch(err => console.error(err));
      }, []);

    return(
    <div style={{ padding: '2rem' }}>
      <h2>Grilles</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th>Titre</th>
            <th>Mots</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(grids) && grids.map(grid => (
            <tr key={grid.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{grid.id}</td>
              <td>{grid.title}</td>
              <td style={{ textAlign: 'center' }}>{grid.words_count}</td>
              <td>
                <button onClick={() => navigate(`/grids/${grid.id}`)}>✏️ Jouer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default Grids;