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
                            <label htmlFor='phone'>Teléfono</label>
                            <input disabled value={user.phone} />
                            {user.role === 'employee' && (
                                <>
                                    <label htmlFor='job'>Trabajo</label>
                                    <input disabled value={user.job} />
                                    <label htmlFor='city'>Ciudad</label>
                                    <input disabled value={user.city} />
                                </>
                            )}
                            <div>
                                <button>Editar</button>
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
                                <button>Cambiar</button>
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
