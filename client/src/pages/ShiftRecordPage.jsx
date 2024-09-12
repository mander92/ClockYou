import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../services/shiftRecordServices';
import Map from '../components/Map';

const ShiftRecordPage = () => {
    const { authToken } = useContext(AuthContext);
    const [enableEntrada, setEnableEntrada] = useState(false);
    const [enableSalida, setEnableSalida] = useState(false);
    const [entradaLocal, setEntradaLocal] = useState(null);
    const [salidaLocal, setSalidaLocal] = useState(null);
    const [entrada, setEntrada] = useState(null);
    const [salida, setSalida] = useState(null);
    const [totalTime, setTotalTime] = useState('');
    const [location, setLocation] = useState({
        currentLocation: { lat: '', lng: '' },
    });

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
        const data = await getLocation();
        const entrada = new Date();
        setEntrada(entrada);
        setEnableEntrada(true);
        setEntradaLocal(entrada.toLocaleString());
        setLocation({ currentLocation: data });
    };

    const calcularTiempoTotal = (entrada, salida) => {
        const diff = salida - entrada;
        console.log(diff);
        const horas = Math.floor(diff / 3600000);
        console.log(horas);
        const minutos = Math.floor((diff % 3600000) / 60000);
        return `${horas}h ${minutos}m`;
    };

    const registrarSalida = () => {
        setEnableSalida(true);

        const salidas = new Date();
        setSalida(salidas);

        const salidaToLocalString = salidas.toLocaleString();
        setSalidaLocal(salidaToLocalString);

        setTotalTime(calcularTiempoTotal(entrada, salida));
    };

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

                <p>Entrada: {entradaLocal ? entradaLocal : ''}</p>
                <p>Salida: {salidaLocal ? salidaLocal : ''}</p>
                <p>Total Horas: {totalTime ? totalTime : ''}</p>
                {location.currentLocation.lat && entradaLocal && (
                    <Map location={location} />
                )}
            </h2>

            {/*<h2 className='flex flex-col flex-wrap gap-3 justify-around mt-7 mb-12'>
                <p>{salidaLocal}</p>
                {location.currentLocation.lat && salidaLocal && (
                    <Map location={location} />
                )}
            </h2> */}
        </div>
    );
};

export default ShiftRecordPage;
