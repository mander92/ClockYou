const { VITE_APP_TITLE } = import.meta.env;
import TypeOfServicesPage from './TypeOfServicesPage';

const HomePage = () => {
    return (
        <>
            <section>
                <h1 className='my-4'>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                <h2>El sitio web donde encontrarás todo lo que buscas ;)...</h2>
            </section>
            <TypeOfServicesPage />
        </>
    );
};

export default HomePage;
