// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="navbar" >
      <div className="brand">
        <span className="brand-name">Veterinaria CatDog</span>
        <div
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span/><span/><span/>
        </div>
      </div>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/duenos">Dueños</Link></li>
        <li><Link to="/mascotas">Mascotas</Link></li>
        <li><Link to="/veterinarios">Veterinarios</Link></li>
        <li><Link to="/reservas">Reservas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
