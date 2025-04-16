import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Alternatives() {
  const navigate = useNavigate();
  const [alternatives, setAlternatives] = useState([
    { name: "", memory: "", storage: "", cpu: "", price: "", brand: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newAlt = [...alternatives];
    newAlt[index][field] = value;
    setAlternatives(newAlt);
  };

  const addAlternative = () => {
    setAlternatives([
      ...alternatives,
      { name: "", memory: "", storage: "", cpu: "", price: "", brand: "" },
    ]);
  };

  const handleSubmit = () => {
    const valid = alternatives.filter(
      (alt) => alt.name && alt.memory && alt.storage && alt.cpu && alt.price && alt.brand
    );
    if (valid.length >= 2) {
      navigate("/criteria", { state: { alternatives: valid } });
    } else {
      alert("Ajoutez au moins deux téléphones avec toutes les caractéristiques.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="display-4 text-primary mb-4 text-center">
        📱 Entrez les téléphones à comparer :
      </h2>

      {alternatives.map((alt, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm bg-white">
          <div className="mb-3">
            <input
              placeholder="Nom du téléphone"
              className="form-control"
              value={alt.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Mémoire (en Go)"
              className="form-control"
              value={alt.memory}
              onChange={(e) => handleChange(index, "memory", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Stockage (en Go)"
              className="form-control"
              value={alt.storage}
              onChange={(e) => handleChange(index, "storage", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="CPU (GHz)"
              className="form-control"
              value={alt.cpu}
              onChange={(e) => handleChange(index, "cpu", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Prix (FCFA)"
              className="form-control"
              value={alt.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Marque (ex: Samsung, Apple)"
              className="form-control"
              value={alt.brand}
              onChange={(e) => handleChange(index, "brand", e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={addAlternative}
          className="btn btn-primary btn-lg"
        >
          + Ajouter un téléphone
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-success btn-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default Alternatives;
