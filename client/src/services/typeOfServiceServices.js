const { VITE_API_URL } = import.meta.env;

export const fetchTypeOfService = async (typeOfServiceId) => {
  const res = await fetch(`${VITE_API_URL}/typeOfServices/${typeOfServiceId}`);
  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data;
};

export const fetchAllTypeOfServices = async (searchParamsToString) => {
  const res = await fetch(
    `${VITE_API_URL}/typeOfServices/?${searchParamsToString}`
  );
  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data;
};

export const fetchEditTypeOfServices = async (
  typeOfServiceId,
  description,
  price,
  authToken
) => {
  const res = await fetch(`${VITE_API_URL}/typeOfServices/${typeOfServiceId}`, {
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
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body;
};

export const fetchDeleteTypeOfServices = async (typeOfServiceId, authToken) => {
  const res = await fetch(`${VITE_API_URL}/typeOfServices/${typeOfServiceId}`, {
    method: 'DELETE',
    headers: authToken
      ? {
          Authorization: authToken,
          'Content-Type': 'application/json',
        }
      : {},
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body;
};
