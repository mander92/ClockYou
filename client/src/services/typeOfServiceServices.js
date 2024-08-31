const { VITE_API_URL } = import.meta.env;

export const fetchTypeOfService = async (typeOfServiceId) => {
    const res = await fetch(
        `${VITE_API_URL}/typeOfServices/${typeOfServiceId}`
    );
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};
