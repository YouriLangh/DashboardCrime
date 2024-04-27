import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { fetchGeoJson } from "@/services/dataService";

function Map() {
    const centerLA = [34.05, -118.49]; // Adjusted longitude to center the map more towards Santa Monica

    const [geoJson, setGeoJson] = useState(null);
    const markersData = [
        { position: [51.505, -0.09], popupText: "A pretty CSS3 popup. <br /> Easily customizable." },
        { position: [51.51, -0.1], popupText: "Another marker" },
        { position: [51.515, -0.11], popupText: "Yet another marker" }
    ];

    useEffect(() => {
        fetchGeoJson().then((res) => {
            setGeoJson(res);
        });
    }, []);

    // Define a color scale function based on crime count for the year 2023
    const getColor = (value) => {
        return value > 8000 ? '#800026' :
               value > 7000 ? '#BD0026' :
               value > 6000 ? '#E31A1C' :
               value > 5000 ? '#FC4E2A' :
               value > 4000 ? '#FD8D3C' :
               value > 3000 ? '#FEB24C' :
               value > 2000 ? '#FED976' :
                              '#FFEDA0';
    };

    // Style function for the GeoJSON layer
    const geoJsonStyle = (feature) => ({
        fillColor: getColor(feature.properties[2023]), // Use crime count for the year 2023
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    });

    // Event handler function to display tooltip with the 'APREC' value on hover
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.APREC) {
            const districtName = feature.properties.APREC;
            layer.bindTooltip(`District: ${districtName}`);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', padding: '5px' }}>
            <MapContainer center={centerLA} zoom={9} scrollWheelZoom={true} style={{ height: '100%' }}>
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
                
                {/* Add GeoJSON layer as a choropleth map */}
                {geoJson && (
                    <GeoJSON
                        data={geoJson}
                        style={geoJsonStyle}
                        // onEachFeature={onEachFeature} // Bind the tooltip to each feature
                    />
                )}
            </MapContainer>
        </div>
    );
}

export default Map;
