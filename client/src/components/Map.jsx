import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
const { VITE_GOOGLE_API_KEY } = import.meta.env;
// Estilos opcionales para el mapa
const containerStyle = {
    width: '100%',
    height: '400px',
};

function MyMapComponent({ center }) {
    console.log(center);
    // Carga el script de Google Maps con la API Key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: VITE_GOOGLE_API_KEY, // Reemplaza con tu clave de API
    });

    if (!isLoaded) {
        return <div>Cargando el mapa...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10} // Nivel de zoom inicial
        >
            {/* Ejemplo de cómo añadir un marcador */}
            <Marker position={center} />
        </GoogleMap>
    );
}

export default MyMapComponent;
