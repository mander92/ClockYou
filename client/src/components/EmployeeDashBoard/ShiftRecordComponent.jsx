import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    fetchClockInShiftRecordServices,
    fetchClockOutShiftRecordServices,
} from '../../services/shiftRecordServices';
import toast from 'react-hot-toast';
import MapComponent from '../MapComponent';
import Modal from 'react-modal';

const ShiftRecordComponent = ({
    shiftRecordId,
    onRequestClose,
    initialLocation,
}) => {
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [location, setLocation] = useState({
        currentLocation: initialLocation || { lat: '', lng: '' },
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

    const getStart = async (e) => {
        e.preventDefault();
        const clockIn = new Date();
        try {
            const location = await getLocation();
            setLocation({ currentLocation: location });
            const data = await fetchClockInShiftRecordServices(
                authToken,
                clockIn,
                location,
                shiftRecordId
            );

            toast.success(data.message, {
                id: 'ok',
            });
            onRequestClose();
            navigate('/user#ProfileComponent');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    const getEnd = async (e) => {
        e.preventDefault();
        const clockOut = new Date();
        try {
            const data = await fetchClockOutShiftRecordServices(
                authToken,
                clockOut,
                shiftRecordId
            );

            toast.success(data.message, {
                id: 'ok',
            });
            onRequestClose();
            navigate('/user#ProfileComponent');
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
                <MapComponent location={location} />
                <button className='mt-2 text-white bg-red-600' onClick={getEnd}>
                    Registrar Salida
                </button>
            </fieldset>
        </form>
    );
};

const ShiftRecordModal = ({
    isOpen,
    onRequestClose,
    shiftRecordId,
    initialLocation,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className='modal-content'
        >
            <ShiftRecordComponent
                shiftRecordId={shiftRecordId}
                onRequestClose={onRequestClose}
                initialLocation={initialLocation}
            />
        </Modal>
    );
};

export default ShiftRecordModal;
