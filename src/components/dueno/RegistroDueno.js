// src/components/dueno/RegistroDueno.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createData, fetchById, updateData } from '../../services/api'; // Importamos las funciones de la API
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/forms.css'; // Estilos generales para formularios

function RegistroDueno() {
    // Obtenemos el parámetro 'id' de la URL si estamos en modo edición
    const { id } = useParams();
    // Hook para la navegación programática
    const navigate = useNavigate();

    // Estado para los datos del formulario del dueño
    const [dueno, setDueno] = useState({
        nombre_completo: '',
        rut: '',
        telefono: '',
        correo: '',
    });

    // Estados para el modal de mensaje/error
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    // Efecto para cargar los datos del dueño si estamos en modo edición
    useEffect(() => {
        if (id) {
            const loadDueno = async () => {
                try {
                const data = await fetchById('dueno', id);
                setDueno(data); // Cargamos los datos en el estado del formulario
                } catch (error) {
                console.error('Error al cargar el dueño:', error);
                setModalTitle('Error');
                setModalMessage('No se pudo cargar la información del dueño.');
                setModalOpen(true);
                }
            };
            loadDueno();
        }
    }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

    // Manejador de cambios para los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDueno({ ...dueno, [name]: value });
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        const { nombre_completo, rut, telefono, correo } = dueno;
        if (!nombre_completo.trim() || !rut.trim() || !telefono.trim() || !correo.trim()) {
            setModalTitle('Error de Validación');
            setModalMessage('Todos los campos son obligatorios.');
            setModalOpen(true);
            return false;
        }
        // Validación básica de formato de correo electrónico
        if (!/\S+@\S+\.\S+/.test(correo)) {
            setModalTitle('Error de Validación');
            setModalMessage('El formato del correo electrónico no es válido.');
            setModalOpen(true);
            return false;
        }
        // Validación básica de formato de RUT (ej. XX.XXX.XXX-X)
        if (!/^(\d{1,2}\.\d{3}\.\d{3}-\d{1,2})$/.test(rut)) {
            setModalTitle('Error de Validación');
            setModalMessage('El formato del RUT no es válido. Use el formato XX.XXX.XXX-X o X.XXX.XXX-X.');
            setModalOpen(true);
            return false;
        }
        return true;
    };

    // Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        if (!validateForm()) {
          return; // Si la validación falla, no continuamos
        }

        try {
            if (id) {
                // Si hay un ID, estamos actualizando un dueño existente
                await updateData('dueno', id, dueno);
                setModalTitle('Éxito');
                setModalMessage('Dueño actualizado correctamente.');
            } else {
                // Si no hay ID, estamos creando un nuevo dueño
                await createData('dueno', dueno);
                setModalTitle('Éxito');
                setModalMessage('Dueño registrado correctamente.');
                // Limpiamos el formulario después de un registro exitoso
                setDueno({
                    nombre_completo: '',
                    rut: '',
                    telefono: '',
                    correo: '',
                });
            }
            setModalOpen(true); // Abre el modal de éxito
            // Opcional: Redirigir a la lista de dueños después de un breve retraso
            setTimeout(() => {
                setModalOpen(false);
                navigate('/duenos');
            }, 1500); // Redirige después de 1.5 segundos
        } catch (error) {
            console.error('Error al guardar el dueño:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al guardar el dueño: ${error.message}`);
            setModalOpen(true);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Dueño' : 'Registrar Nuevo Dueño'}</h2>
            <form className="app-form" onSubmit={handleSubmit}>
                {/* Campo Nombre Completo */}
                <div className="form-group">
                    <label htmlFor="nombre_completo">Nombre Completo:</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        name="nombre_completo"
                        value={dueno.nombre_completo}
                        onChange={handleChange}
                        placeholder="Ej: Juan Pérez"
                        required
                    />
                </div>
        
          {/* Campo RUT */}
            <div className="form-group">
                <label htmlFor="rut">RUT:</label>
                <input
                    type="text"
                    id="rut"
                    name="rut"
                    value={dueno.rut}
                    onChange={handleChange}
                    placeholder="Ej: 12.345.678-9"
                    required
                />
            </div>

            {/* Campo Teléfono */}
            <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={dueno.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 912345678"
                    required
                />
            </div>
        
            {/* Campo Correo Electrónico */}
            <div className="form-group">
                <label htmlFor="correo">Correo Electrónico:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={dueno.correo}
                    onChange={handleChange}
                    placeholder="Ej: correo@example.com"
                    required
                />
            </div>
        
            {/* Botón de envío del formulario */}
            <div className="form-actions">
                <button type="submit" className="submit-button">
                    {id ? 'Actualizar Dueño' : 'Registrar Dueño'}
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate('/duenos')}>
                    Cancelar
                </button>
            </div>
        </form>
        
        {/* Componente Modal para mensajes */}
        <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
            message={modalMessage}
        />
        </div>
    );
}

export default RegistroDueno;
