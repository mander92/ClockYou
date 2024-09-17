import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import 'leaflet/dist/leaflet.css';

const MapView = ({ location }) => {
    return (
        <>
            <MapContainer
                center={location.currentLocation}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={location.currentLocation} icon={IconLocation}>
                    <Popup>Registro de Entrada</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapView;
