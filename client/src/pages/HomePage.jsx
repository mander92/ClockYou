const { VITE_APP_TITLE } = import.meta.env;

const HomePage = () => {
    return (
        <>
            <section className='mx-auto isolate relative heroCss conBgrImg'>
                <article className='initial-content'>
                    <h1 className='my-4'>{`Bienvenido a ${VITE_APP_TITLE}`}</h1>
                    <h2>
                        Encuentra cualquier servicio que necesites, con la
                        comodidad de no moverte
                    </h2>
                </article>
                {/* <img src='./landing.webp' alt='Servicios múltiples' /> */}
            </section>

            <section className='heroCss'>
                <div>
                    <h2 className='mb-8'>¿Cómo funciona?</h2>
                    <div className='flex-1024'>
                        <article className='m-3.5'>
                            <img
                                className='m-auto md:max-w-md'
                                src='./step-1.jpg'
                                alt=''
                            />
                            <h3>Busca lo que necesitas</h3>
                            <p className='text-center'>
                                Tenemos casi de todo: limpieza, clases
                                particulares, cuidado de mascotas...
                            </p>
                        </article>
                        <article className='m-3.5'>
                            <img
                                className='m-auto md:max-w-md'
                                src='./step-2.jpg'
                                alt=''
                            />
                            <h3>El profesional ideal</h3>
                            <p className='text-center'>
                                De nuestra amplia variedad, seleccionaremos al
                                más adecuado en base a tus preferencias
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className=''>
                <form className='mx-auto'>
                    <fieldset>
                        <legend>Contacta con ClockYou</legend>
                        <label htmlFor='name'>Nombre</label>
                        <input
                            type='text'
                            id='name'
                            value=''
                            placeholder='Tu nombre'
                            required
                        />
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value=''
                            placeholder='tuemail@tuemail.com'
                            required
                        />
                        <label htmlFor='comments'>Cuéntanos</label>
                        <textarea
                            required
                            id='comments'
                            value=''
                            placeholder='Cuéntanoslo todo'
                            minLength='10'
                            maxLength='250'
                            rows='5'
                            style={{ resize: 'none' }}
                        ></textarea>

                        <div className='mx-auto'>
                            <button className='mr-4' type='submit'>
                                Enviar
                            </button>
                            <button>Limpiar</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

export default HomePage;
