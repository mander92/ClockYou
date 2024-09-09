import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ListServicesController from './ListServicesController.jsx';
import RegisterServicesController from './RegisterServicesController.jsx';

import tabSelected from '../../../../src/hooks/tabSelected';
import toTopFast from '../../../../src/hooks/toTopFast';

const Services = () => {
    const [activeSection, setActiveSection] = useState(
        'ListServicesController'
    );
    const location = useLocation();

    useEffect(() => {}, [location]);

    const handleChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        ListServicesController: <ListServicesController />,
        RegisterServicesController: <RegisterServicesController />,
    };

    return (
        <>
            <div className='managerTabs' id='tabs2'>
                <button
                    to='#ListServicesController'
                    onClick={(e) => {
                        handleChange('ListServicesController');
                        toTopFast(e);
                        tabSelected(e, 'tabs2');
                    }}
                    className='activeSelectedLink'
                >
                    Ver Todos
                </button>
                <button
                    to='#RegisterServicesController'
                    onClick={(e) => {
                        handleChange('RegisterServicesController');
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

export default Services;
