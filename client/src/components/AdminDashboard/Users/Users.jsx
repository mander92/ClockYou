import { useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListUserController from './ListUserController';
import RegisterAdminUserController from './RegisterAdminUserController';

const Users = () => {
    const [activeSection, setActiveSection] = useState('ListUserController');
    const location = useLocation();

    useEffect(() => {}, [location]);

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListUserController: <ListUserController />,
        RegisterAdminUserController: <RegisterAdminUserController />,
    };

    return (
        <>
            <div className='managerTabs'>
                <NavLink
                    to='#ListUserController'
                    onClick={() => handleChange('ListUserController')}
                    className='activeSelectedLink'
                >
                    Listar
                </NavLink>
                <NavLink
                    to='#RegisterAdminUserController'
                    onClick={() => handleChange('RegisterAdminUserController')}
                >
                    Registrar
                </NavLink>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default Users;
