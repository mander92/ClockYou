const { VITE_API_URL } = import.meta.env;

export const fetchTypeOfServiceServices = async (typeOfServiceId) => {
    const res = await fetch(
        `${VITE_API_URL}/typeOfServices/${typeOfServiceId}`
    );
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchAllTypeOfServicesServices = async (searchParamsToString) => {
    const res = await fetch(
        `${VITE_API_URL}/typeOfServices/?${searchParamsToString}`
    );
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchEditTypeOfServiceServices = async (
    typeOfServiceId,
    description,
    price,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/typeOfServices/${typeOfServiceId}`,
        {
            method: 'PUT',
            headers: authToken
                ? {
                      Authorization: authToken,
                      'Content-Type': 'application/json',
                  }
                : {},
            body: JSON.stringify({
                description,
                price,
            }),
        }
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchDeleteTypeOfServiceServices = async (
    typeOfServiceId,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/typeOfServices/${typeOfServiceId}`,
        {
            method: 'DELETE',
            headers: authToken
                ? {
                      Authorization: authToken,
                      'Content-Type': 'application/json',
                  }
                : {},
        }
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchNewTypeOfServiceServices = async (
    type,
    description,
    city,
    price,
    image,
    authToken
) => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('city', city);
    formData.append('image', image);

    const res = await fetch(`${VITE_API_URL}/typeOfServices`, {
        method: 'POST',
        headers: { Authorization: authToken },
        body: formData,
    });
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};
