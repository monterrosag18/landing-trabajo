/**
 * SupCrud - Main API Configuration
 * 
 * Este archivo centraliza la configuración de conexión con el backend.
 * Asegúrate de que el backend (Node.js) esté corriendo en el mismo puerto 
 * configurado aquí (usualmente el 3001 para HTTP local).
 */

const API_CONFIG = {
    // Si tienes el backend corriendo localmente en el puerto 3002, usa esta URL:
    BASE_URL: 'http://localhost:3002/api',

    // Si eventualmente lo publicas en un servidor (render, heroku, etc), cambia la URL aquí:
    // BASE_URL: 'https://tu-api-en-produccion.com/api',
};

// Helper function general para hacer peticiones fetch más limpias
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    // Configuración por defecto si enviamos JSON
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);

        // Si la respuesta no es OK (2xx), intentar leer el mensaje de error del backend
        if (!response.ok) {
            let errorMsg = `Error HTTP: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.error || errorData.message || errorMsg;
            } catch (e) {
                // Ignore JSON parse errors for fallback
            }
            throw new Error(errorMsg);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

window.fetchAPI = fetchAPI;
window.API_CONFIG = API_CONFIG;
