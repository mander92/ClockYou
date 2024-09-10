const { VITE_API_URL } = import.meta.env;

export const fetchRegisterUserServices = async (
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

export const fecthRegisterAdminUserServices = async (
    email,
    firstName,
    lastName,
    dni,
    phone,
    password,
    job,
    city,
    role,
    authToken
) => {
    const res = await fetch(`${VITE_API_URL}/users/admin/register`, {
        method: 'POST',
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
                  Authorization: authToken,
              }
            : {},
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            dni,
            phone,
            password,
            job,
            city,
            role,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchActiveUserServices = async (registrationCode) => {
    const res = await fetch(
        `${VITE_API_URL}/users/validate/${registrationCode}`
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.message;
};

export const fetchLoginUserServices = async (email, password) => {
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

export const fetchProfileUserServices = async (authToken) => {
    const res = await fetch(`${VITE_API_URL}/user`, {
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
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

export const fetchSendRecoverPasswordUserServices = async (email) => {
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

export const fetchChangePasswordUserServices = async (
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

export const fetchEditUserServices = async (
    authToken,
    firstName,
    lastName,
    phone,
    userId
) => {
    const res = await fetch(`${VITE_API_URL}/user/${userId}`, {
        method: 'PUT',
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
                  Authorization: authToken,
              }
            : {},
        body: JSON.stringify({
            firstName,
            lastName,
            phone,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchEditPasswordUserServices = async (
    authToken,
    actualPassword,
    newPassword,
    userId
) => {
    const res = await fetch(`${VITE_API_URL}/user/password/${userId}`, {
        method: 'PUT',
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
                  Authorization: authToken,
              }
            : {},
        body: JSON.stringify({
            actualPassword,
            newPassword,
        }),
    });
    const body = await res.json();
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    return body;
};

export const fetchDeleteUserServices = async (authToken, userId) => {
    const res = await fetch(`${VITE_API_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
                  Authorization: authToken,
              }
            : {},
    });
    const body = await res.json();
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    return body;
};

export const fetchEditAvatarUserServices = async (
    userId,
    authToken,
    avatar
) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    const res = await fetch(`${VITE_API_URL}/user/avatar/${userId}`, {
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

export const fetchAllUsersServices = async (
    searchParamsToString,
    authToken
) => {
    const res = await fetch(`${VITE_API_URL}/users/?${searchParamsToString}`, {
        headers: authToken
            ? {
                  'Content-Type': 'application/json',
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
