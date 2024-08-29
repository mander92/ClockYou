const { VITE_API_URL } = import.meta.env;


export const fetchInsertUserService = async (email, password) => {
	
	const res = await fetch(`${VITE_API_URL}/api/users/register`, {
		method: 'post',
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

	return body.message;
};

export const fetchUpdateUserRegisterService = async (registrationCode) => {
	
	const res = await fetch(`${VITE_API_URL}/api/users/validate/${registrationCode}`, {
		method: 'put',
	});

	const body = await res.json();

	if (body.status === 'error') {
		throw new Error(body.message);
	}

	return body.message;
};

export const fetchSelectUserByEmailService = async (email, password) => {
	
	const res = await fetch(`${VITE_API_URL}/api/users/login`, {
		method: 'post',
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

	return body.data.token;
};


export const fetchSelectUsersService = async (authToken) => {
	
	const res = await fetch(`${VITE_API_URL}/api/users`, {
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

	return body.data.user;
};