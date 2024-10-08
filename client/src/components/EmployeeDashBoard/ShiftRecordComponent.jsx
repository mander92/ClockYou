import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../../services/shiftRecordServices';
import toast from 'react-hot-toast';
import MapComponent from '../MapComponent';

const ShiftRecordComponent = ({ shiftRecordId }) => {
    const { authToken } = useContext(AuthContext);
    const [locationClockIn, setLocationClockIn] = useState({});
    const [locatioClockOut, setAtucalLocation] = useState({});

    const getActualLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        });
    };

    const getStart = async (e) => {
        try {
            e.preventDefault();
            const location = await getActualLocation();
            setLocationClockIn(() => location);
            const clockIn = new Date();
            const data = await fetchClockInShiftRecordServices(
                authToken,
                clockIn,
                location,
                shiftRecordId
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

    const getEnd = async (e) => {
        e.preventDefault();
        const location = await getActualLocation();
        setAtucalLocation(() => location);
        const clockOut = new Date();
        try {
            const data = await fetchClockOutShiftRecordServices(
                authToken,
                clockOut,
                location,
                shiftRecordId
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

    return (
        <>
            <form className='mx-auto form-1024'>
                <fieldset>
                    <button
                        className='mt-4 mb-2 text-white bg-green-600'
                        onClick={getStart}
                    >
                        Registrar Entrada
                    </button>
                    {locationClockIn ? (
                        <MapComponent location={locationClockIn} />
                    ) : (
                        ''
                    )}
                </fieldset>
            </form>
            <form className='mx-auto form-1024'>
                <fieldset>
                    <button
                        className='mt-2 text-white bg-red-600'
                        onClick={getEnd}
                    >
                        Registrar Salida
                    </button>
                    {locatioClockOut && (
                        <MapComponent location={locatioClockOut} />
                    )}
                </fieldset>
            </form>
        </>
    );
};

export default ShiftRecordComponent;
