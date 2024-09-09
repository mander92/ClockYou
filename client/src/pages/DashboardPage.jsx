import { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import Avatar from '../components/Avatar/Avatar';
import Profile from '../components/Profile/Profile';
import Users from '../components/AdminDashboard/Users/Users';
import Services from '../components/AdminDashboard/Services/Services';
import Contracts from '../components/AdminDashboard/Contracts/Contracts';
import Shifts from '../components/AdminDashboard/Shifts';
import MyServices from '../components/EmployeeDashBoard/MyServices';
import Requests from '../components/ClientDashboard/Requests';
import Orders from '../components/ClientDashboard/Orders';
import tabSelected from '../hooks/tabSelected';
import toTopFast from '../hooks/toTopFast';

const DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { user } = useUser();

    const firstLoadClass = 'activeSelectedLink';

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

            <div className='managerTabs' id='tabs5'>
                <NavLink
                    to='#profile'
                    onClick={(e) => {
                        handleSectionChange('profile');
                        tabSelected(e, 'tabs5');
                        toTopFast(e);
                    }}
                    className={firstLoadClass}
                >
                    Mi Perfil
                </NavLink>

                {userRole === 'admin' && (
                    <>
                        <NavLink
                            to='#users'
                            onClick={(e) => {
                                handleSectionChange('users');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Usuarios
                        </NavLink>
                        <NavLink
                            to='#services'
                            onClick={(e) => {
                                handleSectionChange('services');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Servicios
                        </NavLink>
                        <NavLink
                            to='#contracts'
                            onClick={(e) => {
                                handleSectionChange('contracts');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Contratos
                        </NavLink>
                        <NavLink
                            to='#shifts'
                            onClick={(e) => {
                                handleSectionChange('shifts');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Turnos
                        </NavLink>
                    </>
                )}

                {userRole === 'client' && (
                    <>
                        <NavLink
                            to='#orders'
                            onClick={(e) => {
                                handleSectionChange('orders');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Pedidos
                        </NavLink>
                    </>
                )}
                {userRole === 'employee' && (
                    <NavLink
                        to='#myservices'
                        onClick={(e) => {
                            handleSectionChange('myservices');
                            tabSelected(e, 'tabs5');
                            toTopFast(e);
                        }}
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
