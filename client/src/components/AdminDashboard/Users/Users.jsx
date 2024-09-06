// import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListUserController from './ListUserController';
import RegisterAdminUserController from './RegisterAdminUserController';

const Users = () => {
    const [activeSection, setActiveSection] = useState('ListUserController');
    // const [windowScroll, setWindowScroll] = useState('0');

    // useEffect(() => {
    //     const miau = window.scrollY;
    //     console.log('BBBBBBBBBBB ---- ', miau);
    //     function getScrollPosition() {
    //         setWindowScroll(miau);
    //         console.log('AAAAAAAAAAAAAAAAAA ---- ', windowScroll);
    //     }

    //     window.addEventListener('scroll', getScrollPosition);
    //     getScrollPosition();
    //     return () => {
    //         window.removeEventListener('scroll', getScrollPosition);
    //     };
    // }, [windowScroll]);

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
                    onClick={() => {
                        handleChange('ListUserController');
                        window.scrollTo(0, 0);
                    }}
                >
                    Listar
                </button>
                <button
                    to='#RegisterAdminUserController'
                    onClick={() => {
                        handleChange('RegisterAdminUserController');
                        window.scrollTo(0, 0);
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
