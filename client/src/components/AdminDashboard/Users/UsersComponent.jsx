import { useState } from 'react';
import ListUserComponent from './ListUserComponent';
import RegisterAdminUserComponent from './RegisterAdminUserComponent';
import toTopFast from '../../../hooks/toTopFast';

const UsersComponent = () => {
    const [activeSection, setActiveSection] = useState('ListUserComponent');

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListUserComponent: <ListUserComponent />,
        RegisterAdminUserComponent: <RegisterAdminUserComponent />,
    };

    return (
        <>
            <div className='manager-tabs'>
                <button
                    to='#ListUserComponent'
                    className={
                        activeSection === 'ListUserComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('ListUserComponent');
                        toTopFast(e);
                    }}
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterAdminUserComponent'
                    className={
                        activeSection === 'RegisterAdminUserComponent' &&
                        'activeSelectedLink'
                    }
                    onClick={(e) => {
                        handleChange('RegisterAdminUserComponent');
                        toTopFast(e);
                    }}
                >
                    Registrar
                </button>
            </div>
            {sectionComponents[activeSection]}
        </>
    );
};

export default UsersComponent;
