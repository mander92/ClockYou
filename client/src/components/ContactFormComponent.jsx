const { VITE_APP_TITLE, VITE_EMAIL_KEY } = import.meta.env;
import toast from 'react-hot-toast';

const ContactFormComponent = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append('access_key', VITE_EMAIL_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: json,
        }).then((res) => res.json());

        if (res.success) {
            toast.success('Consulta enviada correctamente', { id: 'ok' });
            event.target.reset();
        }
    };

    return (
        <form className='mx-auto pt-4 pb-4' onSubmit={onSubmit}>
            <fieldset>
                <legend>Contacta con {VITE_APP_TITLE}</legend>
                <label htmlFor='name'>Nombre</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Tu nombre'
                    required
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='tuemail@tuemail.com'
                    required
                />
                <label htmlFor='comments'>Cuéntanos</label>
                <textarea
                    required
                    id='comments'
                    name='message'
                    placeholder='Cuéntanoslo todo'
                    minLength='10'
                    maxLength='250'
                    rows='7'
                ></textarea>
                <div className='mx-auto'>
                    <button className='mr-4' type='submit'>
                        Enviar
                    </button>
                    <button type='reset'>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default ContactFormComponent;
