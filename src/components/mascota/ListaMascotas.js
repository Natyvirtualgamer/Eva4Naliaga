// src/components/mascota/ListaMascotas.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../services/api'; // Importamos fetchData y deleteData
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/tables.css'; // Estilos generales para tablas
import '../css/buttons.css'; // Estilos generales para botones

function ListaMascotas() {
    const [mascotas, setMascotas] = useState([]);
    const [duenosMap, setDuenosMap] = useState({}); // Mapa para almacenar dueños por ID (para mostrar el nombre)
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [mascotaToDelete, setMascotaToDelete] = useState(null); // ID de la mascota a eliminar

    // Efecto para cargar mascotas y dueños al montar el componente
    useEffect(() => {
        const loadData = async () => {
            try {
              // Cargar dueños primero para crear el mapa
                const duenosData = await fetchData('dueno');
                const map = duenosData.reduce((acc, dueno) => {
                    acc[dueno.id] = dueno.nombre_completo;
                    return acc;
                }, {});
                setDuenosMap(map);
            
                // Cargar mascotas
                const mascotasData = await fetchData('mascota');
                setMascotas(mascotasData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setModalTitle('Error');
                setModalMessage('No se pudieron cargar las mascotas o los dueños. Intente de nuevo más tarde.');
                setModalOpen(true);
            }
        };

        loadData();
    }, []);

        // Manejador para el botón de editar
        const handleEdit = (id) => {
            navigate(`/mascotas/registro/${id}`);
        };

        // Manejador para el botón de eliminar (abre el modal de confirmación)
        const handleDelete = (id) => {
            setMascotaToDelete(id);
            setModalTitle('Confirmar Eliminación');
            setModalMessage('¿Está seguro de que desea eliminar esta mascota? Esta acción es irreversible.');
            setIsConfirmModal(true);
            setModalOpen(true);
        };

        // Función que se ejecuta al confirmar la eliminación en el modal
        const confirmDelete = async () => {
            try {
                await deleteData('mascota', mascotaToDelete);
                setModalTitle('Éxito');
                setModalMessage('Mascota eliminada correctamente.');
                setModalOpen(true);
                // Recargar datos después de la eliminación
                const mascotasData = await fetchData('mascota');
                setMascotas(mascotasData);
            } catch (error) {
                console.error('Error al eliminar la mascota:', error);
                setModalTitle('Error');
                setModalMessage(`Hubo un error al eliminar la mascota: ${error.message}`);
                setModalOpen(true);
            } finally {
                setIsConfirmModal(false);
                setMascotaToDelete(null);
                setTimeout(() => setModalOpen(false), 1500);
            }
        };

        return (
            <div className="container p-8">
                <h2 className="table-title">Listado de Mascotas</h2>
                <div className="table-actions">
                    <button className="add-button" onClick={() => navigate('/mascotas/registro')}>
                        Registrar Nueva Mascota
                    </button>
                </div>

                {mascotas.length === 0 ? (
                    <p className="no-data-message">No hay mascotas registradas aún.</p>
                ) : (
                <div className="table-responsive">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Edad</th>
                            <th>Raza</th>
                            <th>Dueño</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map((mascota) => (
                            <tr key={mascota.id}>
                                <td>{mascota.id}</td>
                                <td>{mascota.nombre_mascota}</td>
                                <td>{mascota.tipo_animal}</td>
                                <td>{mascota.edad}</td>
                                <td>{mascota.raza}</td>
                                {/* Usamos el mapa de dueños para mostrar el nombre en lugar del ID */}
                                <td>{duenosMap[mascota.id_dueno] || 'Desconocido'}</td>
                                <td className="table-actions-cell">
                                    <button className="edit-button" onClick={() => handleEdit(mascota.id)}>
                                        Editar
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(mascota.id)}>
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

export default ListaMascotas;
