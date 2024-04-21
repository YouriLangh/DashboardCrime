/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Filters({ filters }) {
  // Initializing state
  const [localFilterSets, setLocalFilterSets] = useState({});

  useEffect(() => {
    console.log("props in filters", filters);
    setLocalFilterSets(filters);
  }, [filters]);

  return (
    <div>
      {localFilterSets &&
        // Iterate over each key (filter set) in the filters object
        Object.keys(localFilterSets).map((key, index) => {
          // Access the filter set array corresponding to the current key
          const filterSet = localFilterSets[key];
          
          // Create a select element for the current filter set
          return (
            <select key={index}>
              {/* Iterate over the filter set array and create an option element for each item */}
              {filterSet.map((item, itemIndex) => (
                <option key={itemIndex} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          );
        })}
    </div>
  );
}

export default Filters;
