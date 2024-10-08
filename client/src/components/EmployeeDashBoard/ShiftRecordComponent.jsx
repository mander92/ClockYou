import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../../services/shiftRecordServices';
import toast from 'react-hot-toast';
import MapComponent from '../MapComponent';

const ShiftRecordComponent = ({ shiftRecordId, saveLocation }) => {
    const { authToken } = useContext(AuthContext);
    const [location, setLocation] = useState({});
    const [bandera, setBandera] = useState(false);

    const getActualLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                return setLocation({
                    currentLocation: [
                        position.coords.latitude,
                        position.coords.longitude,
                    ],
                });
            });
        }
    };

    const getStart = async (e) => {
        e.preventDefault();
        await getActualLocation();
        setBandera(true);
        const clockIn = new Date();
        try {
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
        await getActualLocation();
        setBandera(true);
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
        <form className='mx-auto form-1024'>
            <fieldset>
                <button
                    className='mt-4 mb-2 text-white bg-green-600'
                    onClick={getStart}
                >
                    Registrar Entrada
                </button>

                <button className='mt-2 text-white bg-red-600' onClick={getEnd}>
                    Registrar Salida
                </button>
                {bandera ? <MapComponent location={location} /> : ''}
            </fieldset>
        </form>
    );
};

export default ShiftRecordComponent;
