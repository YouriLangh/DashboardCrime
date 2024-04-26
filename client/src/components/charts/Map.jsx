import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import 'leaflet/dist/leaflet.css'

function Map() {
    // Example position and markers data
    const centerLA = [34.0522, -118.2437];
    const markersData = [
        { position: [51.505, -0.09], popupText: "A pretty CSS3 popup. <br /> Easily customizable." },
        { position: [51.51, -0.1], popupText: "Another marker" },
        { position: [51.515, -0.11], popupText: "Yet another marker" }
    ];

    return (
        <div style={{ width: '100%', height: '100%', padding:'5px' }}>
            <MapContainer center={centerLA} zoom={10} scrollWheelZoom={true} style={{ height: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                <MarkerClusterGroup>
                    {markersData.map((marker, index) => (
                        <Marker key={index} position={marker.position}>
                            <Popup>
                                <div dangerouslySetInnerHTML={{ __html: marker.popupText }} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}

export default Map;
