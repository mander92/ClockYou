import { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import AvatarComponent from '../components/AvatarComponent';
import ProfileComponent from '../components/ProfileComponent';
import UsersComponent from '../components/AdminDashboard/Users/UsersComponent';
import ServicesComponent from '../components/AdminDashboard/Services/ServicesComponent';
import ContractsComponent from '../components/AdminDashboard/Contracts/ContractsComponent';
import ShiftsComponent from '../components/AdminDashboard/Shifts/ShiftsComponent';
import MyServicesComponent from '../components/EmployeeDashBoard/MyServicesComponent';
import OrdersComponent from '../components/ClientDashboard/OrdersComponent';
import tabSelected from '../hooks/tabSelected';
import toTopFast from '../hooks/toTopFast';

const DashboardPage = () => {
    const { authToken } = useContext(AuthContext);
    const { user } = useUser();

    const userRole = user?.role;

    const [activeSection, setActiveSection] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash) {
            setActiveSection(location.hash.substring(1));
        }
    }, [location]);

    useEffect(() => {
        navigate(`#${activeSection}`);
    }, [activeSection, navigate]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ProfileComponent: <ProfileComponent />,
        UsersComponent: userRole === 'admin' && <UsersComponent />,
        ServicesComponent: userRole === 'admin' && <ServicesComponent />,
        ContractsComponent: userRole === 'admin' && <ContractsComponent />,
        ShiftsComponent: userRole === 'admin' && <ShiftsComponent />,
        OrdersComponent: userRole === 'client' && <OrdersComponent />,
        MyServicesComponent: userRole === 'employee' && <MyServicesComponent />,
    };

    if (!authToken && !user) return <Navigate to='/' />;

    return (
        <>
            <AvatarComponent />
            <section
                className='manager-tabs'
                id='tabs5'
            >
                <NavLink
                    to='#ProfileComponent'
                    onClick={(e) => {
                        handleSectionChange('ProfileComponent');
                        tabSelected(e, 'tabs5');
                        toTopFast(e);
                    }}
                >
                    Mi Perfil
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
                            to='#ServicesComponent'
                            onClick={(e) => {
                                handleSectionChange('ServicesComponent');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Servicios
                        </NavLink>
                        <NavLink
                            to='#ContractsComponent'
                            onClick={(e) => {
                                handleSectionChange('ContractsComponent');
                                tabSelected(e, 'tabs5');
                                toTopFast(e);
                            }}
                        >
                            Contratos
                        </NavLink>
                        <NavLink
                            to='#ShiftsComponent'
                            onClick={(e) => {
                                handleSectionChange('ShiftsComponent');
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
                        to='#OrdersComponent'
                        onClick={(e) => {
                            handleSectionChange('OrdersComponent');
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
                        to='#MyServicesComponent'
                        onClick={(e) => {
                            handleSectionChange('MyServicesComponent');
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
