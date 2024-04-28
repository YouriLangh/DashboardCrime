/* eslint-disable react/prop-types */
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { fetchGeoJson, fetchUpdatedGeoJson } from "@/services/dataService";
import { toTitleCase } from "../../helpers/helpers";
import { MapLegend } from "../MapLegend";
import { updateGeoJson, calculateMaxCrimeCount, getColor, createDynamicColors } from "../../helpers/helpers";

function Map({ filters }) {
    const centerLA = [34.05, -118.49];
    const [geoJson, setGeoJson] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(9);
    const [updatedCrimeCounts, setUpdatedCrimeCounts] = useState({});
    const [maxCrimeCount, setMaxCrimeCount] = useState(0);

    useEffect(() => {
        // Initial fetch of geoJson data
        fetchGeoJson().then((data) => {
            setGeoJson(data);
            // Calculate the new maximum crime count and set state
            const maxCount = calculateMaxCrimeCount(data);
            setMaxCrimeCount(maxCount);
        });
    }, []);

    useEffect(() => {
        // Fetch updated geoJson based on filters
        if (geoJson) {
            fetchUpdatedGeoJson(filters).then((updatedData) => {
                setUpdatedCrimeCounts(updatedData);
                const updatedGeoJson = updateGeoJson(geoJson, updatedData);
                setGeoJson(updatedGeoJson);
                setMaxCrimeCount(calculateMaxCrimeCount(updatedGeoJson));
            });
        }
    }, [filters]);

    // Function to add tooltip to each feature
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.APREC && feature.properties["Crime Count"] !== undefined) {
            const districtName = toTitleCase(feature.properties.APREC);
            const crimeCount = feature.properties["Crime Count"];
            const tooltipContent = `District: ${districtName}<br>Crime Count: ${crimeCount}`;
            layer.bindTooltip(tooltipContent);
        }
    };

    // Style function for GeoJSON layer
    const geoJsonStyle = (feature) => ({
        fillColor: getColor(feature.properties["Crime Count"], maxCrimeCount),
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7,
    });

    // Event handler to track zoom level changes
    const MapEventsHandler = () => {
        const map = useMapEvents({
            zoomend: () => {
                setZoomLevel(map.getZoom());
            },
        });
        return null;
    };

    return (
        <div style={{ width: "100%", height: "100%", padding: "5px", position: "relative" }}>
            <MapContainer
                center={centerLA}
                zoom={9}
                minZoom={9}
                maxZoom={16}
                scrollWheelZoom={true}
                style={{ height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                
                <MarkerClusterGroup>
                    {/* Add your markers here */}
                </MarkerClusterGroup>
                
                {/* Add GeoJSON layer */}
                {geoJson && zoomLevel < 13 && (
                    <GeoJSON
                        key={JSON.stringify(updatedCrimeCounts)}
                        data={geoJson}
                        style={geoJsonStyle}
                        onEachFeature={onEachFeature}
                    />
                )}
                
                {/* Add the event handler to track zoom level */}
                <MapEventsHandler />
            </MapContainer>
            
            {/* Add the gradient legend */}
            {geoJson && zoomLevel < 13 && <MapLegend colors={createDynamicColors(maxCrimeCount)} />}
        </div>
    );
}

export default Map;
