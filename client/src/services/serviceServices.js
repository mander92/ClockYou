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

export const fecthAllServicesServices = async (
    searchParamsToString,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/services/?${searchParamsToString}`,
        {
            headers: { Authorization: authToken },
        }
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchConfirmServiceServices = async (validationCode) => {
    const res = await fetch(
        `${VITE_API_URL}/services/validate/${validationCode}`
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchDetailServiceServices = async (serviceId, authToken) => {
    const res = await fetch(`${VITE_API_URL}/services/${serviceId}`, {
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchClientAllServicesServices = async (
    searchParamsToString,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/services/client/?${searchParamsToString}`,
        {
            method: 'GET',
            headers: authToken
                ? {
                      Authorization: authToken,
                      'Content-Type': 'application/json',
                  }
                : {},
            body: JSON.stringify(),
        }
    );
    const body = await res.json();
    const urlParams = `${VITE_API_URL}/services/client/?${searchParamsToString}`;

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchAllMyServices = async (authToken) => {
    const res = await fetch(`${VITE_API_URL}/services/employee`, {
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

    if (body.status !== 'ok') {
        throw new Error(body.message);
    }

    return body.message;
};
