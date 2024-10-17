import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import toast from 'react-hot-toast';

import ListUserComponent from '../components/AdminDashboard/Users/ListUserComponent.jsx';
import { fetchNewContractAdmin } from '../services/serviceServices.js';
import { AuthContext } from '../context/AuthContext.jsx';

const CreateContract = () => {
    const { authToken } = useContext(AuthContext);
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

    const formatDate = (dateTime) => {
        if (dateTime) {
            const formattedDate = dateTime.replace('T', ' ');
            return formattedDate;
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedStartDateTime = formatDate(startDateTime);
        const formattedEndDateTime = formatDate(endDateTime);
        try {
            const res = await fetchNewContractAdmin(
                authToken,
                typeOfServiceId,
                formattedStartDateTime,
                formattedEndDateTime,
                hours,
                numberOfPeople,
                comments,
                address,
                city,
                postCode,
                clientId
            );

            toast.success(res.message);
            return;
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <form className='profile-form mx-auto' onSubmit={handleSubmit}>
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
                        value={clientId}
                        onChange={setClientId}
                    />
                    <button>Enviar</button>
                </fieldset>
            </form>
            <ListUserComponent setClientId={setClientId} />
        </>
    );
};
export default CreateContract;
