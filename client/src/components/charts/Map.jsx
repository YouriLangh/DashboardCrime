import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    Popup,
    useMapEvents,
  } from "react-leaflet";
  import MarkerClusterGroup from "react-leaflet-cluster";
  import "leaflet/dist/leaflet.css";
  import { useEffect, useState } from "react";
  import { fetchGeoJson, fetchUpdatedGeoJson } from "@/services/dataService";
  import { toTitleCase } from "../../helpers/helpers";
  import { MapLegend } from "../MapLegend";
  import { updateGeoJson } from "../../helpers/helpers";
  
  const getColor = (value) => {
    // Color scale function for crime count
    return value > 8000 ? "#800026" : value > 7000 ? "#BD0026" : value > 6000 ? "#E31A1C" : value > 5000 ? "#FC4E2A" : value > 4000 ? "#FD8D3C" : value > 3000 ? "#FEB24C" : value > 2000 ? "#FED976" : "#FFEDA0";
  };
  
  const colors = [
    { color: "#800026", label: ">8000" },
    { color: "#BD0026", label: ">7000" },
    { color: "#E31A1C", label: ">6000" },
    { color: "#FC4E2A", label: ">5000" },
    { color: "#FD8D3C", label: ">4000" },
    { color: "#FEB24C", label: ">3000" },
    { color: "#FED976", label: ">2000" },
    { color: "#FFEDA0", label: "<2000" },
  ];
  
  function Map({ filters }) {
    const centerLA = [34.05, -118.49];
    const [geoJson, setGeoJson] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(9);
    const [updatedCrimeCounts, setUpdatedCrimeCounts] = useState({})
    useEffect(() => {
      // Initial fetch of geoJson data
      fetchGeoJson().then(setGeoJson);
    }, []);
    
    useEffect(() => {
      // Fetch updated geoJson based on filters
      if (geoJson) {
        fetchUpdatedGeoJson(filters).then((updatedData) => {
            setUpdatedCrimeCounts(updatedData)
          const updatedGeoJson = updateGeoJson(geoJson, updatedData);
          setGeoJson(updatedGeoJson);
        });
      }
    }, [filters]);
    
    // Style function for GeoJSON layer
    const geoJsonStyle = (feature) => ({
      fillColor: getColor(feature.properties["Crime Count"]),
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
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
            {geoJson && zoomLevel < 13 && <MapLegend colors={colors} />}
        </div>
    );
}
  
  export default Map;
  