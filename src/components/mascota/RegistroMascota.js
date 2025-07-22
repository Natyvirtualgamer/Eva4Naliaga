// src/components/mascota/RegistroMascota.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createData, fetchById, updateData, fetchData } from '../../services/api'; // Importamos fetchData para los dueños
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/forms.css'; // Estilos generales para formularios
import '../css/buttons.css'; // Estilos para botones

function RegistroMascota() {
    const { id } = useParams(); // Obtener el ID de la URL para edición
    const navigate = useNavigate();

    const [mascota, setMascota] = useState({
        nombre_mascota: '',
        tipo_animal: '',
        edad: '',
        raza: '',
        id_dueno: '', // Para almacenar el ID del dueño seleccionado
    });

    const [duenos, setDuenos] = useState([]); // Estado para almacenar la lista de dueños
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    // Efecto para cargar dueños y, si es edición, los datos de la mascota
    useEffect(() => {
      // Función para cargar la lista de dueños
        const loadDuenos = async () => {
            try {
              const data = await fetchData('dueno'); // Obtener todos los dueños
                setDuenos(data);
            } catch (error) {
                console.error('Error al cargar dueños:', error);
                setModalTitle('Error');
                setModalMessage('No se pudieron cargar los dueños para el selector.');
                setModalOpen(true);
            }
        };

      loadDuenos(); // Cargar dueños al montar el componente

         // Si hay un ID, cargar los datos de la mascota para edición
        if (id) {
        const loadMascota = async () => {
            try {
                const data = await fetchById('mascota', id);
                setMascota(data); // Cargar datos de la mascota
            } catch (error) {
                console.error('Error al cargar la mascota:', error);
                setModalTitle('Error');
                setModalMessage('No se pudo cargar la información de la mascota.');
                setModalOpen(true);
            }
        };
        loadMascota();
        }
    }, [id]); // Dependencia del ID para recargar en edición

    // Manejador de cambios para los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convertir edad y id_dueno a número si son campos numéricos
        setMascota({
            ...mascota,
            [name]: (name === 'edad' || name === 'id_dueno') ? Number(value) : value,
        });
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        const { nombre_mascota, tipo_animal, edad, raza, id_dueno } = mascota;
        if (!nombre_mascota.trim() || !tipo_animal.trim() || !edad || !raza.trim() || !id_dueno) {
            setModalTitle('Error de Validación');
            setModalMessage('Todos los campos son obligatorios.');
            setModalOpen(true);
            return false;
        }
        if (isNaN(edad) || edad <= 0) {
            setModalTitle('Error de Validación');
            setModalMessage('La edad debe ser un número positivo.');
            setModalOpen(true);
            return false;
        }
        if (isNaN(id_dueno) || id_dueno <= 0) {
            setModalTitle('Error de Validación');
            setModalMessage('Debe seleccionar un dueño válido.');
            setModalOpen(true);
            return false;
        }
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
                    // Actualizar mascota existente
                    await updateData('mascota', id, mascota);
                    setModalTitle('Éxito');
                    setModalMessage('Mascota actualizada correctamente.');
                } else {
                    // Crear nueva mascota
                    await createData('mascota', mascota);
                    setModalTitle('Éxito');
                    setModalMessage('Mascota registrada correctamente.');
                    // Limpiar formulario
                    setMascota({
                        nombre_mascota: '',
                        tipo_animal: '',
                        edad: '',
                        raza: '',
                        id_dueno: '',
                    });
                }
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    navigate('/mascotas'); // Redirigir a la lista de mascotas
                }, 1500);
            } catch (error) {
            console.error('Error al guardar la mascota:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al guardar la mascota: ${error.message}`);
            setModalOpen(true);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Mascota' : 'Registrar Nueva Mascota'}</h2>
            <form className="app-form" onSubmit={handleSubmit}>
                {/* Campo Nombre de la Mascota */}
                <div className="form-group">
                    <label htmlFor="nombre_mascota">Nombre de la Mascota:</label>
                    <input
                        type="text"
                        id="nombre_mascota"
                        name="nombre_mascota"
                        value={mascota.nombre_mascota}
                        onChange={handleChange}
                        placeholder="Ej: Firulais"
                        required
                    />
                </div>

                {/* Campo Tipo de Animal */}
                <div className="form-group">
                    <label htmlFor="tipo_animal">Tipo de Animal:</label>
                    <select
                        id="tipo_animal"
                        name="tipo_animal"
                        value={mascota.tipo_animal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Campo Edad */}
                <div className="form-group">
                    <label htmlFor="edad">Edad (años):</label>
                    <input
                        type="number"
                        id="edad"
                        name="edad"
                        value={mascota.edad}
                        onChange={handleChange}
                        placeholder="Ej: 3"
                        min="0"
                        required
                    />
                </div>

                {/* Campo Raza */}
                <div className="form-group">
                    <label htmlFor="raza">Raza:</label>
                    <input
                        type="text"
                        id="raza"
                        name="raza"
                        value={mascota.raza}
                        onChange={handleChange}
                        placeholder="Ej: Labrador"
                        required
                    />
                </div>

                {/* Selector de Dueño */}
                <div className="form-group">
                    <label htmlFor="id_dueno">Dueño:</label>
                    <select
                        id="id_dueno"
                        name="id_dueno"
                        value={mascota.id_dueno}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un dueño</option>
                        {duenos.map((dueno) => (
                            <option key={dueno.id} value={dueno.id}>
                                {dueno.nombre_completo} (RUT: {dueno.rut})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {id ? 'Actualizar Mascota' : 'Registrar Mascota'}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/mascotas')}>
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

export default RegistroMascota;
