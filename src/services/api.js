// src/services/api.js

// URL base de la API para la clínica veterinaria
// Esta URL se obtuvo del documento 'Evaluación N3- React.pdf'
const API_BASE_URL = 'http://67.205.142.104:3000/api';

/**
 * Función genérica para realizar peticiones GET a la API.
 * @param {string} endpoint - El endpoint específico de la API (ej. 'dueno', 'mascota').
 * @returns {Promise<Array>} - Una promesa que resuelve con un array de datos.
 */
export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
          // Si la respuesta no es exitosa (ej. 404, 500), lanzamos un error
            throw new Error(`Error al obtener datos de ${endpoint}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error en fetchData para ${endpoint}:`, error);
      throw error; // Propagamos el error para que el componente que llama pueda manejarlo
    }
};

/**
 * Función genérica para realizar peticiones POST a la API.
 * @param {string} endpoint - El endpoint específico de la API.
 * @param {Object} data - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con el objeto creado.
 */
export const createData = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
            },
            body: JSON.stringify(data), // Convertimos el objeto JavaScript a una cadena JSON
        });
        if (!response.ok) {
          const errorData = await response.json(); // Intentamos leer el mensaje de error del cuerpo
            throw new Error(`Error al crear en ${endpoint}: ${response.statusText} - ${errorData.message || 'Error desconocido'}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error en createData para ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Función genérica para realizar peticiones PUT a la API (actualizar).
 * @param {string} endpoint - El endpoint específico de la API.
 * @param {number|string} id - El ID del recurso a actualizar.
 * @param {Object} data - Los datos a enviar para la actualización.
 * @returns {Promise<Object>} - Una promesa que resuelve con el objeto actualizado.
 */
export const updateData = async (endpoint, id, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar en ${endpoint}/${id}: ${response.statusText} - ${errorData.message || 'Error desconocido'}`);
        }
        // Algunas APIs PUT pueden devolver el objeto actualizado, otras solo un status 204 No Content.
        // Verificamos si hay contenido antes de intentar parsear como JSON.
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const result = await response.json();
            return result;
        } else {
          return { success: true, message: 'Actualización exitosa' }; // O un objeto de confirmación simple
        }
    } catch (error) {
    console.error(`Error en updateData para ${endpoint}/${id}:`, error);
    throw error;
    }
};

/**
 * Función genérica para realizar peticiones DELETE a la API.
 * @param {string} endpoint - El endpoint específico de la API.
 * @param {number|string} id - El ID del recurso a eliminar.
 * @returns {Promise<Object>} - Una promesa que resuelve con un objeto de confirmación.
 */
export const deleteData = async (endpoint, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar en ${endpoint}/${id}: ${response.statusText} - ${errorData.message || 'Error desconocido'}`);
        }
        // Las peticiones DELETE a menudo devuelven un status 204 No Content.
        // No intentamos parsear JSON si no hay contenido.
        return { success: true, message: 'Eliminación exitosa' };
    } catch (error) {
        console.error(`Error en deleteData para ${endpoint}/${id}:`, error);
        throw error;
    }
};

/**
 * Función para obtener un solo recurso por su ID.
 * @param {string} endpoint - El endpoint específico de la API.
 * @param {number|string} id - El ID del recurso a obtener.
 * @returns {Promise<Object>} - Una promesa que resuelve con el objeto.
 */
export const fetchById = async (endpoint, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`);
        if (!response.ok) {
        throw new Error(`Error al obtener ${endpoint} con ID ${id}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error en fetchById para ${endpoint}/${id}:`, error);
        throw error;
    }
};
