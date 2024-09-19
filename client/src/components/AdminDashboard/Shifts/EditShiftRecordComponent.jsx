import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
    fetchDetailShiftRecordServices,
    fetchEditShiftRecordServices,
} from '../../../services/shiftRecordServices';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const EditShiftRecordComponent = ({ shiftRecordId, onRequestClose }) => {
    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [clockIn, setClockIn] = useState('');
    const [clockOut, setClockOut] = useState('');

    useEffect(() => {
        const getDetailShiftRecord = async () => {
            try {
                const data = await fetchDetailShiftRecordServices(
                    shiftRecordId,
                    authToken
                );
                const clockInDate = new Date(data.clockIn);
                const clockOutDate = new Date(data.clockOut);

                const formatDateToLocal = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    return `${year}-${month}-${day}T${hours}:${minutes}`;
                };

                setClockIn(formatDateToLocal(clockInDate));
                setClockOut(formatDateToLocal(clockOutDate));
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

            onRequestClose();
            navigate('/user#ProfileComponent');
        } catch (error) {
            toast.error(error.message, {
                id: 'error',
            });
        }
    };

    return (
        <>
            <section className='mx-auto flex-1024'>
                <form className='profile-form' onSubmit={handleEditShiftRecord}>
                    <fieldset>
                        <legend>{''}</legend>
                        <label htmlFor='clockin'>Entrada</label>
                        <input
                            id='clockin'
                            value={clockIn}
                            onChange={(e) => {
                                setClockIn(e.target.value);
                            }}
                            type='datetime-local'
                        />
                        <label htmlFor='clockin'>Salida</label>
                        <input
                            type='datetime-local'
                            htmlFor='clockout'
                            id='clockout'
                            value={clockOut}
                            onChange={(e) => setClockOut(e.target.value)}
                        />

                        <button className='mt-2'>Guardar</button>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

const EditShiftRecordModal = ({ isOpen, onRequestClose, shiftRecordId }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className='modal-content'
        >
            <EditShiftRecordComponent
                shiftRecordId={shiftRecordId}
                onRequestClose={onRequestClose}
            />
        </Modal>
    );
};

export default EditShiftRecordModal;
