// src/components/dueno/ListaDuenos.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, deleteData } from '../../services/api'; // Importamos las funciones de la API
import Modal from '../Modal'; // Importamos el componente Modal
import '../css/tables.css'; // Estilos generales para tablas
import '../css/buttons.css'; // Estilos generales para botones

function ListaDuenos() {
    // Estado para almacenar la lista de dueños
    const [duenos, setDuenos] = useState([]);
    // Hook para la navegación programática
    const navigate = useNavigate();

    // Estados para el modal de mensaje/confirmación
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [duenoToDelete, setDuenoToDelete] = useState(null); // ID del dueño a eliminar

    // Efecto para cargar los dueños cuando el componente se monta
    useEffect(() => {
        loadDuenos();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar

    // Función para cargar los dueños desde la API
    const loadDuenos = async () => {
        try {
          const data = await fetchData('dueno'); // Llama a la API para obtener dueños
          setDuenos(data); // Actualiza el estado con los dueños obtenidos
        } catch (error) {
            console.error('Error al cargar los dueños:', error);
            setModalTitle('Error');
            setModalMessage('No se pudieron cargar los dueños. Intente de nuevo más tarde.');
            setModalOpen(true);
        }
    };

    // Manejador para el botón de editar
    const handleEdit = (id) => {
      // Navega a la ruta de edición del dueño, pasando el ID como parámetro
        navigate(`/duenos/registro/${id}`);
    };

    // Manejador para el botón de eliminar (abre el modal de confirmación)
    const handleDelete = (id) => {
        setDuenoToDelete(id); // Guarda el ID del dueño a eliminar
        setModalTitle('Confirmar Eliminación');
        setModalMessage('¿Está seguro de que desea eliminar este dueño? Esta acción es irreversible.');
        setIsConfirmModal(true); // Indica que es un modal de confirmación
        setModalOpen(true); // Abre el modal
    };

    // Función que se ejecuta al confirmar la eliminación en el modal
    const confirmDelete = async () => {
        try {
            await deleteData('dueno', duenoToDelete); // Llama a la API para eliminar el dueño
            setModalTitle('Éxito');
            setModalMessage('Dueño eliminado correctamente.');
            setModalOpen(true); // Abre el modal de éxito
            loadDuenos(); // Recarga la lista de dueños para reflejar el cambio
        } catch (error) {
            console.error('Error al eliminar el dueño:', error);
            setModalTitle('Error');
            setModalMessage(`Hubo un error al eliminar el dueño: ${error.message}`);
            setModalOpen(true);
        } finally {
            setIsConfirmModal(false); // Restablece el tipo de modal
            setDuenoToDelete(null); // Limpia el ID del dueño a eliminar
            setTimeout(() => setModalOpen(false), 1500); // Cierra el modal después de un tiempo
        }
    };

    return (
        <div className="container p-8">
            <h2 className="table-title">Listado de Dueños</h2>
            <div className="table-actions">
              {/* Botón para navegar al formulario de registro de un nuevo dueño */}
                <button className="add-button" onClick={() => navigate('/duenos/registro')}>
                    Registrar Nuevo Dueño
                </button>
            </div>

            {duenos.length === 0 ? (
            <p className="no-data-message">No hay dueños registrados aún.</p>
            ) : (
            <div className="table-responsive">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>RUT</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeamos sobre la lista de dueños para renderizar cada fila */}
                        {duenos.map((dueno) => (
                            <tr key={dueno.id}>
                                <td>{dueno.id}</td>
                                <td>{dueno.nombre_completo}</td>
                                <td>{dueno.rut}</td>
                                <td>{dueno.telefono}</td>
                                <td>{dueno.correo}</td>
                                <td className="table-actions-cell">
                                    {/* Botón para editar el dueño */}
                                    <button className="edit-button" onClick={() => handleEdit(dueno.id)}>
                                        Editar
                                    </button>
                                    {/* Botón para eliminar el dueño */}
                                    <button className="delete-button" onClick={() => handleDelete(dueno.id)}>
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

export default ListaDuenos;
