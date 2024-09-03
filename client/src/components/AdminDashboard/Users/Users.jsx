import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchUser from './SearchUser';
import RegisterEmployee from './RegisterEmployee';



const Users = () => {
    const [ activeSection, setActiveSection ] = useState(false)
    const location = useLocation()



    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
          setActiveSection(hash);
        }
      }, [location]);
    
      const handleChange = (section) => {
        setActiveSection(section);
      };



    return (
        <>
                <div>
                    <button to="#searchUser" onClick={() => handleChange('searchUser')}>Usuarios</button>
                    <button to="#registerEmployee" onClick={() => handleChange('registerEmployee')}>Registrar un Empleado</button>
                </div>
                {activeSection === 'searchUser' && <SearchUser />}
                {activeSection === 'registerEmployee' && <RegisterEmployee />}
        </>
    )
}

export default Users;