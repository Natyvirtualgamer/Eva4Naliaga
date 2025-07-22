import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DuenoPage from './pages/DuenoPage';
import MascotaPage from './pages/MascotaPage';
import VeterinarioPage from './pages/VeterinarioPage';
import ReservaPage from './pages/ReservaPage';
import FormularioContacto from './components/FormularioContacto';


function App() {
  return (
    <BrowserRouter>
      <div className="px-2">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Clínica Veterinaria CatDog 🐾</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/duenos">Dueños</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/mascotas">Mascotas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/veterinarios">Veterinarios</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reservas">Reservas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/duenos" element={<DuenoPage />} />
          <Route path="/mascotas" element={<MascotaPage />} />
          <Route path="/veterinarios" element={<VeterinarioPage />} />
          <Route path="/reservas" element={<ReservaPage />} />
          <Route path="/contacto" element={<FormularioContacto />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
