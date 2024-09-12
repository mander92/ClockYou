import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
    fetchDetailShiftRecordServices,
} from '../services/shiftRecordServices';
import Map from '../components/Map';

const ShiftRecordPage = () => {
    const { authToken } = useContext(AuthContext);
    const { shiftRecordId } = useParams();
    const navigate = useNavigate();
    const [clockIn, setClockIn] = useState([]);
    const [enableEntrada, setEnableEntrada] = useState(false);
    const [enableSalida, setEnableSalida] = useState(false);
    const [entradaLocal, setEntradaLocal] = useState(null);
    const [salidaLocal, setSalidaLocal] = useState(null);
    const [location, setLocation] = useState({
        currentLocation: { lat: '', lng: '' },
    });

    useEffect(() => {
        const getAllData = async () => {
            try {
                const data = await fetchDetailShiftRecordServices(
                    shiftRecordId,
                    authToken
                );

                setClockIn(data?.clockIn);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getAllData();
    }, []);

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) =>
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }),
                    (error) => reject(error)
                );
            } else {
                reject(new Error('Geolocalización no soportada'));
            }
        });
    };

    const registrarEntrada = async () => {
        try {
            const location = await getLocation();
            const entrada = new Date();
            setEnableEntrada(true);
            setEntradaLocal(entrada.toLocaleString());
            setLocation({ currentLocation: location });

            const dataClockIn = await fetchClockInShiftRecordServices(
                authToken,
                entrada,
                location,
                shiftRecordId
            );

            toast.success(dataClockIn.message, {
                id: 'ok',
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    // const calcularTiempoTotal = (entrada) => {
    //     const entradaDate = new Date(entrada);
    //     const salida = new Date();
    //     const diff = salida - entradaDate;
    //     const horas = Math.floor(diff / 3600000);
    //     console.log(horas);
    //     const minutos = Math.ceil((diff % 3600000) / 60000);
    //     return `${horas}h ${minutos}m`;
    // };

    const registrarSalida = async () => {
        try {
            setEnableSalida(true);

            const salidas = new Date();

            const salidaToLocalString = salidas.toLocaleString();
            setSalidaLocal(salidaToLocalString);

            const dataClockOut = await fetchClockOutShiftRecordServices(
                authToken,
                salidas,
                shiftRecordId
            );

            toast.success(dataClockOut.message, {
                id: 'ok',
            });

            navigate('/user');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const entradaLocalString = new Date(clockIn).toLocaleString();

    return (
        <div className='flex flex-col mt-12 my-auto mx-auto border-2 rounded-xl p-5 shadow-md max-w-screen-lg self-center'>
            <h2 className='flex flex-col flex-wrap gap-3 justify-around mt-7 mb-12'>
                <div className='flex gap-11'>
                    <button
                        className='border-2 mx-auto max-w-56 rounded-xl p-5 text-white bg-green-600'
                        disabled={enableEntrada}
                        onClick={registrarEntrada}
                    >
                        Registrar Entrada
                    </button>
                    <button
                        className='border-2 mx-auto max-w-56 rounded-xl p-5 text-white bg-red-600'
                        disabled={enableSalida}
                        onClick={registrarSalida}
                    >
                        Registrar Salida
                    </button>
                </div>

                <p>
                    Entrada:{' '}
                    {clockIn
                        ? entradaLocalString
                        : entradaLocal
                          ? entradaLocal
                          : ''}
                </p>
                <p>Salida: {salidaLocal ? salidaLocal : ''}</p>
                {location.currentLocation.lat && entradaLocal && (
                    <Map location={location} />
                )}
            </h2>
        </div>
    );
};

export default ShiftRecordPage;
