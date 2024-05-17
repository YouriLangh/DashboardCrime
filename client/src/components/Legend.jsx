/* eslint-disable react/prop-types */
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getShapeClipPath } from "@/helpers/helpers";

// Define the Legend component for the map which will show an overview of all the crimes and the corresponding shape
const Legend = ({ legend }) => {
  // Define state for visibility of the legend
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle closing the legend
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    // Display the legend if it is visible, otherwise display a button to show it
      isVisible ? (
        <div id="legend" className="legend">
          <CloseIcon
            onClick={handleClick}
            style={{ position: "absolute", right: "5px", cursor: "pointer" }}
          />
          {Object.entries(legend).map(([crime, iconDetails], index) => (
            <div key={index} className="legend-row">
              {/* Display the icon */}
              <div
                className="legend-icon"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: iconDetails.color,
                  clipPath: getShapeClipPath(iconDetails.shape),
                }}
              />
              {/* Display the crime description, but crop if it if gets too long*/}
              <span className="legend-text">
                {crime.substring(0, 25).concat("...")}
              </span>
            </div>
          ))}{" "}
        </div>
      ) : (
        <div className="show-legend" onClick={handleClick}>
          <span style={{ cursor: "pointer", margin: "0 0" }}>
            <strong>Show Legend</strong>
          </span>
        </div>
      )

  );
};

// Export the Legend component
export default Legend;
