const { VITE_API_URL } = import.meta.env;

export const fetchNewServiceServices = async (
    authToken,
    typeOfServiceId,
    dateTime,
    hours,
    address,
    postCode,
    city,
    comments
) => {
    const res = await fetch(`${VITE_API_URL}/services/${typeOfServiceId}`, {
        method: 'POST',
        headers: authToken
            ? {
                  Authorization: authToken,
                  'Content-Type': 'application/json',
              }
            : {},
        body: JSON.stringify({
            dateTime,
            hours,
            address,
            postCode,
            city,
            comments,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchListClientServiceServices = async (authToken) => {
    const res = await fetch(`${VITE_API_URL}/services/client`, {
        method: 'GET',
        headers: authToken
            ? {
                  Authorization: authToken,
                  'Content-Type': 'application/json',
              }
            : {},
        body: JSON.stringify(),
    });
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};
