import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTypeOfService } from '../services/typeOfServiceServices';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;


const EditService = () => {
    const { typeOfServiceId } = useParams();
    const [data, setData] = useState(null);
    const [description, setDescription] = useState(data?.description || '');
    const [price, setPrice] = useState(data?.price || '')

    const {authToken} = useContext(AuthContext);
    const navigate = useNavigate()


    useEffect(() => {
        const getTypeOfService = async () => {
            try {
                const data = await fetchTypeOfService(typeOfServiceId);
                setData(data);
            } catch (error) {
                toast.error(error.message, {
                    id: 'error',
                });
            }
        };

        getTypeOfService();
    }, [typeOfServiceId]);

    const handleEditService = async (e) => {
        try {
            e.preventDefault()

            const res = await fetch(`${VITE_API_URL}/typeOfServices/${typeOfServiceId}`,{
                method: 'PUT',
                headers: authToken? {
                    Authorization : authToken,
                    'Content-Type': 'application/json'
                }:{},
                body: JSON.stringify({
                    description,
                    price
                })
            })

            const body = await res.json()

            toast.success(body.message)

            setData(body)

            navigate('/user#services')



        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeleteService = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/typeOfServices/${typeOfServiceId}`,{
                method: 'DELETE',
                headers: authToken? {
                    Authorization : authToken,
                    'Content-Type': 'application/json'
                }:{}})

            const body = await res.json()

            toast.success(body.message)

            navigate('/user#services')

        } catch (error) {
            toast.error(error.message)
        }
    }


    return(
        <>

        <section className='container'>
            <h1>{data?.type}</h1>
            <img
                src={`${VITE_API_URL}/${data?.image}`}
                alt={`${data?.description}`}
            />
            <h2>{data?.description}</h2>
            <h2>{data?.price}€</h2>
            
        

        <form className='form' onSubmit={handleEditService}>
            <label htmlFor="description">Descripción</label>
            <input 
            id='description'
            type="text" 
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            placeholder={data?.description}
            required
            />

            <label htmlFor="description">Precio</label>
            <input 
            type="number" 
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            placeholder={data?.price}
            required
            />

            <button>enviar</button>

            </form>

            <button onClick={handleDeleteService}>Eliminar Servicio</button>

        </section> 

        </>
    )
}

export default EditService;