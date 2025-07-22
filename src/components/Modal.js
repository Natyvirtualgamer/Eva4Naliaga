// src/components/Modal.js
import React from 'react';
import './css/modal.css'; // Estilos para el modal

/**
 * Componente Modal genérico para mostrar mensajes o confirmaciones al usuario.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título del modal.
 * @param {string} props.message - Mensaje principal del modal.
 * @param {boolean} [props.isConfirm=false] - Si es un modal de confirmación (mostrará botones Sí/No).
 * @param {Function} [props.onConfirm] - Función a ejecutar si se confirma (solo para isConfirm=true).
 */
function Modal({ isOpen, onClose, title, message, isConfirm = false, onConfirm }) {
  // Si el modal no está abierto, no renderizamos nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    {isConfirm ? (
                        <>
                          {/* Botón para confirmar la acción */}
                            <button
                            className="modal-button confirm-button"
                            onClick={() => {
                              onConfirm(); // Ejecuta la función de confirmación
                              onClose();   // Cierra el modal
                            }}
                            >
                                Sí
                            </button>
                            {/* Botón para cancelar la acción */}
                            <button className="modal-button cancel-button" onClick={onClose}>
                                No
                            </button>
                        </>
                    ) : (
                      // Botón para cerrar el modal (para mensajes informativos)
                        <button className="modal-button close-button" onClick={onClose}>
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
