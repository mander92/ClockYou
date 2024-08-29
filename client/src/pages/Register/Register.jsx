import { useState } from 'react';

import './register.css';
const { VITE_API_URL } = import.meta.env;

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    const fetchRegisterService = async (
        email,
        firstName,
        lastName,
        phone,
        dni,
        password
    ) => {
        const res = await fetch(`${VITE_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                firstName,
                lastName: lastName,
                phone,
                dni: dni,
                password,
            }),
        });

        const body = await res.json();

        if (body.status === 'error') {
            throw new Error(body.message);
        }

        return body.message;
    };

    const handleFormClick = async (e) => {
        try {
            e.preventDefault();

            if (password !== repeatedPass) {
                throw new Error('Las contraseñas no coinciden');
            } else {
                const message = await fetchRegisterService(
                    email,
                    firstName,
                    lastName,
                    phone,
                    dni,
                    password,
                    repeatedPass
                );

                alert(message);

                setFirstName('');
                setLastName('');
                setDni('');
                setEmail('');
                setPassword('');
                setPhone('');
                setRepeatedPass('');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <main>
            <h2>register</h2>

            <form id='registerForm' onSubmit={handleFormClick}>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                />

                <label htmlFor='nombre'>nombre</label>
                <input
                    type='text'
                    id='nombre'
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder='nombre'
                />

                <label htmlFor='lastName'>apellidos</label>
                <input
                    type='text'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder='apellidos'
                />

                <label htmlFor='dni'>dni</label>
                <input
                    type='text'
                    id='dni'
                    value={dni}
                    onChange={(e) => {
                        setDni(e.target.value);
                    }}
                    placeholder='dni'
                />

                <label htmlFor='tel'>teléfono</label>
                <input
                    type='text'
                    id='tel'
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    placeholder='teléfono'
                />

                <label htmlFor='contraseña'>contraseña</label>
                <input
                    type='text'
                    id='contraseña'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder='contraseña'
                />

                <label htmlFor='repiteContraseña'>contraseña</label>
                <input
                    type='text'
                    id='repiteContraseña'
                    value={repeatedPass}
                    onChange={(e) => {
                        setRepeatedPass(e.target.value);
                    }}
                    placeholder='contraseña'
                />

                <button>Enviar</button>
            </form>
        </main>
    );
};

export default Register;
