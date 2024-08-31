const { VITE_APP_TITLE } = import.meta.env;
import TypeOfServicies from '../components/TypeOfServices/TypeOfServices';

const HomePage = () => {
    return (
        <>
            <div className='container'>
                <h1>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                <h2>El sitio web donde encontrarás todo lo que buscas ;)...</h2>
            </div>
            <TypeOfServicies />
        </>
    );
};

export default HomePage;
