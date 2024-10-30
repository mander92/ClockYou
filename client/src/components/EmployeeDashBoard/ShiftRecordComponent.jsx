import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../../services/shiftRecordServices';
import toast from 'react-hot-toast';
import MapComponent from '../MapComponent';
import Modal from 'react-modal';

const ShiftRecordComponent = ({
    serviceId,
    employeeId,
    onRequestClose,
    initialLocation,
}) => {
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
                serviceId,
                employeeId
            );

            toast.success(data.message, {
                id: 'ok',
            });
            onRequestClose();
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
                serviceId,
                empployeeId
            );

            toast.success(data.message, {
                id: 'ok',
            });
            onRequestClose();
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <div className='flex justify-evenly flex-wrap'>
            <form className='mx-auto'>
                <fieldset>
                    <button
                        className='mt-4 mb-2 text-white bg-green-600'
                        onClick={getStart}
                    >
                        Entrada
                    </button>
                    {initialLocation ? (
                        <MapComponent location={initialLocation} />
                    ) : (
                        ''
                    )}
                    <button
                        className='mt-2 text-white bg-red-600'
                        onClick={getEnd}
                    >
                        Salida
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

const ShiftRecordModal = ({
    serviceId,
    employeeId,
    onRequestClose,
    initialLocation,
    isOpen,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className='modal-content'
        >
            <ShiftRecordComponent
                serviceId={serviceId}
                employeeId={employeeId}
                onRequestClose={onRequestClose}
                initialLocation={initialLocation}
            />
        </Modal>
    );
};

export default ShiftRecordModal;
