const { VITE_APP_TITLE } = import.meta.env;
// import TypeOfServicesPage from './TypeOfServicesPage';

const HomePage = () => {
    return (
        <>
            <section className='mx-auto isolate relative'>
                <article className='initial-content'>
                    <h1 className='my-4'>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                    <h2>
                        Encuentra cualquier servicio que necesites, con la
                        comodidad de no moverte
                    </h2>
                </article>
                <img src='./landing.webp' alt='Servicios múltiples' />
            </section>
            <h2 className='mt-12'>¿Cómo funciona?</h2>
            <section className='flex-1024'>
                <article className='m-10'>
                    <img
                        className='m-auto max-w-md'
                        src='./step-1.jpg'
                        alt=''
                    />
                    <h3>Busca lo que necesitas</h3>
                    <p className='text-center'>
                        Tenemos casi de todo: limpieza, clases particulares,
                        cuidado de mascotas...
                    </p>
                </article>
                <article>
                    <img
                        className='m-auto max-w-md'
                        src='./step-2.jpg'
                        alt=''
                    />
                    <h3>El profesional ideal</h3>
                    <p className='text-center'>
                        De nuestra amplia variedad, seleccionaremos al más
                        adecuado en base a tus preferencias
                    </p>
                </article>
            </section>

            {/* <TypeOfServicesPage /> */}
        </>
    );
};

export default HomePage;
