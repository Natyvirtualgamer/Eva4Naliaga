// src/components/reserva/ListaReservas.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../services/api';
import Modal from '../Modal';
import '../css/tables.css';
import '../css/buttons.css';

function ListaReservas() {
    const [reservas, setReservas] = useState([]);
    const [mascotasMap, setMascotasMap] = useState({}); // Mapa para {id_mascota: nombre_mascota}
    const [veterinariosMap, setVeterinariosMap] = useState({}); // Mapa para {id_veterinario: nombre_veterinario}
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [reservaToDelete, setReservaToDelete] = useState(null); // ID de la reserva a eliminar

    // Efecto para cargar todas las dependencias y las reservas
    useEffect(() => {
        const loadAllData = async () => {
            try {
                // Cargar mascotas y crear mapa
                const mascotasData = await fetchData('mascota');
                const mMap = mascotasData.reduce((acc, mascota) => {
                    acc[mascota.id] = mascota.nombre_mascota;
                    return acc;
                }, {});
                setMascotasMap(mMap);
        
                // Cargar veterinarios y crear mapa
                const veterinariosData = await fetchData('veterinario');
                const vMap = veterinariosData.reduce((acc, veterinario) => {
                    acc[veterinario.id] = veterinario.nombre_completo;
                    return acc;
                }, {});
                setVeterinariosMap(vMap);
            
                // Cargar reservas
                const reservasData = await fetchData('reserva_procedimiento');
                setReservas(reservasData);
            } catch (error) {
                console.error('Error al cargar datos de reservas:', error);
                setModalTitle('Error');
                setModalMessage('No se pudieron cargar las reservas o sus dependencias. Intente de nuevo más tarde.');
                setModalOpen(true);
            }
        };

        loadAllData();
    }, []);

    // Manejador para el botón de editar
    const handleEdit = (id) => {
        navigate(`/reservas/registro/${id}`);
    };

    // Manejador para el botón de eliminar (abre el modal de confirmación)
    const handleDelete = (id) => {
        setReservaToDelete(id);
        setModalTitle('Confirmar Eliminación');
        setModalMessage('¿Está seguro de que desea eliminar esta reserva? Esta acción es irreversible.');
        setIsConfirmModal(true);
        setModalOpen(true);
    };

    // Función que se ejecuta al confirmar la eliminación en el modal
    const confirmDelete = async () => {
        try {
            await deleteData('reserva_procedimiento', reservaToDelete);
            setModalTitle('Éxito');
            setModalMessage('Reserva eliminada correctamente.');
            setModalOpen(true);
            // Recargar datos después de la eliminación
            const updatedReservas = await fetchData('reserva_procedimiento');
            setReservas(updatedReservas);
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al eliminar la reserva: ${error.message}`);
            setModalOpen(true);
        } finally {
            setIsConfirmModal(false);
            setReservaToDelete(null);
            setTimeout(() => setModalOpen(false), 1500);
        }
    };

    return (
        <div className="container p-8">
            <h2 className="table-title">Listado de Reservas de Procedimientos</h2>
            <div className="table-actions">
                <button className="add-button" onClick={() => navigate('/reservas/registro')}>
                    Registrar Nueva Reserva
                </button>
            </div>

            {reservas.length === 0 ? (
                <p className="no-data-message">No hay reservas registradas aún.</p>
            ) : (
            <div className="table-responsive">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mascota</th>
                            <th>Veterinario</th>
                            <th>Tipo de Procedimiento</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                {/* Usamos los mapas para mostrar nombres en lugar de IDs */}
                                <td>{mascotasMap[reserva.id_mascota] || 'Desconocida'}</td>
                                <td>{veterinariosMap[reserva.id_veterinario] || 'Desconocido'}</td>
                                <td>{reserva.tipo_procedimiento}</td>
                                <td>{new Date(reserva.fecha).toLocaleDateString()}</td> {/* Formatear fecha */}
                                <td>{reserva.hora ? reserva.hora.substring(0, 5) : ''}</td> {/* Mostrar solo HH:MM */}
                                <td className="table-actions-cell">
                                    <button className="edit-button" onClick={() => handleEdit(reserva.id)}>
                                        Editar
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(reserva.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )}

            {/* Componente Modal para mensajes y confirmaciones */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
                isConfirm={isConfirmModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default ListaReservas;
