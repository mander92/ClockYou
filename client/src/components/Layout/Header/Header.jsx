import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useUser from '../../../hooks/useUser';
import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
    const { authLogout } = useContext(AuthContext);
    const { user } = useUser();
    const [menuBurguer, setMenuBurguer] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleBurguer() {
        if (windowWidth < 1023) setMenuBurguer(!menuBurguer);
    }

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
        <header>
            <div className='container'>
                <nav className='mainnav flex flex-wrap'>
                    <NavLink className='flex items-center' to={'/'}>
                        <img
                            className='w-14'
                            src={clockyouLogo}
                            alt='clockYou'
                        />

                        <span className='text-4xl pl-1.5 serif-FONT-regular hidden sm:inline-flex'>
                            ClockYou
                        </span>
                    </NavLink>

                    <ul
                        id='navdinamica'
                        className={
                            menuBurguer ? 'navdinamica show' : 'navdinamica'
                        }
                    >
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
                                        to={'/user'}
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
                        className={
                            menuBurguer ? 'menuburguer open' : 'menuburguer'
                        }
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
