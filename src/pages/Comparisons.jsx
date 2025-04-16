import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FULL_MATRIX = {
  M: { M: 1, S: 3, P: 5, B: 4, C: 2 },
  S: { M: 1 / 3, S: 1, P: 3, B: 2, C: 0.5 },
  P: { M: 1 / 5, S: 1 / 3, P: 1, B: 0.5, C: 0.25 },
  B: { M: 1 / 4, S: 0.5, P: 2, B: 1, C: 1 / 3 },
  C: { M: 0.5, S: 2, P: 4, B: 3, C: 1 },
};

const CODE_MAP = {
  Mémoire: 'M',
  Stockage: 'S',
  Prix: 'P',
  Marque: 'B',
  CPU: 'C',
};

const LABEL_MAP = {
  M: "Mémoire",
  S: "Stockage",
  P: "Prix",
  B: "Marque",
  C: "CPU",
};

function Comparisons() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCriteria = [], alternatives = [], scales = [] } = location.state || {};

  const criteriaCodes = selectedCriteria
    .map((name) => CODE_MAP[name])
    .filter((code) => code);

  const filteredMatrix = criteriaCodes.map((rowKey) =>
    criteriaCodes.map((colKey) => FULL_MATRIX[rowKey][colKey])
  );

  const [weights, setWeights] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (filteredMatrix.length === 0) return;

    const n = filteredMatrix.length;
    const colSums = Array(n).fill(0);
    const normalized = Array.from({ length: n }, () => Array(n).fill(0));

    for (let col = 0; col < n; col++) {
      for (let row = 0; row < n; row++) {
        colSums[col] += filteredMatrix[row][col];
      }
    }

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        normalized[row][col] = filteredMatrix[row][col] / colSums[col];
      }
    }

    const newWeights = normalized.map((row) =>
      row.reduce((sum, val) => sum + val, 0) / n
    );
    setWeights(newWeights);

    const result = alternatives.map((alt) => {
      let score = 0;
      criteriaCodes.forEach((code, idx) => {
        const value = parseFloat(altValue(code, alt));
        let adjusted = code === 'P' ? 1 / value : value;

        if (code === 'B' && scales[idx] && scales[idx].scale) {
          adjusted = scales[idx].scale;
        }

        score += adjusted * newWeights[idx];
      });
      return { ...alt, score: score.toFixed(2) };
    });

    result.sort((a, b) => b.score - a.score);
    setScores(result);
  }, [filteredMatrix, criteriaCodes, alternatives, scales]);

  const altValue = (code, alt) => {
    switch (code) {
      case 'M': return alt.memory;
      case 'S': return alt.storage;
      case 'P': return alt.price;
      case 'B': return alt.brand.length;
      case 'C': return alt.cpu;
      default: return 0;
    }
  };

  return (
    <div className="container my-5 p-4 bg-white rounded shadow-lg">
      <h2 className="h3 text-center text-primary mb-4">
        ⚖️ Résultat de la comparaison multicritères
      </h2>

      {weights.length > 0 && (
        <>
          <h3 className="h5 text-primary mb-3">Matrice des critères </h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-sm mb-4 animate__animated animate__fadeIn">
              <thead className="table-light">
                <tr>
                  <th>Critère</th>
                  {criteriaCodes.map((code) => (
                    <th key={code} className="text-center">{LABEL_MAP[code]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="font-weight-bold">{LABEL_MAP[criteriaCodes[i]]}</td>
                    {row.map((val, j) => (
                      <td key={j} className="text-center">{val.toFixed(2)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-warning font-weight-bold">
                  <td>Poids</td>
                  {weights.map((w, i) => (
                    <td key={i} className="text-center">{w.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={() => {
            const result = alternatives.map((alt) => {
              let score = 0;
              criteriaCodes.forEach((code, idx) => {
                const value = parseFloat(altValue(code, alt));
                let adjusted = code === 'P' ? 1 / value : value;

                if (code === 'B' && scales[idx] && scales[idx].scale) {
                  adjusted = scales[idx].scale;
                }

                score += adjusted * weights[idx];
              });
              return { ...alt, score: score.toFixed(2) };
            }).sort((a, b) => b.score - a.score);

            localStorage.setItem('scores', JSON.stringify(result)); // 💾
            navigate('/results', { state: { scores: result } }); // ✅ Redirige avec les bons scores
          }}
          className="btn btn-primary btn-lg"
        >
          Voir les résultats
        </button>

        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary btn-lg"
        >
          🔁 Recommencer
        </button>
      </div>
    </div>
  );
}

export default Comparisons;
