import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IconLocationComponent } from './IconLocationComponent.jsx';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ location }) => {
    return (
        <>
            <MapContainer
                center={location.currentLocation}
                zoom={17}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker
                    position={location.currentLocation}
                    icon={IconLocationComponent}
                >
                    <Popup>Registro de Entrada</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapComponent;
