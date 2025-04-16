import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Criteria() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alternatives } = location.state || {}; // on récupère les alternatives transmises

  const [criteria, setCriteria] = useState([
    { name: "Mémoire", selected: true, scale: null },
    { name: "Stockage", selected: true, scale: null },
    { name: "CPU", selected: true, scale: null },
    { name: "Prix", selected: true, scale: null },
    { name: "Marque", selected: true, scale: null },
  ]);

  const handleNameChange = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index].name = value;
    setCriteria(newCriteria);
  };

  const handleCheckboxChange = (index) => {
    const newCriteria = [...criteria];
    newCriteria[index].selected = !newCriteria[index].selected;
    setCriteria(newCriteria);
  };

  const handleScaleChange = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index].scale = value;
    setCriteria(newCriteria);
  };

  const handleSubmit = () => {
    const selected = criteria.filter((c) => c.selected && c.name.trim() !== "");
    if (selected.length === 0) {
      alert("Veuillez sélectionner au moins un critère !");
      return;
    }

    const selectedNames = selected.map((c) => c.name);
    const includesBrand = selectedNames.includes("Marque");

    if (includesBrand) {
      navigate("/brand-ratings", {
        state: { selectedCriteria: selectedNames, alternatives, scales: selected },
      });
    } else {
      navigate("/comparisons", {
        state: { selectedCriteria: selectedNames, alternatives, scales: selected },
      });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">✅ Définissez vos critères de sélection :</h2>
      {criteria.map((c, index) => (
        <div key={index} className="mb-3 d-flex align-items-center">
          <input
            type="text"
            value={c.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="form-control me-2"
            placeholder={`Critère ${index + 1}`}
          />
          <input
            type="checkbox"
            checked={c.selected}
            onChange={() => handleCheckboxChange(index)}
            className="form-check-input"
          />
        </div>
      ))}
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={handleSubmit}
          className="btn btn-success btn-lg"
        >
          ✅ Valider les critères sélectionnés
        </button>
      </div>
    </div>
  );
}

export default Criteria;
