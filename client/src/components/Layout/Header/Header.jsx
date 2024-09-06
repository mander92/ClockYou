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
        setMenuBurguer(!menuBurguer);
    }

    // https://reactrouter.com/en/v6.3.0/api#navlink

    useEffect(() => {
        const navDinamica = document.getElementById('navdinamica');
        const anchoVentana = window.innerWidth;
        let checkForShowClass = navDinamica.classList.contains('show');

        if (anchoVentana < 1024) {
            checkForShowClass
                ? document.body.classList.add('overflow-hidden')
                : document.body.classList.remove('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [menuBurguer]);

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
