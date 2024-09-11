import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    fetchGetDetailShihtRecordService,
    fetchEditShiftRecordService,
} from '../services/shiftRecordServices';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EditShiftRecord = () => {
    const { shiftRecordId } = useParams();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState('');
    const [clockIn, setClockIn] = useState('');
    const [clockOut, setClockOut] = useState('');

    // const [mapaActual, setMapaActual] = useState(null);

    useEffect(() => {
        const getDetailShiftRecord = async () => {
            try {
                const data = await fetchGetDetailShihtRecordService(
                    shiftRecordId,
                    authToken
                );

                setData(data);
                setClockIn(data.clockIn);
                setClockOut(data.clockOut);
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
            const body = await fetchEditShiftRecordService(
                shiftRecordId,
                formattedClockIn,
                formattedClockOut,
                authToken
            );
            toast.success(body.message, {
                id: 'ok',
            });
            console.log(body);
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    // const mapContainerStyle = {
    //     width: '80%',
    //     height: '250px',
    //     margin: '15px auto',
    // };

    const entrada = new Date(data.clockIn).toLocaleString();
    const salida = new Date(data.clockOut).toLocaleString();
    return (
        <>
            <section className='mx-auto flex-1024'>
                <form className='profile-form'>
                    <fieldset>
                        <h1>{`${data.firstName} ${data.lastName}`}</h1>
                        <h2>{`${data.address}, ${data.city}`}</h2>
                        <h3>{`${data.type}`}</h3>
                        <img
                            src={data.image}
                            alt={data.firstName}
                        />
                        <p className='font-extrabold'>{entrada}</p>
                        <p className='font-extrabold'>{salida}</p>

                        <p className='font-extrabold'>Comentarios:</p>
                        <p>{data.comments}</p>

                        <p className='font-extrabold'>Horas contratadas:</p>
                        <p>{data.hours}</p>
                        <p className='font-extrabold'>Descripción</p>
                        <p>{data.description}</p>

                        <label
                            htmlFor='clockin'
                            className='font-extrabold'
                        >
                            Entrada
                        </label>
                        <input
                            id='clockin'
                            value={clockIn}
                            onChange={(e) => {
                                setClockIn(e.target.value);
                            }}
                            type='datetime-local'
                            required
                        />
                        <label
                            htmlFor='clockin'
                            className='font-extrabold'
                        >
                            Salida
                        </label>
                        <input
                            type='datetime-local'
                            htmlFor='clockout'
                            id='clockout'
                            value={clockOut}
                            onChange={(e) => setClockOut(e.target.value)}
                            required
                        />
                        <button
                            type='submit'
                            onClick={handleEditShiftRecord}
                        >
                            Editar Turno
                        </button>
                    </fieldset>
                </form>
            </section>

            {/* {mapaActual && (
                <LoadScript
                    googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapaActual.entrada || mapaActual}
                        zoom={15}
                    >
                        {mapaActual.entrada && (
                            <Marker position={mapaActual.entrada} />
                        )}
                        {mapaActual.salida && (
                            <Marker position={mapaActual.salida} />
                        )}
                    </GoogleMap>
                </LoadScript>
            )} */}
        </>
    );
};

export default EditShiftRecord;
