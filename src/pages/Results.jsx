import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (location.state && location.state.scores) {
      setScores(location.state.scores); // ✅ Si scores passés depuis Comparisons
      localStorage.setItem('scores', JSON.stringify(location.state.scores)); // 💾 Sauvegarde pour une prochaine fois
    } else {
      const storedScores = localStorage.getItem('scores');
      if (storedScores) {
        setScores(JSON.parse(storedScores)); // ✅ On récupère depuis localStorage
      } else {
        navigate('/'); //  Si rien du tout, on redirige
      }
    }
  }, [location.state, navigate]);

  const bestPhone = scores[0] ? scores[0].name : 'Aucun téléphone';

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">🏆 Classement des téléphones</h2>
      
      {/* Phrase annonçant le meilleur téléphone */}
      <p className="text-lg font-semibold mb-4 text-green-600">
        Le meilleur téléphone selon la comparaison est : <span className="font-bold">{bestPhone}</span>.
      </p>

      <table className="w-full border text-sm mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Téléphone</th>
            <th className="border px-4 py-2 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((alt, i) => (
            <tr key={i} className="hover:bg-blue-50 transition duration-300">
              <td className="border px-4 py-2 font-medium">{alt.name}</td>
              <td className="border px-4 py-2 text-center">{alt.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            localStorage.removeItem('scores'); // 🧹 Nettoie
            navigate('/');
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          🔁 Recommencer
        </button>
      </div>
    </div>
  );
}

export default Results;
