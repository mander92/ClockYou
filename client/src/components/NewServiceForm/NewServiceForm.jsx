import { useState } from 'react';

const NewServiceForm = ({ id }) => {
    const [dateTime, setDateTime] = useState('');
    const [hours, setHours] = useState(1);
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');

    const resetInputs = () => {
        setDateTime('');
        setHours(1);
        setAddress('');
        setCity('');
        setComments('');
    };

    const handleNewService = (e) => {
        e.preventDefault();

        const dateTimeZ = new Date(dateTime);
        console.log(dateTimeZ);
    };

    return (
        <section className='container'>
            <form
                id='recoverForm'
                className='userForm'
                onSubmit={handleNewService}
            >
                <fieldset>
                    <legend>Solicítalo</legend>
                    <label htmlFor='datetime'>Fecha y Hora</label>
                    <input
                        type='datetime-local'
                        id='datetime'
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                    <label htmlFor='hours'>Horas</label>
                    <select
                        id='hours'
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        required
                    >
                        <option value='' disabled>
                            Selecciona las horas necesarias
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </select>
                    <label htmlFor='address'>Dirección</label>
                    <input
                        type='text'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Gran Vía, 1, 5B'
                        required
                    />
                    <label htmlFor='postCode'>Código Postal</label>
                    <input
                        type='number'
                        id='c'
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        placeholder='28013'
                        minLength='5'
                        maxLength='5'
                        required
                    />
                    <label htmlFor='city'>Localidad</label>
                    <input
                        type='text'
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Madrid'
                        required
                    />
                    <label htmlFor='comments'>Comentarios</label>
                    <textarea
                        id='comments'
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder='Añada comentarios adicionales para describir sus necesidades sobre el servicio solicitado para poder brindarle nuestro mejor servicio'
                        minLength='25'
                        maxLength='500'
                        rows='5'
                        cols='50'
                        style={{ resize: 'none' }}
                        required
                    ></textarea>
                </fieldset>
                <div>
                    <button>Solicitar</button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </form>
        </section>
    );
};

export default NewServiceForm;
