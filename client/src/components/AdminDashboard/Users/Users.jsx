import { useLocation } from 'react-router-dom';
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
                <button
                    to='#ListUserController'
                    onClick={() => handleChange('ListUserController')}
                >
                    Listar
                </button>
                <button
                    to='#RegisterAdminUserController'
                    onClick={() => handleChange('RegisterAdminUserController')}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default Users;
