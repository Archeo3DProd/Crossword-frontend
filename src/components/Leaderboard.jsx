import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({ gridId }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get(`/api/grids/${gridId}/scores`)
      .then(res => setScores(res.data))
      .catch(err => console.error(err));
  }, [gridId]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🏆 Leaderboard</h3>
      <table>
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Temps</th>
            <th>Erreurs</th>
            <th>Vérifs</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, i) => (
            <tr key={i}>
              <td>{s.player_name}</td>
              <td>{s.time_seconds}s</td>
              <td>{s.errors}</td>
              <td>{s.checks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
