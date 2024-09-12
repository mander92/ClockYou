const MapView = () => {
    return (
        <>
            <MapContainer
                center={[37.19243432714087, -5.813902940369889]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[37.19243432714087, -5.813902940369889]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapView;
