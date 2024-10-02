import { useState } from 'react';
import ListServicesComponent from './ListServicesComponent.jsx';
import RegisterServicesComponent from './RegisterServicesComponent.jsx';
import tabSelected from '../../../hooks/tabSelected.js';
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
            <div className='manager-tabs' id='tabs2'>
                <button
                    className='activeSelectedLink'
                    to='#ListServicesComponent'
                    onClick={(e) => {
                        handleChange('ListServicesComponent');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterServicesComponent'
                    onClick={(e) => {
                        handleChange('RegisterServicesComponent');
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

export default ServicesComponent;
