import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { FaUser, FaUserTie } from 'react-icons/fa';
import { FaUserClock } from 'react-icons/fa6';
import useUser from '../../../hooks/useUser';
import './Header.css';

const Header = () => {
    const { authLogout } = useContext(AuthContext);
    const { user } = useUser();
    const [menuBurguer, setMenuBurguer] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleBurguer() {
        if (windowWidth < 1023) setMenuBurguer(!menuBurguer);
    }

    useEffect(() => {
        const mainHeader = document.getElementById('mainHeader');
        const mainHeaderHeight = mainHeader.offsetHeight;
        let howMuchScrollY;
        const handleScroll = () => {
            howMuchScrollY = window.scrollY;
            howMuchScrollY > mainHeaderHeight
                ? mainHeader.classList.add('sombreado')
                : mainHeader.classList.remove('sombreado');
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const navDinamica = document.getElementById('navdinamica');
        const checkForShowClass = navDinamica.classList.contains('show');
        const changeBodyStyle = () => {
            checkForShowClass
                ? document.body.classList.add('overflow-hidden')
                : document.body.classList.remove('overflow-hidden');
        };

        if (windowWidth < 1024) changeBodyStyle();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (windowWidth > 1023) {
                setMenuBurguer(false);
                changeBodyStyle();
            } else {
                changeBodyStyle();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [menuBurguer, windowWidth]);

    return (
        <header id='mainHeader'>
            <nav className='container my-2 mx-auto mainnav flex flex-wrap'>
                <NavLink className='flex items-center' to={'/'}>
                    <img className='w-14' src='/logo-test.png' alt='clockYou' />

                    <span className='text-2xl pl-1.5 serif-FONT-regular hidden sm:inline-flex'>
                        ClockYou
                    </span>
                </NavLink>

                <ul
                    id='navdinamica'
                    className={menuBurguer ? 'navdinamica show' : 'navdinamica'}
                >
                    <li className='identifyUserIcon'>
                        {user?.role === 'admin' ? (
                            <FaUserTie />
                        ) : user?.role === 'client' ? (
                            <FaUser />
                        ) : user?.role === 'employee' ? (
                            <FaUserClock />
                        ) : (
                            ''
                        )}
                    </li>
                    <li>
                        <NavLink
                            onClick={handleBurguer}
                            className='linkmainnav'
                            to={'/typeOfServices'}
                        >
                            Servicios
                        </NavLink>
                    </li>
                    {!user ? (
                        <>
                            <li>
                                <NavLink
                                    onClick={handleBurguer}
                                    className='linkmainnav'
                                    to={'/register'}
                                >
                                    Registrarse
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={handleBurguer}
                                    className='linkmainnav'
                                    to={'/login'}
                                >
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    onClick={handleBurguer}
                                    className='linkmainnav'
                                    to={'/user#ProfileComponent'}
                                >
                                    Mi Cuenta
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => {
                                        handleBurguer();
                                        authLogout();
                                    }}
                                    className='linkmainnav noBgr'
                                    to={'/'}
                                >
                                    Cerrar Sesión
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <div
                    onClick={handleBurguer}
                    className={menuBurguer ? 'menuburguer open' : 'menuburguer'}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
