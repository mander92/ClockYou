const { VITE_API_URL } = import.meta.env;

export const fetchRegisterService = async (
    email,
    firstName,
    lastName,
    dni,
    phone,
    password
) => {
    const res = await fetch(`${VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            dni,
            phone,
            password,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchActiveUserService = async (registrationCode) => {
    const res = await fetch(
        `${VITE_API_URL}/users/validate/${registrationCode}`
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchLoginService = async (email, password) => {
    const res = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchProfileService = async (authToken) => {
    const res = await fetch(`${VITE_API_URL}/user`, {
        headers: authToken
            ? {
                  Authorization: authToken,
              }
            : {},
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchSendRecoverService = async (email) => {
    const res = await fetch(`${VITE_API_URL}/users/password/recover`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchChangePasswordService = async (
    recoverPasswordCode,
    newPassword
) => {
    const res = await fetch(`${VITE_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recoverPasswordCode,
            newPassword,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchEditUserService = async (
    authToken,
    firstName,
    lastName,
    phone
) => {
    const res = await fetch(`${VITE_API_URL}/user`, {
        method: 'PUT',
        headers: authToken
            ? {
                  Authorization: authToken,
              }
            : {},
        body: firstName,
        lastName,
        phone,
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};
