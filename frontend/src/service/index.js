import axios from 'axios';
import { store } from '../redux/store';

const baseUrl = 'http://localhost:5000/api';

/**
 * apiCall: A universal wrapper for Axios requests.
 * Automatically injects the JWT token from Redux store into the Authorization header.
 */
export async function apiCall(url, method, body) {
    try {
        // Retrieve the current state to get the token
        const state = store.getState();
        const token = state.user?.currentUser?.token;

        const response = await axios(`${baseUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header if token exists
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            data: body,
        });

        const data = await response.data;
        return data;
    } catch (error) {
        console.error("API Call Error:", error.response?.data || error.message);
        throw error; // Re-throw to allow component-level handling
    }
}