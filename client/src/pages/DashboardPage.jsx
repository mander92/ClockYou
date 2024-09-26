import { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import AvatarComponent from '../components/AvatarComponent';
import ProfileComponent from '../components/ProfileComponent';
import UsersComponent from '../components/AdminDashboard/Users/UsersComponent';
import ServicesComponent from '../components/AdminDashboard/Services/ServicesComponent';
import Contracts from '../components/AdminDashboard/Contracts/ListContractsComponent';
import ShiftsComponent from '../components/AdminDashboard/Shifts/ShiftsComponent';
import MyServicesComponent from '../components/EmployeeDashBoard/MyServicesComponent';
import OrdersComponent from '../components/ClientDashboard/OrdersComponent';
import tabSelected from '../hooks/tabSelected';
import toTopFast from '../hooks/toTopFast';

const DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { user } = useUser();

    const firstLoadClass = 'activeSelectedLink';
    const userRole = user?.role;
    const location = useLocation();

    const [activeSection, setActiveSection] = useState('ProfileComponent');

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
        ProfileComponent: <ProfileComponent />,
        UsersComponent: userRole === 'admin' && <UsersComponent />,
        services: userRole === 'admin' && <ServicesComponent />,
        contracts: userRole === 'admin' && <Contracts />,
        shifts: userRole === 'admin' && <ShiftsComponent />,
        orders: userRole === 'client' && <OrdersComponent />,
        myServices: userRole === 'employee' && <MyServicesComponent />,
    };

    if (!authToken && !user) return <Navigate to='/' />;

    return (
        <>
            <AvatarComponent />
            <section className='manager-tabs' id='tabs5'>
                <NavLink
                    to='#ProfileComponent'
                    onClick={(e) => {
                        handleSectionChange('ProfileComponent');
                        tabSelected(e, 'tabs5');
                        toTopFast(e);
                    }}
                    className={firstLoadClass}
                >
                    Perfil
                </NavLink>

                {userRole === 'admin' && (
                    <>
                        <NavLink
                            to='#UsersComponent'
                            onClick={(e) => {
                                handleSectionChange('UsersComponent');
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
                    <NavLink
                        className='less-than-4-buttons'
                        to='#orders'
                        onClick={(e) => {
                            handleSectionChange('orders');
                            tabSelected(e, 'tabs5');
                            toTopFast(e);
                        }}
                    >
                        Pedidos
                    </NavLink>
                )}
                {userRole === 'employee' && (
                    <NavLink
                        className='less-than-4-buttons'
                        to='#myServices'
                        onClick={(e) => {
                            handleSectionChange('myServices');
                            tabSelected(e, 'tabs5');
                            toTopFast(e);
                        }}
                    >
                        Servicios
                    </NavLink>
                )}
            </section>
            {sectionComponents[activeSection]}
        </>
    );
};

export default DashboardPage;
