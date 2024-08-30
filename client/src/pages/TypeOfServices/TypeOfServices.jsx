import { useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env;
import './typeOfServices.css'


const Services = () => {
    const [data , setData ] = useState([]);

    useEffect(() => {

        const fectData = async () => {
            try {
            const res = await fetch(`${VITE_API_URL}/typeOfServices`);

            if(!res.ok){
                throw new Error('ERRRROROOROROORORORR')
            };
    
            const body = await res.json();

            setData(body.data)
    
            } catch (error) {
                console.log(error)
            }
            
        }

        fectData()

    },[]);



    const filterCities = data.map(item=>item.city);
    const citiesNoRepeated = [];
    for(let i = 0; i < filterCities.length; i++){
        if(!citiesNoRepeated.includes(filterCities[i])){
            citiesNoRepeated.push(filterCities[i])
        }
    };

    const filterTypeOfService = data.map(item=>item.type);
    const typeNoRepeated = [];
    for(let i = 0; i < filterTypeOfService.length; i++){
        if(!typeNoRepeated.includes(filterTypeOfService[i])){
            typeNoRepeated.push(filterTypeOfService[i])
        }
    };


    return (
        <div className='container'>
        <h2>Servicios</h2>

            <div>

                <div>

                    <form >

                        <label htmlFor='Ciudad'>Ciudad</label>
                        <select name="Ciudad" id="Ciudad">
                            {citiesNoRepeated.map((city)=>{
                                return <option key={city} value={city}>{city}</option>
                            })}
                        </select>

                        <label htmlFor='TipoDeServicio'>Tipo de Servicio</label>
                        <select name="TipoDeServicio" id="TipoDeServicio">
                            {typeNoRepeated.map((type)=>{
                                    return <option key={type} value={type}>{type}</option>
                                })}
                        </select>


                        <label htmlFor='Ordenar por'>Ordenar por</label>
                        <select name="radio" id="Ordenar por">
                            <option value="ASC">Ascente</option>
                            <option value="DES">Descente</option>
                        </select>
                        <button>Buscar</button>        

                    </form>

                </div>
        
                <div>

                    <ul>
                        {data.map((item)=>{
                            return <li key={item.id}>
                                <img src="404.png" alt="oishbvoi" />
                                <h3>{item.type}</h3>
                                <p>{item.city}</p>
                                <p>{item.description}</p>
                                <p>{item.price}</p>
                                <a href={`${VITE_API_URL}/typeOfServices/${item.id}`}><button>Ver</button></a> 
                            </li>
                        })}
                    </ul>
                </div>
            
            </div>
        </div>
    )
}

export default Services;