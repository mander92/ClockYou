const { VITE_START_RESERVATION_HOUR, VITE_END_RESERVATION_HOUR } = import.meta
    .env;
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { fetchNewServiceServices } from '../services/serviceServices';
import toast from 'react-hot-toast';

const NewServiceFormComponent = ({ typeOfServiceId }) => {
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const timeIntervals = () => {
        const options = [];
        const startHour = VITE_START_RESERVATION_HOUR;
        const endHour = VITE_END_RESERVATION_HOUR;
        for (let i = startHour * 60; i <= endHour * 60; i += 30) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            options.push(time);
        }
        return options;
    };

    const valuesTimeInterval = timeIntervals();

    const [startDateTime, setStartDateTime] = useState(() => {
        const tomorrow = getTomorrowDate();
        return `${tomorrow}T${valuesTimeInterval[0]}`;
    });

    const [hours, setHours] = useState(1);
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');
    // const [withNavigate, setWithNavigate] = useState(false);
    const [addingNewdate, setAddingNewdate] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const resetInputs = (e) => {
        e.preventDefault();
        setStartDateTime(() => {
            const tomorrow = getTomorrowDate();
            return `${tomorrow}T${valuesTimeInterval[0]}`;
        });
        setHours(1);
        setNumberOfPeople(1);
        setAddress('');
        setCity('');
        setComments('');
    };

    const resetInputsDates = (e) => {
        e.preventDefault();
        setStartDateTime(() => {
            const tomorrow = getTomorrowDate();
            return `${tomorrow}T${valuesTimeInterval[0]}`;
        });
        setHours(1);
        setNumberOfPeople(1);
    };

    const handleNewService = async (e) => {
        e.preventDefault();
        try {
            const formattedDateTime = new Date(startDateTime)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const data = await fetchNewServiceServices(
                authToken,
                typeOfServiceId,
                formattedDateTime,
                hours,
                numberOfPeople,
                address,
                postCode,
                city,
                comments
            );

            toast.success(data.message, {
                id: 'ok',
            });
            navigate('/user#OrdersComponent');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const handleNewDate = async (e) => {
        e.preventDefault();
        try {
            const formattedDateTime = new Date(startDateTime)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            const data = await fetchNewServiceServices(
                authToken,
                typeOfServiceId,
                formattedDateTime,
                hours,
                numberOfPeople,
                address,
                postCode,
                city,
                comments
            );

            toast.success('Día registrado correctamente. Añade nueva fecha', {
                id: 'ok',
            });
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
                <p className='text-left text-sm mt-3 instruccion'>
                    Rellena primero los datos de la dirección postal en la que
                    se desarrollará el servicio
                </p>
                <label htmlFor='address'>Dirección</label>
                <input
                    required
                    type='text'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Escribe aquí tu dirección'
                />
                <label htmlFor='postCode'>Código Postal</label>
                <input
                    required
                    type='number'
                    id='postCode'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    placeholder='Escribe aquí tu código postal'
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
                    placeholder='Escribe aquí tu localidad'
                />

                <label htmlFor='comments'>Comentarios</label>
                <textarea
                    required
                    id='comments'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder='Añade comentarios adicionales para describir con detalle sus necesidades sobre el servicio solicitado'
                    minLength='10'
                    maxLength='250'
                    rows='5'
                ></textarea>

                {/* ------- */}

                <p className='text-left text-sm mt-8 instruccion'>
                    A continuación establece las fechas, horas, y nº de
                    empleados para tu servicio
                </p>
                <label htmlFor='date'>
                    {!addingNewdate ? 'Fecha de inicio' : 'Añade nueva fecha'}
                </label>
                <input
                    required
                    type='date'
                    id='date'
                    value={startDateTime.split('T')[0]}
                    min={getTomorrowDate()}
                    onChange={(e) =>
                        setStartDateTime(
                            e.target.value + 'T' + startDateTime.split('T')[1]
                        )
                    }
                />
                <label htmlFor='time'>Hora de inicio</label>
                <select
                    required
                    id='time'
                    value={startDateTime.split('T')[1]}
                    onChange={(e) =>
                        setStartDateTime(
                            startDateTime.split('T')[0] + 'T' + e.target.value
                        )
                    }
                >
                    <option value='' disabled>
                        Inicio del servicio
                    </option>
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

                <label htmlFor='numberOfPeople'>Nº de empleados</label>
                <select
                    required
                    id='numberOfPeople'
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                >
                    <option value='' disabled>
                        Empleados:
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

                <p className='text-left text-sm mt-5 instruccion'>
                    Si terminaste de definir las fechas en las que necesitabas
                    el servico, haz click en "Solicitar". Si quieres añadir más
                    fechas para tu servicio haz click en "Añadir fechas"
                </p>

                <button
                    style={{ marginTop: '.7rem', minWidth: 'content-fit' }}
                    onClick={(e) => {
                        setAddingNewdate(true);
                        handleNewDate(e);
                        resetInputsDates(e);
                    }}
                >
                    Añadir fechas
                </button>

                <div className='mx-auto mt-4'>
                    <button
                        onClick={handleNewService}
                        className='mr-4'
                        type='submit'
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
