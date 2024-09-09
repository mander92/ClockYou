const { VITE_API_URL } = import.meta.env;

export const newShiftRecordService = async (
    authToken,
    serviceId,
    employeeId
) => {
    const res = await fetch(`${VITE_API_URL}/shiftRecords/${serviceId}`, {
        method: 'POST',
        headers: authToken
            ? {
                  Authorization: authToken,
                  'Content-Type': 'application/json',
              }
            : {},
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
