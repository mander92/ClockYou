import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import { fecthRegisterAdminUserService } from '../../../services/userServices';

import toast from 'react-hot-toast';

const RegisterAdminUserController = () => {
    const { authToken } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [job, setJob] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setEmail('');
        setFirstName('');
        setLastName('');
        setDni('');
        setPhone('');
        setPassword('');
        setRepeatedPassword('');
        setJob('');
        setCity('');
        setRole('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (password !== repeatedPassword) {
                throw new Error('¡Las contraseñas no coinciden!');
            } else {
                const data = await fecthRegisterAdminUserService(
                    email,
                    firstName,
                    lastName,
                    dni,
                    phone,
                    password,
                    job,
                    city,
                    role,
                    authToken
                );

                toast.success(data, {
                    id: 'ok',
                });
                resetInputs(e);
            }
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };
    return (
        <form className='form mx-auto' onSubmit={handleRegister}>
            <fieldset>
                <legend>Registro</legend>

            <label htmlFor='role'>Usuario</label>
                <select
                    id='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value='' disabled>
                        Tipo:
                    </option>
                    <option value='employee'>Empleado</option>
                    <option value='admin'>Admin</option>
                </select>

                <label htmlFor='job'>Trabajo</label>
                <input
                    type='text'
                    id='job'
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    placeholder='Masajista'
                    required
                />
                <label htmlFor='city'>Ciudad</label>
                <input
                    type='text'
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Madrid'
                    required
                />
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
                /

                <div>
                    <button type='submit'>Registrarse</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default RegisterAdminUserController;
