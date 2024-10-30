const { VITE_API_URL } = import.meta.env;

export const fetchNewShiftRecordServices = async (
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

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchAllShiftRecordsServices = async (
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

    return body.data;
};

export const fetchClockInShiftRecordServices = async (
    authToken,
    clockIn,
    location,
    serviceId,
    employeeId

) => {


    const res = await fetch(
        `${VITE_API_URL}/shiftrecords/clockIn`,
        {
            method: 'POST',
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location,
                clockIn,
                serviceId,
                employeeId
            }),
        }
    );
    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchClockOutShiftRecordServices = async (
    authToken,
    clockOut,
    location,
    shiftRecordId
) => {
    const res = await fetch(`${VITE_API_URL}/shiftrecords/${shiftRecordId}`, {
        method: 'PATCH',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location,
            clockOut,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};

export const fetchDetailShiftRecordServices = async (
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

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchEditShiftRecordServices = async (
    shiftRecordId,
    clockIn,
    clockOut,
    authToken
) => {
    const res = await fetch(
        `${VITE_API_URL}/shiftrecords/edit/${shiftRecordId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
            },
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
