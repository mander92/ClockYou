// const { VITE_GOOGLE_API_KEY } = import.meta.env;
import { AuthContext } from '../context/AuthContext';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../services/shiftRecordServices';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import toast from 'react-hot-toast';

const ClockPage = () => {
    const { authToken } = useContext(AuthContext);
    const { shiftRecordId } = useParams();

    const [registros, setRegistros] = useState([]);
    const [mapaActual, setMapaActual] = useState(null);
    const [enableEntrada, setEnableEntrada] = useState(false);

    const obtenerUbicacion = () => {
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
            const ubicacion = await obtenerUbicacion();

            const ahora = new Date();
            setRegistros([
                ...registros,
                {
                    entrada: { tiempo: ahora, ubicacion: ubicacion },
                    salida: null,
                    total: null,
                },
            ]);

            setEnableEntrada(true);

            const data = await fetchClockInShiftRecordServices(
                authToken,
                ubicacion,
                ahora,
                shiftRecordId
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const registrarSalida = async () => {
        try {
            const ubicacion = await obtenerUbicacion();
            const ahora = new Date();
            const nuevosRegistros = [...registros];
            const ultimoRegistro = nuevosRegistros[nuevosRegistros.length - 1];
            ultimoRegistro.salida = { tiempo: ahora, ubicacion: ubicacion };
            ultimoRegistro.total = calcularTiempoTotal(
                ultimoRegistro.entrada.tiempo,
                ahora
            );

            setRegistros(nuevosRegistros);

            const data = await fetchClockOutShiftRecordServices(
                authToken,
                ahora,
                shiftRecordId
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const calcularTiempoTotal = (entrada, salida) => {
        const diff = salida - entrada;
        const horas = Math.floor(diff / 3600000);
        const minutos = Math.floor((diff % 3600000) / 60000);
        return `${horas}h ${minutos}m`;
    };

    const formatearHora = (fecha) => {
        return fecha.toLocaleTimeString();
    };

    const mostrarMapa = (ubicacion) => {
        setMapaActual(ubicacion);
    };

    const mapContainerStyle = {
        width: '80%',
        height: '350px',
        margin: '15px auto',
    };

    return (
        <div className='flex flex-col mt-12 my-auto mx-auto border-2 rounded-xl p-5 shadow-md max-w-screen-lg self-center'>
            <h2 className='flex flex-wrap gap-3 justify-around mt-7 mb-12'>
                <button
                    className='border-2 rounded-xl p-5 text-white bg-green-600'
                    disabled={enableEntrada}
                    onClick={registrarEntrada}
                >
                    Registrar Entrada
                </button>
                <button
                    className='border-2 rounded-xl p-5 text-white bg-red-600'
                    onClick={registrarSalida}
                >
                    Registrar Salida
                </button>
            </h2>

            <table>
                <thead>
                    <tr>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Tiempo Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>
                                {formatearHora(registro.entrada.tiempo)}
                                {/* <button
                                    onClick={() =>
                                        mostrarMapa({
                                            entrada: registro.entrada.ubicacion,
                                        })
                                    }
                                >
                                    Ver mapa
                                </button> */}
                            </td>
                            <td>
                                {registro.salida ? (
                                    <>
                                        {formatearHora(registro.salida.tiempo)}
                                        <button
                                            onClick={() =>
                                                mostrarMapa({
                                                    salida: registro.salida
                                                        .ubicacion,
                                                })
                                            }
                                        >
                                            Ver mapa
                                        </button>
                                    </>
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td>{registro.total || '-'}</td>
                            <td>
                                {registro.salida && (
                                    <button
                                        onClick={() =>
                                            mostrarMapa({
                                                entrada:
                                                    registro.entrada.ubicacion,
                                                salida: registro.salida
                                                    .ubicacion,
                                            })
                                        }
                                    >
                                        Ver ruta
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {mapaActual && (
                <LoadScript>
                    {/* <LoadScript googleMapsApiKey={VITE_GOOGLE_API_KEY}> */}
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
            )}
        </div>
    );
};

export default ClockPage;
