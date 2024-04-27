/* eslint-disable react/prop-types */
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

// Function to create the gradient legend
export function MapLegend({ colors }) {
    // Define state for visibility of the legend
    const [isVisible, setIsVisible] = useState(true);

    // Function to handle closing the legend
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        isVisible ? (
            <div style={{ position: 'absolute', zIndex: 1000, top: '10px', right: '10px', padding: '10px', background: '#28282F', borderRadius: '8px', boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.2)' }}>
                {/* Close icon to hide the legend */}
                <CloseIcon onClick={handleClick} style={{ position: 'absolute', right: '5px', cursor: 'pointer' }} />
                <h4 style={{ marginTop: '28px', color: '#FFFFFF' }}>Crime Levels</h4>
                {/* Display the color scale */}
                {colors.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        {/* Color block */}
                        <div style={{ width: '16px', height: '16px', backgroundColor: item.color, marginRight: '8px' }}></div>
                        {/* Label for each color */}
                        <span style={{ color: '#FFFFFF' }}>{item.label}</span>
                    </div>
                ))}
            </div>
        ) : <div  onClick={handleClick} style={{ position: 'absolute', zIndex: 1000, top: '10px', right: '10px', padding: '10px', background: '#28282F', borderRadius: '8px', boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.2)' }}>
            <span style={{cursor:"pointer", margin:"0 0"}}>Show Legend</span>
        </div>
    );
}