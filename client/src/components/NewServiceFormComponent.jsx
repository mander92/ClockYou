import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchNewServiceServices } from '../services/serviceServices';
import toast from 'react-hot-toast';

const NewServiceFormComponent = ({ typeOfServiceId }) => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dateTime, setDateTime] = useState('');
    const [hours, setHours] = useState(1);
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const timeIntervals = () => {
        const options = [];
        const startHour = 8;
        const endHour = 16;
        for (let i = startHour * 60; i <= endHour * 60; i += 30) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            options.push(time);
        }
        return options;
    };

    const valuesTimeInterval = timeIntervals();

    const resetInputs = (e) => {
        e.preventDefault();
        setDateTime('');
        setHours(1);
        setAddress('');
        setCity('');
        setComments('');
    };

    const handleNewService = async (e) => {
        e.preventDefault();
        try {
            const formattedDateTime = new Date(dateTime)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const data = await fetchNewServiceServices(
                authToken,
                typeOfServiceId,
                formattedDateTime,
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
                <label htmlFor='date'>Fecha</label>
                <input
                    required
                    type='date'
                    id='date'
                    value={dateTime.split('T')[0]}
                    min={getTomorrowDate()}
                    onChange={(e) =>
                        setDateTime(
                            e.target.value + 'T' + dateTime.split('T')[1]
                        )
                    }
                />
                <label htmlFor='time'>Hora comienzo servicio</label>
                <select
                    required
                    id='time'
                    value={dateTime.split('T')[1]}
                    onChange={(e) =>
                        setDateTime(
                            dateTime.split('T')[0] + 'T' + e.target.value
                        )
                    }
                >
                    {valuesTimeInterval.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
                <label htmlFor='hours'>Horas</label>
                <select
                    required
                    id='hours'
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
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
                    required
                    type='text'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Gran Vía, 1, 5B'
                />
                <label htmlFor='postCode'>Código Postal</label>
                <input
                    required
                    type='number'
                    id='postCode'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    placeholder='28013'
                    minLength='5'
                    maxLength='5'
                />
                <label htmlFor='city'>Localidad</label>
                <input
                    required
                    type='text'
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Madrid'
                />
                <label htmlFor='comments'>Comentarios</label>
                <textarea
                    required
                    id='comments'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder='Añada comentarios adicionales para describir con detalle sus necesidades sobre el servicio solicitado'
                    minLength='10'
                    maxLength='250'
                    rows='5'
                    style={{ resize: 'none' }}
                ></textarea>
                <div className='mx-auto'>
                    <button
                        className='mr-4'
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

export default NewServiceFormComponent;
