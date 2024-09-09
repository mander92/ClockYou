import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { fetchDetailServiceService } from '../services/serviceServices.js';

const DetailService = () => {
    const { serviceId } = useParams();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState({});

    useEffect(() => {
        const DetailService = async () => {
            try {
                const data = await fetchDetailServiceService(
                    serviceId,
                    authToken
                );

                setData(data.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        DetailService();
    }, [serviceId, authToken]);

    console.log(data);

    return (
        <>
            <h1>{data.TipoServicio}</h1>
            <h3>{data.Estado}</h3>
            <h3>{data.Provincia}</h3>
            <h3>{data.PrecioHora}</h3>
            <h3>{data.HorasContratadas}</h3>
            <h3>{data.PrecioTotal}</h3>
            <h3>{data.DíaHora}</h3>
            <h3>{data.Dirección}</h3>
            <h3>{data.CP}</h3>
            <h3>{data.Ciudad}</h3>
            <h3>{data.Comentarios}</h3>
            <h3>{data.Email}</h3>
            <h3>{data.Nombre}</h3>
            <h3>{data.Apellidos}</h3>
            <h3>{data.Teléfono}</h3>
        </>
    );
};

export default DetailService;
