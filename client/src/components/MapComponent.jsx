import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IconLocationComponent } from './IconLocationComponent.jsx';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ location }) => {
    console.log('Location prop:', location);

    // Verifica que location tenga el formato correcto
    if (!location || !Array.isArray(location) || location.length !== 2) {
        return <div>Localización no disponible</div>;
    }

    return (
        <MapContainer center={location} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={location} icon={IconLocationComponent}>
                <Popup>Ubicación</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
