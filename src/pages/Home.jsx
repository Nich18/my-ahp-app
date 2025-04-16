import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();  // Pour la redirection

  const handleClick = () => {
    navigate('/alternatives');  // Redirige vers la page alternatives
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 text-primary mb-4">
        Bienvenue dans l'application AHP Phone Chooser 📱
      </h1>
      <p className="lead text-secondary mb-4">
        Utilisez la méthode AHP pour trouver le téléphone qui vous convient le mieux !
      </p>
      <button 
        onClick={handleClick}  // Ajout de l'événement pour la redirection
        className="btn btn-primary btn-lg px-5 py-3"
      >
        Commencer la comparaison
      </button>
    </div>
  );
}

export default Home;
