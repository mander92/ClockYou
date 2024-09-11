const { VITE_API_URL } = import.meta.env;

export const fecthNewShiftRecordServices = async (
    employeeId,
    serviceId,
    authToken
) => {
    const res = await fetch(`${VITE_API_URL}/shiftRecords/${serviceId}`, {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            employeeId,
        }),
    });

    const body = await res.json();

    if (body.status !== 'ok') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchAllShiftRecordServices = async (
    searchParamsToString,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/shiftrecords/?${searchParamsToString}`,
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

export const fetchClockIn = async (
    authToken,
    ubicacion,
    ahora,
    shiftRecordId
) => {
    const res = await fetch(
        `${VITE_API_URL}/shiftrecords/clockIn/${shiftRecordId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ubicacion,
                ahora,
            }),
        }
    );
    const body = await res.json();

    if (body.status !== 'ok') {
        throw new Error(body.message);
    }

    console.log(body);

    return body;
};

export const fetchClockOut = async (authToken, ahora, shiftRecordId) => {
    const res = await fetch(`${VITE_API_URL}/shiftrecords/${shiftRecordId}`, {
        method: 'PATCH',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ahora,
        }),
    });

    const body = await res.json();

    if (body.status !== 'ok') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchGetDetailShihtRecordService = async (
    shiftRecordId,
    authToken
) => {
    const res = await fetch(`${VITE_API_URL}/shiftrecords/${shiftRecordId}`, {
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
    });

    const body = await res.json();

    if (body.status !== 'ok') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchEditShiftRecordService = async (
    shiftRecordId,
    clockIn,
    clockOut,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/shiftrecords/edit/${shiftRecordId}`,
        {
            method: 'PUT',
            headers: authToken
                ? {
                      Authorization: authToken,
                      'Content-Type': 'application/json',
                  }
                : {},
            body: JSON.stringify({
                clockIn,
                clockOut,
            }),
        }
    );

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};
