// src/components/FormularioContacto.js
import React, { useState } from 'react';
// Importamos los estilos CSS para el formulario de contacto
import './css/formulariocontacto.css';

// Componente funcional FormularioContacto
function FormularioContacto() {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: '',
    });

    // Manejador de cambios para los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Aquí podrías añadir la lógica para enviar el formulario (ej. a una API)
        console.log('Datos del formulario:', formData);
        alert('Mensaje enviado con éxito!'); // Usamos alert temporalmente, luego lo reemplazaremos con un modal
        setFormData({ nombre: '', correo: '', mensaje: '' }); // Limpiar formulario
    };

    return (
        <div className="contact-form-container text-center mb-4">
            <form className="formulario" onSubmit={handleSubmit}>
                <h3>Contacto</h3>
                {/* Campo de nombre */}
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  required // Campo obligatorio
                />
                {/* Campo de correo electrónico */}
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required // Campo obligatorio
                />
                {/* Campo de mensaje */}
                <textarea
                    name="mensaje"
                    placeholder="Mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required // Campo obligatorio
                />
                {/* Botón de envío */}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );  
}

// Exportamos el componente FormularioContacto
export default FormularioContacto;
