import './register.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { fetchRegisterService } from '../../services/userServices';

import toast from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const navigate = useNavigate();

    const resetInputs = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setDni('');
        setPhone('');
        setPassword('');
        setRepeatedPassword('');
    };

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (password !== repeatedPassword) {
                throw new Error('¡Las contraseñas no coinciden!');
            } else {
                const message = await fetchRegisterService(
                    email,
                    firstName,
                    lastName,
                    dni,
                    phone,
                    password
                );

                toast.success(message);

                resetInputs();

                navigate('/');
            }
        } catch (err) {
            toast.error(err.message, {
                id: 'registerError',
            });
        }
    };

    return (
        <section className='container'>
            <h2>Registro</h2>

            <form id='registerForm' onSubmit={handleRegister}>
                <fieldset>
                    <legend className='px-3'>Regístrate si te atreves</legend>

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='user@clockYou.com'
                        required
                    />

                    <label htmlFor='lastName'>Nombre</label>
                    <input
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Manuel'
                        required
                    />

                    <label htmlFor='lastName'>Apellidos</label>
                    <input
                        type='text'
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Pérez Rodríguez'
                        required
                    />

                    <label htmlFor='dni'>DNI</label>
                    <input
                        type='text'
                        id='dni'
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder='24873456Z'
                        required
                    />

                    <label htmlFor='phone'>Teléfono</label>
                    <input
                        type='tel'
                        id='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='680458923'
                        required
                    />

                    <label htmlFor='pass'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='jobryp-kapDew-fetho6'
                        required
                    />

                    <label htmlFor='repeatedPassword'>Repetir Contraseña</label>
                    <input
                        type='password'
                        id='repeatedPassword'
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        placeholder='jobryp-kapDew-fetho6'
                        required
                    />

                    <button>Registrarse</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </fieldset>
            </form>
        </section>
    );
};

export default Register;
