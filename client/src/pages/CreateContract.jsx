import { useParams } from 'react-router-dom';
import { useState } from 'react';

const CreateContract = () => {
    const { typeOfServiceId } = useParams();

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [hours, setHours] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [comments, setComments] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [clientId, setClientId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form className='profile-form' onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor='startDateTime'>Fecha de inicio</label>
                    <input
                        type='datetime-local'
                        id='startDateTime'
                        name='startDateTime'
                        value={startDateTime}
                        onChange={(e) => {
                            setStartDateTime(e.target.value);
                        }}
                    />
                    <label htmlFor='endDateTime'>Fecha de fin</label>
                    <input
                        type='datetime-local'
                        id='startDateTime'
                        name='startDateTime'
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                    />
                    <label htmlFor='Hours'>Horas Totales</label>
                    <input
                        type='number'
                        defaultValue={1}
                        min={1}
                        id='Hours'
                        name='Hours'
                        value={hours}
                        onChange={(e) => {
                            setHours(e.target.value);
                        }}
                    />

                    <label htmlFor='NumberOfPeople'>Número de personas</label>
                    <input
                        type='number'
                        min={1}
                        defaultValue={1}
                        id='NumberOfPeople'
                        name='NumberOfPeople'
                        value={numberOfPeople}
                        onChange={(e) => {
                            setNumberOfPeople(e.target.value);
                        }}
                    />

                    <label htmlFor='comments'>comentarios</label>
                    <input
                        type='text'
                        id='comments'
                        name='comments'
                        value={comments}
                        onChange={(e) => {
                            setComments(e.target.value);
                        }}
                    />

                    <label htmlFor='Address'>Dirección</label>
                    <input
                        type='text'
                        id='Addres'
                        name='Addres'
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />

                    <label htmlFor='city'>city</label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    />

                    <label htmlFor='PostCode'>Código Postal</label>
                    <input
                        type='number'
                        id='PostCode'
                        name='PostCode'
                        value={postCode}
                        onChange={(e) => {
                            setPostCode(e.target.value);
                        }}
                    />

                    <label htmlFor='Client'>
                        Cliente (Elígelo en el Buscador)
                    </label>
                    <input
                        type='text'
                        id='Client'
                        name='CLient'
                        value={clientId ? clientId : ''}
                    />

                    <button>Enviar</button>
                </fieldset>
            </form>
        </>
    );
};
export default CreateContract;
