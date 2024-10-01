import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { fetchRegisterUserServices } from '../services/userServices';
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();

    const { user } = useUser();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setEmail('');
        setFirstName('');
        setLastName('');
        setDni('');
        setPhone('');
        setPassword('');
        setRepeatedPassword('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (password !== repeatedPassword) {
                throw new Error('¡Las contraseñas no coinciden!');
            } else {
                const data = await fetchRegisterUserServices(
                    email,
                    firstName,
                    lastName,
                    dni,
                    phone,
                    password
                );

                toast.success(data, {
                    id: 'ok',
                });

                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    if (user) return <Navigate to='/' />;

    return (
        <form className='form mx-auto' onSubmit={handleRegister}>
            <fieldset>
                <legend>Registro</legend>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Escribe aquí tu email'
                    required
                />

                <label htmlFor='firstName'>Nombre</label>
                <input
                    type='text'
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='Escribe aquí tu nombre'
                    required
                />

                <label htmlFor='lastName'>Apellidos</label>
                <input
                    type='text'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Escribe aquí tus apellidos'
                    required
                />

                <label htmlFor='dni'>DNI/NIE</label>
                <input
                    type='text'
                    id='dni'
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder='Escribe aquí tu DNI/NIE'
                    pattern='^[0-9]{8}[A-Za-z]$|^[XYZ][0-9]{7}[A-Za-z]$'
                    required
                />
                <label htmlFor='phone'>Teléfono</label>
                <input
                    type='tel'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Escribe aquí tu número de teléfono'
                    required
                />

                <label htmlFor='password'>Contraseña</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Escribe aquí tu contraseña'
                    minLength='8'
                    required
                />

                <label htmlFor='repeatedPassword'>Repetir contraseña</label>
                <input
                    type='password'
                    id='repeatedPassword'
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    placeholder='Repite aquí tu contraseña'
                    minLength='8'
                    required
                />
                <div className='mx-auto'>
                    <button className='mr-4' type='submit'>
                        Registrar
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterPage;
