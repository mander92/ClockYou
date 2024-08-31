import { useState } from "react"

const NewServiceForm = ({ id }) => {
const [ date, setDate ] = useState({})
    const handleForm = (e) =>{
        e.preventDefault()

    }

    console.log(id)
    console.log(date)

    return(
        <>

            <form onSubmit={handleForm}>
            <label htmlFor="fechaYhora">Elige fecha y Hora</label>
            <input 
            type="datetime" //este tipo de campo no funciona
            id='fechaYhora'
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            />

            <button>Enviar</button>
            </form>
        </>
        
    )
}

export default NewServiceForm