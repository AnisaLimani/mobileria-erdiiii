import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';

import Kuzhina from './pages/Kuzhina';
import Tavolina from './pages/Tavolina';
import Komoda from './pages/Komoda';
import Divane from './pages/Divane';

import CategoryPage from './pages/CategoryPage';

import Projektet from './pages/Projektet';
import Kontakt from './pages/Kontakt';
import Admin from './pages/Admin';


// =========================================
// APP CONTENT
// =========================================

function AppContent() {

  const location = useLocation();

  const showTopSpacer =
    location.pathname !== '/';

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* NAVBAR SPACER */}

        {showTopSpacer && (
          <div className="h-20" />
        )}


        {/* =====================================
            ROUTES
        ===================================== */}

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* =====================================
              OLD CATEGORIES
              MOS I PREKIM
          ===================================== */}

          <Route
            path="/kuzhina"
            element={<Kuzhina />}
          />

          <Route
            path="/tavolina"
            element={<Tavolina />}
          />

          <Route
            path="/komoda"
            element={<Komoda />}
          />

          <Route
            path="/divane"
            element={<Divane />}
          />


          {/* =====================================
              NEW DYNAMIC CATEGORIES
          ===================================== */}

          <Route
            path="/kategori/:id"
            element={<CategoryPage />}
          />


          {/* =====================================
              PROJECTS
          ===================================== */}

          <Route
            path="/projektet"
            element={<Projektet />}
          />


          {/* =====================================
              CONTACT
          ===================================== */}

          <Route
            path="/kontakt"
            element={<Kontakt />}
          />


          {/* =====================================
              ADMIN
          ===================================== */}

          <Route
            path="/admin"
            element={<Admin />}
          />

        </Routes>

      </main>

      <Footer />
    </>
  );
}


// =========================================
// APP
// =========================================

function App() {

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;