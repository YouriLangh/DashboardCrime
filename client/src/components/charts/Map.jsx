/* eslint-disable react/prop-types */
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet"; // Importing Leaflet


import Legend from "../Legend";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { fetchInstances, fetchGeoJson, fetchUpdatedGeoJson } from "@/services/dataService";
import { MapLegend } from "../MapLegend";
import { toTitleCase } from "../../helpers/helpers";
import { updateGeoJson, calculateMaxCrimeCount, getColor, createDynamicColors, generateLegendDictionary } from "../../helpers/helpers";
import CustomMarker from "@/components/CustomMarker"

function Map({ allFilters, filters }) {
    const centerLA = [34.05, -118.49];
    const [geoJson, setGeoJson] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(9);
    const [updatedCrimeCounts, setUpdatedCrimeCounts] = useState({});
    const [maxCrimeCount, setMaxCrimeCount] = useState(0);
    const colors = [
        "rgba(255, 237, 160, 0.9)", // #FFEDA0
        "rgba(254, 217, 118, 0.9)", // #FED976
        "rgba(254, 178, 76, 0.9)", // #FEB24C
        "rgba(253, 141, 60, 0.9)", // #FD8D3C
        "rgba(252, 78, 42, 0.9)", // #FC4E2A
        "rgba(227, 26, 28, 0.9)", // #E31A1C
        "rgba(189, 0, 38, 0.9)", // #BD0026
        "rgba(128, 0, 38, 0.9)" // #800026
    ];
    const [instances, setInstances] = useState([]);
    const [mapBounds, setMapBounds] = useState(null);
    const [bufferedBounds, setBufferedBounds] = useState(null);
    const [legend, setLegend] = useState({})
    // Calculate and store the buffered bounds
const calculateBufferedBounds = (bounds) => {
    const bufferMargin = 0.025; // Adjust the buffer margin as needed

    // Calculate the new bounds
    const southWest = L.latLng(
        bounds.getSouthWest().lat - bufferMargin,
        bounds.getSouthWest().lng - bufferMargin
    );
    const northEast = L.latLng(
        bounds.getNorthEast().lat + bufferMargin,
        bounds.getNorthEast().lng + bufferMargin
    );

    // Create a LatLngBounds instance
    return L.latLngBounds(southWest, northEast);
};

useEffect(()=>{
    if(allFilters && allFilters.crimeTypeSet){
        const legend = generateLegendDictionary(allFilters.crimeTypeSet)
        setLegend(legend)
    }

},[allFilters])

    // Fetch initial data
    useEffect(() => {
        // Fetch geoJson data
        fetchGeoJson().then((data) => {
            setGeoJson(data);
            const maxCount = calculateMaxCrimeCount(data);
            setMaxCrimeCount(maxCount);
        });

        // Fetch instances and store buffered bounds
        if (mapBounds && zoomLevel >= 15) {
            const adjustedBounds = calculateBufferedBounds(mapBounds);
            setBufferedBounds(adjustedBounds);
            fetchInstances(filters, adjustedBounds).then((data) => {
                setInstances(data);
                
            });
        }
    }, []);

    // Fetch updated geoJson based on filters
    useEffect(() => {
        if (geoJson) {
            fetchUpdatedGeoJson(filters).then((updatedData) => {
                setUpdatedCrimeCounts(updatedData);
                const updatedGeoJson = updateGeoJson(geoJson, updatedData);
                setGeoJson(updatedGeoJson);
                setMaxCrimeCount(calculateMaxCrimeCount(updatedGeoJson));
            });
        }
    }, [filters]);

    // Event handler to track zoom level changes and get map bounds
    const MapEventsHandler = () => {
        const map = useMapEvents({
            zoomend: () => {
                setZoomLevel(map.getZoom());
                setMapBounds(map.getBounds());
            },
            moveend: () => {
                setMapBounds(map.getBounds());
            }
        });
        return null;
    };

    // Determine whether to fetch new instances from the server
    useEffect(() => {
        if (mapBounds && zoomLevel >= 15) {
            const significantChange = !bufferedBounds || !bufferedBounds.contains(mapBounds);

            if (significantChange) {
                // Recalculate buffered bounds and fetch instances
                const adjustedBounds = calculateBufferedBounds(mapBounds);
                setBufferedBounds(adjustedBounds);
                fetchInstances(filters, adjustedBounds).then((data) => {
                    setInstances(data);
                });
            }
        }
    }, [mapBounds, zoomLevel]);

    // Client-side filtering of instances within current map bounds
    const filteredInstances = instances.filter(instance => {
        if (mapBounds) {
            const lat = parseFloat(instance.LAT);
            const lon = parseFloat(instance.LON);
            return mapBounds.contains([lat, lon]);
        }
        return false;
    });


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
        fillColor: getColor(feature.properties["Crime Count"], maxCrimeCount, colors),
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7,
    });

    return (
        <div style={{ width: "100%", height: "100%", padding: "5px", position: "relative" }}>
            <MapContainer
                center={centerLA}
                zoom={9}
                minZoom={9}
                maxZoom={17}
                scrollWheelZoom={true}
                style={{ height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                
                {geoJson && zoomLevel >= 15 && (
                    <MarkerClusterGroup>
                        {/* Add markers for filtered instances */}
                        {filteredInstances.map((instance, index) => (
                            <CustomMarker
                                key={index}
                                instance={instance}
                                position={[parseFloat(instance.LAT), parseFloat(instance.LON)]}
                            >
                                {/* You can customize the popup content */}
                            </CustomMarker>
                        ))}
                    </MarkerClusterGroup>
                )}
                {geoJson && zoomLevel >= 15 && (

                   <Legend legend={legend} />
                    )}
                
                {/* Add GeoJSON layer */}
                {geoJson && zoomLevel < 15 && (
                    <GeoJSON
                        key={JSON.stringify(updatedCrimeCounts)}
                        data={geoJson}
                        style={geoJsonStyle}
                        onEachFeature={onEachFeature}
                    />
                )}
                
                {/* Add the event handler to track zoom level and get map bounds */}
                <MapEventsHandler />
            </MapContainer>
            
            {/* Add the gradient legend */}
            {geoJson && zoomLevel < 15 && <MapLegend colors={createDynamicColors(maxCrimeCount, colors)} />}
        </div>
    );
}

export default Map;
