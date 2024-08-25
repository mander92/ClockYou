import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
  return (
    <header>
      <nav className='mainnav'>
        <a href='#'>
          <img className='w-14' src={clockyouLogo} alt='clockYou' />
        </a>

        <ul className='flex items-center gap-3'>
          <li>
            <a className='linkmainnav' href='#'>
              Nosotros
            </a>
          </li>
          <li>
            <a className='linkmainnav' href='#'>
              Servicios
            </a>
          </li>
          <li>
            <a className='linkmainnav' href='#'>
              Contacto
            </a>
          </li>
          <li>
            <a className='linkmainnav' href='#'>
              Acceso
            </a>
          </li>
          <li>
            <a className='linkmainnav' href='#'>
              Registro
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
