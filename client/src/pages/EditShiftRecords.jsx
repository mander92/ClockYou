import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { fetchGetDetailShihtRecordService } from '../services/shiftRecordServices';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EditShiftRecord = () => {
    const { shiftRecordId } = useParams();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState('');
    // const [mapaActual, setMapaActual] = useState(null);

    useEffect(() => {
        const getDetailShiftRecord = async () => {
            try {
                const data = await fetchGetDetailShihtRecordService(
                    shiftRecordId,
                    authToken
                );

                setData(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        getDetailShiftRecord();
    }, []);

    console.log(data);

    // const mapContainerStyle = {
    //     width: '80%',
    //     height: '250px',
    //     margin: '15px auto',
    // };

    const entrada = new Date(data.clockIn).toLocaleString();
    const salida = new Date(data.clockOut).toLocaleString();
    return (
        <>
            <h1>{`${data.firstName} ${data.lastName}`}</h1>
            <h3>{`${data.type}`}</h3>
            <h4>{`${data.address}, ${data.city}`}</h4>

            <p>{entrada}</p>
            <p>{salida}</p>

            <p>{data.comments}</p>
            <p>{data.dni}</p>
            <p>{data.email}</p>
            <p>{data.hours}</p>
            <p>{data.description}</p>
            <img src={data.image} alt={data.firstName} />
            <p>{data.job}</p>
            <p>{data.phone}</p>

            <form action=''>
                <label htmlFor=''></label>
                <input type='datetime-local' />
                <label htmlFor=''></label>
                <input type='datetime-local' />
                <button></button>
            </form>

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
