const { VITE_API_URL } = import.meta.env;
import { useState, useContext, useEffect } from 'react';
import useUser from '../hooks/useUser';
import { AuthContext } from '../context/AuthContext';
import { fetchEditUserService } from '../services/userServices';
import toast from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const { user } = useUser();

    const { authToken } = useContext(AuthContext);

    // if (!user) return <Navigate to='/' />

    const handleEditUser = async () => {
        try {
            const data = await fetchEditUserService(
                authToken,
                firstName,
                lastName,
                phone
            );
            const body = await data.json();
            setFirstName(body.Nombre);
            setLastName(body.Apellidos);
            setPhone(body.Teléfono);

            toast.success(body.message, {
                id: 'ok',
            });
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <section className='container'>
            {!user ? (
                <div>Cargando...</div>
            ) : (
                <div>
                    <form className='form'>
                        <fieldset>
                            <legend>Perfil</legend>
                            <img
                                className='user-avatar'
                                src={`${VITE_API_URL}/${user.avatar}`}
                                alt={`${user.firstName}`}
                            />
                            <label htmlFor='email'>Email</label>
                            <input disabled value={user.email} />
                            <label htmlFor='firstName'>Nombre</label>
                            <input
                                type='firtsName'
                                id='firstName'
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                value={firstName}
                            />
                            <label htmlFor='lastName'>Apellidos</label>
                            <input
                                type='lastName'
                                id='lastName'
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                value={lastName}
                            />
                            <label htmlFor='dni'>DNI</label>
                            <input disabled value={user.dni} />
                            <label htmlFor='phone'>Teléfono</label>
                            <input
                                type='phone'
                                id='phone'
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                value={phone}
                            />
                            {user.role === 'employee' && (
                                <>
                                    <label htmlFor='job'>Trabajo</label>
                                    <input disabled value={user.job} />
                                    <label htmlFor='city'>Ciudad</label>
                                    <input disabled value={user.city} />
                                </>
                            )}
                            <div>
                                <button onClick={handleEditUser}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Contraseña</legend>
                            <label htmlFor='actualPassword'>
                                Contraseña Actual
                            </label>
                            <input
                                disabled
                                placeholder='jobryp-kapDew-fetho6'
                            />
                            <label htmlFor='newPassword'>
                                Nueva Contraseña
                            </label>
                            <input
                                disabled
                                placeholder='bemgon-1bizni-nuhXyd'
                            />
                            <label htmlFor='repeatedPassword'>
                                Repetir Contraseña
                            </label>
                            <input
                                disabled
                                placeholder='bemgon-1bizni-nuhXyd'
                            />
                            <div>
                                <button>Editar</button>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Cuenta</legend>
                            <div>
                                <button>Eliminar Usuario</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )}
        </section>
    );
};

export default DashboardPage;
