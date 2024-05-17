/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { hashToColorAndShape } from '../helpers/helpers';

// Custom marker component that displays a popup with crime information on the map
const CustomMarker = ({ instance, mapBounds, position }) => {
    const [crimeDesc, setCrimeDesc] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [areaName, setAreaName] = useState('');
    const [victimAge, setVictimAge] = useState('');
    const [descent, setDescent] = useState('');

    // Update the state variables based on the instance prop
    useEffect(() => {
        if (instance) {
            let crime = instance["Crm Cd Desc"];
            // Split crime description if it contains "::"
            if (crime.includes("::")) {
                crime = crime.split("::")[1];
            }
            setCrimeDesc(crime);

            // Update the date and time
            const dateTime = new Date(instance["DATETIME OCC"]);
            setDate(dateTime.toLocaleDateString()); // Store date in the local date format
            setTime(dateTime.toLocaleTimeString()); // Store time in the local time format

            // Update the other fields
            setAreaName(instance["AREA NAME"]);
            setVictimAge(instance["Vict Age"]);
            setDescent(instance["Vict Descent"]);
        }
    }, [instance]);

    // Only render the marker if the position is within the map bounds
    if (mapBounds && !mapBounds.contains(position)) {
        return null;
    }

    // Hash the crime description to generate a color and shape for the marker
    const { color, shape } = hashToColorAndShape(crimeDesc);

    // Generate the SVG icon based on the shape
    const generateIconSvg = (shape, color) => {
        let svg = '';
        switch (shape) {
            case 'circle':
                svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='16' fill='${color}' /></svg>`;
                break;
            case 'square':
                svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect x='8' y='8' width='16' height='16' fill='${color}' /></svg>`;
                break;
            case 'triangle':
                svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><polygon points='16,4 32,28 0,28' fill='${color}' /></svg>`;
                break;
            default:
                svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='16' fill='${color}' /></svg>`;
                break;
        }
        return svg;
    };

    // Create a custom icon with the generated shape and color
    const iconSvg = generateIconSvg(shape, color);
    const customIcon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(iconSvg)}`, // Inline SVG icon with color and shape
        iconSize: [32, 32], // Set the icon size (width, height)
        iconAnchor: [16, 32], // Set the icon anchor (x, y) relative to the icon's center
        popupAnchor: [0, -32], // Set the popup anchor (x, y) relative to the icon's center
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup autoPan={false}>
                <div>
                    <strong>{crimeDesc}</strong><br />
                    <span>Date: {date}<br />
                        Time: {time}<br />
                        Area: {areaName}<br />
                        <hr></hr>
                        </span>
                    <p>
                        <strong>Victim Information:</strong><br />
                        Victim Age: {victimAge}<br />
                        Victim Descent: {descent}<br />
                    </p>
                </div>
            </Popup>
        </Marker>
    );
};

export default CustomMarker;