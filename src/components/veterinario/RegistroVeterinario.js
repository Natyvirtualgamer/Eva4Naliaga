// src/components/veterinario/RegistroVeterinario.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createData, fetchById, updateData } from '../../services/api'; // Importamos las funciones de la API
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/forms.css'; // Estilos generales para formularios
import '../css/buttons.css'; // Estilos para botones

function RegistroVeterinario() {
    const { id } = useParams(); // Obtener el ID de la URL para edición
    const navigate = useNavigate();

    const [veterinario, setVeterinario] = useState({
        nombre_completo: '',
        especialidad: '',
        telefono: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    // Efecto para cargar los datos del veterinario si estamos en modo edición
    useEffect(() => {
        if (id) {
            const loadVeterinario = async () => {
                try {
                    const data = await fetchById('veterinario', id);
                    setVeterinario(data); // Cargamos los datos en el estado del formulario
                } catch (error) {
                    console.error('Error al cargar el veterinario:', error);
                    setModalTitle('Error');
                    setModalMessage('No se pudo cargar la información del veterinario.');
                    setModalOpen(true);
                }
            };
            loadVeterinario();
        }
    }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

    // Manejador de cambios para los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVeterinario({ ...veterinario, [name]: value });
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        const { nombre_completo, especialidad, telefono } = veterinario;
        if (!nombre_completo.trim() || !especialidad.trim() || !telefono.trim()) {
            setModalTitle('Error de Validación');
            setModalMessage('Todos los campos son obligatorios.');
            setModalOpen(true);
            return false;
        }
        // Puedes añadir más validaciones específicas para teléfono o especialidad si es necesario
        return true;
    };

    // Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (id) {
                // Si hay un ID, estamos actualizando un veterinario existente
                await updateData('veterinario', id, veterinario);
                setModalTitle('Éxito');
                setModalMessage('Veterinario actualizado correctamente.');
            } else {
                // Si no hay ID, estamos creando un nuevo veterinario
                await createData('veterinario', veterinario);
                setModalTitle('Éxito');
                setModalMessage('Veterinario registrado correctamente.');
                // Limpiamos el formulario después de un registro exitoso
                setVeterinario({
                    nombre_completo: '',
                    especialidad: '',
                    telefono: '',
                });
            }
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
              navigate('/veterinarios'); // Redirigir a la lista de veterinarios
            }, 1500);
        } catch (error) {
            console.error('Error al guardar el veterinario:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al guardar el veterinario: ${error.message}`);
            setModalOpen(true);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Veterinario' : 'Registrar Nuevo Veterinario'}</h2>
            <form className="app-form" onSubmit={handleSubmit}>
                {/* Campo Nombre Completo */}
                <div className="form-group">
                    <label htmlFor="nombre_completo">Nombre Completo:</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        name="nombre_completo"
                        value={veterinario.nombre_completo}
                        onChange={handleChange}
                        placeholder="Ej: Dra. Valeria Núñez"
                        required
                    />
                </div>

                {/* Campo Especialidad */}
                <div className="form-group">
                    <label htmlFor="especialidad">Especialidad:</label>
                    <input
                        type="text"
                        id="especialidad"
                        name="especialidad"
                        value={veterinario.especialidad}
                        onChange={handleChange}
                        placeholder="Ej: Cirugía, Vacunación, Control General"
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
                        value={veterinario.telefono}
                        onChange={handleChange}
                        placeholder="Ej: 912345000"
                        required
                    />
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {id ? 'Actualizar Veterinario' : 'Registrar Veterinario'}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/veterinarios')}>
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

export default RegistroVeterinario;
