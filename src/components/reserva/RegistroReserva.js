// src/components/reserva/RegistroReserva.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createData, fetchById, updateData, fetchData } from '../../services/api';
import Modal from '../Modal';
import '../css/forms.css';
import '../css/buttons.css';

function RegistroReserva() {
    const { id } = useParams(); // Obtener el ID de la URL para edición
    const navigate = useNavigate();

    const [reserva, setReserva] = useState({
        id_mascota: '',
        id_veterinario: '',
        tipo_procedimiento: '',
        fecha: '', // Formato YYYY-MM-DD
        hora: '',  // Formato HH:MM
    });

    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    // Efecto para cargar mascotas, veterinarios y, si es edición, los datos de la reserva
    useEffect(() => {
        const loadDependencies = async () => {
            try {
                // Cargar mascotas
                const mascotasData = await fetchData('mascota');
                setMascotas(mascotasData);
                
                // Cargar veterinarios
                const veterinariosData = await fetchData('veterinario');
                setVeterinarios(veterinariosData);
                
                // Si hay un ID, cargar los datos de la reserva para edición
                if (id) {
                    const reservaData = await fetchById('reserva_procedimiento', id);
                    // Formatear fecha y hora para los campos input
                    const formattedDate = reservaData.fecha ? new Date(reservaData.fecha).toISOString().split('T')[0] : '';
                    const formattedTime = reservaData.hora ? reservaData.hora.substring(0, 5) : ''; // HH:MM
                    setReserva({
                        ...reservaData,
                        fecha: formattedDate,
                        hora: formattedTime,
                    });
            }
            } catch (error) {
                console.error('Error al cargar dependencias o reserva:', error);
                setModalTitle('Error');
                setModalMessage('No se pudieron cargar los datos necesarios para el formulario de reserva.');
                setModalOpen(true);
            }
        };

    loadDependencies();
  }, [id]); // Dependencia del ID para recargar en edición

    // Manejador de cambios para los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva({
            ...reserva,
            [name]: (name === 'id_mascota' || name === 'id_veterinario') ? Number(value) : value,
        });
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        const { id_mascota, id_veterinario, tipo_procedimiento, fecha, hora } = reserva;
        if (!id_mascota || !id_veterinario || !tipo_procedimiento.trim() || !fecha || !hora) {
            setModalTitle('Error de Validación');
            setModalMessage('Todos los campos son obligatorios.');
            setModalOpen(true);
            return false;
        }
        // Puedes añadir validaciones de formato de fecha/hora si la API es estricta
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
                 // Actualizar reserva existente
                await updateData('reserva_procedimiento', id, reserva);
                setModalTitle('Éxito');
                setModalMessage('Reserva actualizada correctamente.');
            } else {
                // Crear nueva reserva
                await createData('reserva_procedimiento', reserva);
                setModalTitle('Éxito');
                setModalMessage('Reserva registrada correctamente.');
                // Limpiar formulario
                setReserva({
                    id_mascota: '',
                    id_veterinario: '',
                    tipo_procedimiento: '',
                    fecha: '',
                    hora: '',
                });
            }
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                navigate('/reservas'); // Redirigir a la lista de reservas
            }, 1500);
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al guardar la reserva: ${error.message}`);
            setModalOpen(true);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{id ? 'Editar Reserva' : 'Registrar Nueva Reserva'}</h2>
            <form className="app-form" onSubmit={handleSubmit}>
                {/* Selector de Mascota */}
                <div className="form-group">
                    <label htmlFor="id_mascota">Mascota:</label>
                    <select
                        id="id_mascota"
                        name="id_mascota"
                        value={reserva.id_mascota}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una mascota</option>
                        {mascotas.map((mascota) => (
                            <option key={mascota.id} value={mascota.id}>
                                {mascota.nombre_mascota} (Dueño: {mascota.id_dueno})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selector de Veterinario */}
                <div className="form-group">
                    <label htmlFor="id_veterinario">Veterinario:</label>
                    <select
                        id="id_veterinario"
                        name="id_veterinario"
                        value={reserva.id_veterinario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un veterinario</option>
                        {veterinarios.map((veterinario) => (
                            <option key={veterinario.id} value={veterinario.id}>
                                {veterinario.nombre_completo} ({veterinario.especialidad})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo Tipo de Procedimiento */}
                <div className="form-group">
                    <label htmlFor="tipo_procedimiento">Tipo de Procedimiento:</label>
                    <input
                        type="text"
                        id="tipo_procedimiento"
                        name="tipo_procedimiento"
                        value={reserva.tipo_procedimiento}
                        onChange={handleChange}
                        placeholder="Ej: Vacuna anual, Cirugía dental"
                        required
                    />
                </div>

                {/* Campo Fecha */}
                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={reserva.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campo Hora */}
                <div className="form-group">
                    <label htmlFor="hora">Hora:</label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        value={reserva.hora}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {id ? 'Actualizar Reserva' : 'Registrar Reserva'}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/reservas')}>
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

export default RegistroReserva;
