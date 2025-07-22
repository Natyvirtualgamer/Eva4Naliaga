// src/components/Footer.js
import React from 'react';
// Importamos los estilos CSS para el pie de página
import './css/footer.css';

// Componente funcional Footer
function Footer() {
    return (
        <footer className="footer">
          {/* Texto del pie de página */}
            <p>&copy; {new Date().getFullYear()} Veterinaria CatDog. Todos los derechos reservados.</p>
            
        </footer>
    );
}

// Exportamos el componente Footer
export default Footer;
