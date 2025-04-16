import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alternatives from './pages/Alternatives';
import Criteria from './pages/Criteria';
import Comparisons from './pages/Comparisons';
import Results from './pages/Results';
import BrandRatings from './pages/BrandRatings';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Suppression de la barre de navigation */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/criteria" element={<Layout><Criteria /></Layout>} />
            <Route path="/alternatives" element={<Layout><Alternatives /></Layout>} />
            <Route path="/comparisons" element={<Layout><Comparisons /></Layout>} />
            <Route path="/brand-ratings" element={<Layout><BrandRatings /></Layout>} />
            <Route path="/results" element={<Layout><Results /></Layout>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
