import './Header.css';
import clockyouLogo from '/logo-test.png';

const Header = () => {
  return (
    <header>
      <nav className='mainnav'>
        <a href='/' className='flex items-center pb-3 sm:pb-0'>
          <img className='w-14' src={clockyouLogo} alt='clockYou' />
          <span className='text-4xl pl-1.5 dm-serif-text-regular'>
            ClockYou
          </span>
        </a>

        <ul className='flex flex-wrap items-center gap-3'>
          <li>
            <a className='linkmainnav' href='/about'>
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
            <a className='linkmainnav' href='/login'>
              Login
            </a>
          </li>
          <li>
            <a className='linkmainnav' href='/registro'>
              Registro
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
