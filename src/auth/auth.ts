import type { LoginData, RegisterData } from './auth.interfaces';

const apiUrl = import.meta.env.VITE_API_URL + '/api';

async function handleResponse(response: Response) {
    const data = await response.json();
    if (!response.ok) {
        // La API de Teslo-Shop devuelve errores en un array 'message' o como un string
        const errorMessage = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        throw new Error(errorMessage || `Error ${response.status}`);
    }
    return data;
}

export const loginUser = async (loginData: LoginData) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    return handleResponse(response);
};

export const registerUser = async (registerData: RegisterData) => {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    });
    return handleResponse(response);
};