import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BrandRatings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alternatives = [], selectedCriteria = [], scales = [] } = location.state || {};

  const uniqueBrands = [...new Set(alternatives.map((alt) => alt.brand))];
  const [brandRatings, setBrandRatings] = useState({});

  const handleChange = (brand, value) => {
    setBrandRatings({ ...brandRatings, [brand]: parseFloat(value) });
  };

  const handleSubmit = () => {
    const allFilled = uniqueBrands.every((b) => brandRatings[b] !== undefined);
    if (!allFilled) {
      alert("Merci de noter toutes les marques !");
      return;
    }

    navigate("/comparisons", {
      state: { selectedCriteria, alternatives, scales, brandRatings },
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">📝 Notez les marques</h2>
      {uniqueBrands.map((brand) => (
        <div key={brand} className="mb-4">
          <label className="form-label fw-bold">{brand}</label>
          <input
            type="number"
            min="0"
            max="20"
            value={brandRatings[brand] || ""}
            onChange={(e) => handleChange(brand, e.target.value)}
            className="form-control"
            placeholder="Note sur 20"
          />
        </div>
      ))}
      
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={handleSubmit}
          className="btn btn-success btn-lg"
        >
          ✅ Valider les notes des marques
        </button>
      </div>
    </div>
  );
}

export default BrandRatings;
