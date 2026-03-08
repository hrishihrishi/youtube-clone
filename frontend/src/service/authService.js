import { apiCall } from ".";

export async function registerUser(userData) {
    return await apiCall('/auth/signup', 'POST', userData);
}

export async function signInUser(userData) {
    return await apiCall('/auth/signin', 'POST', userData);
}

export async function signOutUser() {
    return await apiCall('/auth/signout', 'POST');
}

export async function getUserProfile() {
    return await apiCall('/auth/getUserDetails', 'GET');
}
