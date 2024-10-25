const { VITE_API_URL } = import.meta.env;

export const fetchAssingNewEmployeeSevice = async (
    serviceId,
    employeeId,
    authToken
) => {
    const res = await fetch(`${VITE_API_URL}/assign/${serviceId}`, {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
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

export const fetchDeleteEmployeeService = async (employeeId, serviceId, authToken) => {

    const res = await fetch(`${VITE_API_URL}/personsassigned/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId,
            serviceId
        })
    });

    const body = await res.json()

    if (body.status === 'error') {
        throw new Error(body.message)
    }

    return body;
}
