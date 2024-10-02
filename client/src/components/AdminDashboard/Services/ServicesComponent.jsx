import { useState } from 'react';
import ListServicesComponent from './ListServicesComponent.jsx';
import RegisterServicesComponent from './RegisterServicesComponent.jsx';
import toTopFast from '../../../hooks/toTopFast.js';

const ServicesComponent = () => {
    const [activeSection, setActiveSection] = useState('ListServicesComponent');

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesComponent: <ListServicesComponent />,
        RegisterServicesComponent: <RegisterServicesComponent />,
    };

    return (
        <>
            <div className='manager-tabs'>
                <button
                    className={
                        activeSection === 'ListServicesComponent' &&
                        'activeSelectedLink'
                    }
                    to='#ListServicesComponent'
                    onClick={(e) => {
                        handleChange('ListServicesComponent');
                        toTopFast(e);
                    }}
                >
                    Ver Todos
                </button>
                <button
                    className={
                        activeSection === 'RegisterServicesComponent' &&
                        'activeSelectedLink'
                    }
                    to='#RegisterServicesComponent'
                    onClick={(e) => {
                        handleChange('RegisterServicesComponent');
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

export default ServicesComponent;
