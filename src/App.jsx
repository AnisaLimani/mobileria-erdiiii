import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kuzhina from './pages/Kuzhina';
import Tavolina from './pages/Tavolina';
import Komoda from './pages/Komoda';
import Divane from './pages/Divane';
import Projektet from './pages/Projektet';
import Kontakt from './pages/Kontakt';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>  {/* ← INLINE STYLE */}
        <Navbar />
        <main style={{ flex: 1 }}>  {/* ← INLINE STYLE */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kuzhina" element={<Kuzhina />} />
            <Route path="/tavolina" element={<Tavolina />} />
            <Route path="/komoda" element={<Komoda />} />
            <Route path="/divane" element={<Divane />} />
            <Route path="/projektet" element={<Projektet />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;