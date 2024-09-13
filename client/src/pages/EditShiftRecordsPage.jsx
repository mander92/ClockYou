import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    fetchDetailShiftRecordServices,
    fetchEditShiftRecordServices,
} from '../services/shiftRecordServices';
import Map from '../components/Map';

const EditShiftRecordsPage = () => {
    const { shiftRecordId } = useParams();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [clockIn, setClockIn] = useState(data.clockIn);
    const [clockOut, setClockOut] = useState(data.clockOut);

    const [location, setLocation] = useState({});

    useEffect(() => {
        const getDetailShiftRecord = async () => {
            try {
                const data = await fetchDetailShiftRecordServices(
                    shiftRecordId,
                    authToken
                );

                setData(data);
                setClockIn(data.clockIn);
                setClockOut(data.clockOut);
                setLocation({
                    currentLocation: {
                        lat: data.latitude,
                        lng: data.longitude,
                    },
                });
            } catch (error) {
                toast.error(error.message);
            }
        };

        getDetailShiftRecord();
    }, []);

    const handleEditShiftRecord = async (e) => {
        e.preventDefault();
        try {
            const formattedClockIn = new Date(clockIn)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            const formattedClockOut = new Date(clockOut)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            const data = await fetchEditShiftRecordServices(
                shiftRecordId,
                formattedClockIn,
                formattedClockOut,
                authToken
            );
            toast.success(data.message, {
                id: 'ok',
            });
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const entrada = new Date(data.clockIn).toLocaleString();
    const salida = new Date(data.clockOut).toLocaleString();

    return (
        <>
            <section className='mx-auto flex-1024'>
                <form className='profile-form' onSubmit={handleEditShiftRecord}>
                    <fieldset>
                        <h1>{`${data.firstName} ${data.lastName}`}</h1>
                        <h2>{`${data.address}, ${data.city}`}</h2>
                        <h3>{`${data.type}`}</h3>

                        <p className='font-extrabold'>{entrada}</p>
                        <p className='font-extrabold'>{salida}</p>

                        <p className='font-extrabold'>Comentarios:</p>
                        <p>{data.comments}</p>

                        <p className='font-extrabold'>Horas contratadas:</p>
                        <p>{data.hours}</p>
                        <p className='font-extrabold'>Descripción</p>
                        <p>{data.description}</p>
                        {location.currentLocation ? (
                            <div>
                                <Map location={location} />
                            </div>
                        ) : (
                            <span>Cargando el mapa</span>
                        )}

                        <label htmlFor='clockin' className='font-extrabold'>
                            Entrada
                        </label>
                        <input
                            id='clockin'
                            value={clockIn}
                            onChange={(e) => {
                                setClockIn(e.target.value);
                            }}
                            type='datetime-local'
                        />
                        <label htmlFor='clockin' className='font-extrabold'>
                            Salida
                        </label>
                        <input
                            type='datetime-local'
                            htmlFor='clockout'
                            id='clockout'
                            value={clockOut}
                            onChange={(e) => setClockOut(e.target.value)}
                        />

                        <button>Editar Turno</button>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

export default EditShiftRecordsPage;
