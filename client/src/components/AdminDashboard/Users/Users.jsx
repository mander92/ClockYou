import { useState } from 'react';
import ListUserController from './ListUserController';
import RegisterAdminUserController from './RegisterAdminUserController';
import tabSelected from '../../../../src/hooks/tabSelected';
import toTopFast from '../../../../src/hooks/toTopFast';

const Users = () => {
    const [activeSection, setActiveSection] = useState('ListUserController');

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListUserController: <ListUserController />,
        RegisterAdminUserController: <RegisterAdminUserController />,
    };

    return (
        <>
            <div className='manager-tabs' id='tabs2'>
                <button
                    to='#ListUserController'
                    onClick={(e) => {
                        handleChange('ListUserController');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                    className='activeSelectedLink'
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterAdminUserController'
                    onClick={(e) => {
                        handleChange('RegisterAdminUserController');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default Users;
