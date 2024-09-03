import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { fetchRegisterService } from '../services/userServices';
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
        e.preventDefault();
        try {
            if (password !== repeatedPassword) {
                throw new Error('¡Las contraseñas no coinciden!');
            } else {
                const data = await fetchRegisterService(
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

                resetInputs();

                navigate('/');
            }
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    if (user) return <Navigate to='/' />;

    return (
        <section className='container formsWrapper'>
            <form className='form' onSubmit={handleRegister}>
                <fieldset>
                    <legend>Registro</legend>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='user@ClockYou.com'
                        required
                    />

                    <label htmlFor='firstName'>Nombre</label>
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
                        pattern='[0-9]{8}[A-Za-z]{1}'
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

                    <label htmlFor='password'>Contraseña</label>
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
                    <div>
                        <button type='submit'>Registrarse</button>
                        <button onClick={resetInputs}>Limpiar</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default RegisterPage;
