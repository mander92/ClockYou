import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchUser from './SearchUser';



const Users = () => {
    const [ activeSection, setActiveSection ] = useState('searchUser')
    const location = useLocation()



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
        <>
            <section className="container">
                <div>
                    <NavLink to="#searchUser" onClick={() => handleSectionChange('searchUser')}>Usuarios</NavLink>
                    <NavLink to="#registerEmployee" onClick={() => handleSectionChange('registerEmployee')}>Registrar un Empleado</NavLink>
                </div>
                {activeSection === 'searchUser' && <SearchUser />}
                {activeSection === 'registerEmployee' && <SearchUser />}
            </section>
            
        </>
    )
}

export default Users;