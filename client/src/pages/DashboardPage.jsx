const { VITE_API_URL } = import.meta.env;
import useUser from '../hooks/useUser';
// import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useUser();

    // if (!user) return <Navigate to='/' />;

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
                            <label htmlFor='lastName'>Nombre</label>
                            <input disabled value={user.firstName} />
                            <label htmlFor='lastName'>Apellidos</label>
                            <input disabled value={user.lastName} />
                            <label htmlFor='dni'>DNI</label>
                            <input disabled value={user.dni} />
                            <label htmlFor='dni'>Teléfono</label>
                            <input disabled value={user.phone} />
                            <div>
                                <button>Editar</button>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Contraseña</legend>
                            <label htmlFor='actualPassword'>
                                Contraseña Actual
                            </label>
                            <input disabled />
                            <label htmlFor='newPassword'>
                                Nueva Contraseña
                            </label>
                            <input disabled />
                            <label htmlFor='reapeatedPassword'>
                                Repetir Contraseña
                            </label>
                            <input disabled />
                            <div>
                                <button>Cambiar</button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Baja</legend>
                            <button>Eliminar Usuario</button>
                        </fieldset>
                    </form>
                </div>
            )}
        </section>
    );
};

export default DashboardPage;
