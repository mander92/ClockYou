import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchNewServiceServices } from '../../services/serviceServices';
import toast from 'react-hot-toast';

const NewServiceForm = ({ typeOfServiceId }) => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dateTime, setDateTime] = useState('');
    const [hours, setHours] = useState(1);
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');

    const resetInputs = (e) => {
        e.preventDefault();
        setDateTime('');
        setHours(1);
        setAddress('');
        setCity('');
        setComments('');
    };

    const handleNewService = async (e) => {
        try {
            e.preventDefault();

            const data = await fetchNewServiceServices(
                authToken,
                typeOfServiceId,
                dateTime,
                hours,
                address,
                postCode,
                city,
                comments
            );

            toast.success(data.message, {
                id: 'ok',
            });

            navigate('/');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <form className='profile-form'>
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
                        A contratar:
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
                    id='postCode'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    placeholder='28013'
                    min='10000'
                    max='50000'
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
                    minLength='10'
                    maxLength='500'
                    rows='5'
                    style={{ resize: 'none' }}
                    required
                ></textarea>
                <div className='mx-auto'>
                    <button
                        className='mr-4 mt-2'
                        type='submit'
                        onClick={handleNewService}
                    >
                        Solicitar
                    </button>
                    <button onClick={resetInputs}>Limpiar</button>
                </div>
            </fieldset>
        </form>
    );
};

export default NewServiceForm;
