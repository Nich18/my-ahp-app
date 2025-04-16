import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header - navbar réduite */}
      <header className="bg-primary text-white shadow-sm">
        <div className="container py-2">
          <h1 className="m-0 h4 fw-bold">Mon App AHP 📱</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4 p-4 bg-white rounded shadow border flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-2 mt-auto">
        <div className="container text-center small">
          &copy; {new Date().getFullYear()} <span className="fw-bold">Mon App AHP</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
