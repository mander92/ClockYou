
import useUser from '../hooks/useUser';
import Avatar from '../components/Avatar/Avatar';
import Profile from '../components/Profile/Profile';

const DashboardPage = () => {

    const {user} = useUser();




    return (
        <section className='container'>
            <Avatar />

            <button>Mi Perfil</button>
            <button>Usuarios</button>
            <button>Servicios</button>
            <button>Contratos</button>
            <button>Turnos</button>


            <Profile />
            
        
            
        </section>
    );
};

export default DashboardPage;
