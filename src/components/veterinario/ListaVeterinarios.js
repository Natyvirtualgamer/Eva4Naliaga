// src/components/veterinario/ListaVeterinarios.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../services/api'; // Importamos fetchData y deleteData
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/tables.css'; // Estilos generales para tablas
import '../css/buttons.css'; // Estilos generales para botones

function ListaVeterinarios() {
    const [veterinarios, setVeterinarios] = useState([]);
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [veterinarioToDelete, setVeterinarioToDelete] = useState(null); // ID del veterinario a eliminar

    // Efecto para cargar veterinarios cuando el componente se monta
    useEffect(() => {
        loadVeterinarios();
    }, []);

    // Función para cargar los veterinarios desde la API
    const loadVeterinarios = async () => {
        try {
            const data = await fetchData('veterinario'); // Llama a la API para obtener veterinarios
            setVeterinarios(data); // Actualiza el estado con los veterinarios obtenidos
        } catch (error) {
            console.error('Error al cargar los veterinarios:', error);
            setModalTitle('Error');
            setModalMessage('No se pudieron cargar los veterinarios. Intente de nuevo más tarde.');
            setModalOpen(true);
        }
    };

    // Manejador para el botón de editar
    const handleEdit = (id) => {
        navigate(`/veterinarios/registro/${id}`);
    };

    // Manejador para el botón de eliminar (abre el modal de confirmación)
    const handleDelete = (id) => {
        setVeterinarioToDelete(id);
        setModalTitle('Confirmar Eliminación');
        setModalMessage('¿Está seguro de que desea eliminar este veterinario? Esta acción es irreversible.');
        setIsConfirmModal(true);
        setModalOpen(true);
    };

    // Función que se ejecuta al confirmar la eliminación en el modal
    const confirmDelete = async () => {
        try {
            await deleteData('veterinario', veterinarioToDelete);
            setModalTitle('Éxito');
            setModalMessage('Veterinario eliminado correctamente.');
            setModalOpen(true);
            // Recargar datos después de la eliminación
            loadVeterinarios();
        } catch (error) {
            console.error('Error al eliminar el veterinario:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al eliminar el veterinario: ${error.message}`);
            setModalOpen(true);
        } finally {
            setIsConfirmModal(false);
            setVeterinarioToDelete(null);
            setTimeout(() => setModalOpen(false), 1500);
        }
    };

    return (
        <div className="container p-8">
            <h2 className="table-title">Listado de Veterinarios</h2>
            <div className="table-actions">
            <button className="add-button" onClick={() => navigate('/veterinarios/registro')}>
                Registrar Nuevo Veterinario
            </button>
        </div>

        {veterinarios.length === 0 ? (
            <p className="no-data-message">No hay veterinarios registrados aún.</p>
        ) : (
            <div className="table-responsive">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Especialidad</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veterinarios.map((veterinario) => (
                            <tr key={veterinario.id}>
                                <td>{veterinario.id}</td>
                                <td>{veterinario.nombre_completo}</td>
                                <td>{veterinario.especialidad}</td>
                                <td>{veterinario.telefono}</td>
                                <td className="table-actions-cell">
                                    <button className="edit-button" onClick={() => handleEdit(veterinario.id)}>
                                        Editar
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(veterinario.id)}>
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

export default ListaVeterinarios;
