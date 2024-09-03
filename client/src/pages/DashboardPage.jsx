import { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import Avatar from '../components/Avatar/Avatar';
import Profile from '../components/Profile/Profile';
import Users from '../components/AdminDashboard/Users/Users'
import { NavLink, useLocation } from 'react-router-dom';
import Services from '../components/AdminDashboard/Services';
import Contracts from '../components/AdminDashboard/Contracts';
import Shifts from '../components/AdminDashboard/Shifts';
import MyServices from '../components/EmployeeDashBoard/MyServices';
import Requests from '../components/ClientDashboard/Requests';
import Orders from '../components/ClientDashboard/Orders';


const DashboardPage = () => {
    const [ activeSection, setActiveSection ] = useState('profile')
    const location = useLocation()

    const {user} = useUser();
    const userRole = user?.role;
    console.log(userRole)



    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
          setActiveSection(hash);
        }
      }, [location]);
    
      const handleSectionChange = (section) => {
        setActiveSection(section);
      };
    


    return (
        
        <section className='container'>
            <Avatar />

            <div>
            <NavLink to="#profile" onClick={() => handleSectionChange('profile')}>Mi Perfil</NavLink>

            {userRole === 'admin' && <NavLink to="#users" onClick={() => handleSectionChange('users')}>Usuarios</NavLink>}
            {userRole === 'admin' && <NavLink to="#services" onClick={() => handleSectionChange('services')}>Servicios</NavLink>}
            {userRole === 'admin' && <NavLink to="#contracts" onClick={() => handleSectionChange('contracts')}>Contratos</NavLink>}
            {userRole === 'admin' && <NavLink to="#shifts" onClick={() => handleSectionChange('shifts')}>Turnos</NavLink>}

            {userRole === 'employee' && <NavLink to="#myservices" onClick={() => handleSectionChange('myservies')}>Mis Servicios</NavLink>}

            {userRole === 'client' && <NavLink to="#requests" onClick={() => handleSectionChange('requests')}>Solicitudes</NavLink>}
            {userRole === 'client' && <NavLink to="#orders" onClick={() => handleSectionChange('orders')}>Pedidos</NavLink>}
            
            </div>

            {activeSection === 'profile' && <Profile />}

            {userRole === 'admin' && activeSection === 'users' && <Users />}
            {userRole === 'admin' && activeSection === 'services' && <Services />}
            {userRole === 'admin' && activeSection === 'contracts' && <Contracts />}
            {userRole === 'admin' && activeSection === 'shifts' && <Shifts />}

            {userRole === 'employee' && activeSection === 'myservices' && <MyServices />}

            {userRole === 'client' && activeSection === 'requests' && <Requests />}
            {userRole === 'client' && activeSection === 'orders' && <Orders />}
            
        
        
            
        </section>
    );
};

export default DashboardPage;
