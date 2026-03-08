const baseUrl = 'http://localhost:5000/api';

export async function apiCall(url, method, body) {
    try {
        const response = await axios(`${baseUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            data: body,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}