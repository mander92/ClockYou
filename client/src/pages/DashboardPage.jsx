import { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import Avatar from '../components/Avatar/Avatar';
import Profile from '../components/Profile/Profile';
import Users from '../components/AdminDashboard/Users/Users';
import Services from '../components/AdminDashboard/Services/Services';
import Contracts from '../components/AdminDashboard/Contracts';
import Shifts from '../components/AdminDashboard/Shifts';
import MyServices from '../components/EmployeeDashBoard/MyServices';
import Requests from '../components/ClientDashboard/Requests';
import Orders from '../components/ClientDashboard/Orders';

const DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { user } = useUser();

    const userRole = user?.role;
    const location = useLocation();

    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveSection(hash);
        }
    }, [location]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        profile: <Profile />,
        users: userRole === 'admin' && <Users />,
        services: userRole === 'admin' && <Services />,
        contracts: userRole === 'admin' && <Contracts />,
        shifts: userRole === 'admin' && <Shifts />,
        requests: userRole === 'client' && <Requests />,
        orders: userRole === 'client' && <Orders />,
        myservices: userRole === 'employee' && <MyServices />,
    };

    if (!authToken && !user) return <Navigate to='/' />;

    return (
        <section className='container'>
            <Avatar />

            <div className='managerTabs'>
                <NavLink
                    to='#profile'
                    onClick={() => handleSectionChange('profile')}
                >
                    Perfil
                </NavLink>

                {userRole === 'admin' && (
                    <>
                        <NavLink
                            to='#users'
                            onClick={() => handleSectionChange('users')}
                        >
                            Usuarios
                        </NavLink>
                        <NavLink
                            to='#services'
                            onClick={() => handleSectionChange('services')}
                        >
                            Servicios
                        </NavLink>
                        <NavLink
                            to='#contracts'
                            onClick={() => handleSectionChange('contracts')}
                        >
                            Contratos
                        </NavLink>
                        <NavLink
                            to='#shifts'
                            onClick={() => handleSectionChange('shifts')}
                        >
                            Turnos
                        </NavLink>
                    </>
                )}

                {userRole === 'client' && (
                    <>
                        <NavLink
                            to='#requests'
                            onClick={() => handleSectionChange('requests')}
                        >
                            Solicitudes
                        </NavLink>
                        <NavLink
                            to='#orders'
                            onClick={() => handleSectionChange('orders')}
                        >
                            Pedidos
                        </NavLink>
                    </>
                )}
                {userRole === 'employee' && (
                    <NavLink
                        to='#myservices'
                        onClick={() => handleSectionChange('myservies')}
                    >
                        Mis Servicios
                    </NavLink>
                )}
            </div>
            {sectionComponents[activeSection]}
        </section>
    );
};

export default DashboardPage;
