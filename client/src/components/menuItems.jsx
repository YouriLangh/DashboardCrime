import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function MenuItems({ options, depthLevel, initFilter }) {
  // Main dropdown state
  const [selectedMainItem, setSelectedMainItem] = useState('');
  
  // Nested dropdown state
  const [selectedNestedItem, setSelectedNestedItem] = useState('');

  // Define the structure of your data
  

  // Handle main dropdown change
  const handleMainChange = (event) => {
    setSelectedMainItem(event.target.value);
    // Reset the nested dropdown state when main dropdown changes
    setSelectedNestedItem('');
  };

  // Handle nested dropdown change
  const handleNestedChange = (event) => {
    setSelectedNestedItem(event.target.value);
  };

  // Find the selected main option's nested options
  const selectedNestedOptions = options.find(
    (option) => option.value === selectedMainItem
  )?.nestedOptions;

  return (
    <div style={{ padding: '20px' }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="main-dropdown-label">Main Option</InputLabel>
        <Select
          labelId="main-dropdown-label"
          id="main-dropdown"
          value={selectedMainItem}
          onChange={handleMainChange}
          label="Main Option"
        >
          {/* Map over the options to create MenuItem components */}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render nested dropdown if there are nested options */}
      {selectedNestedOptions && (
        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="nested-dropdown-label">Nested Option</InputLabel>
          <Select
            labelId="nested-dropdown-label"
            id="nested-dropdown"
            value={selectedNestedItem}
            onChange={handleNestedChange}
            label="Nested Option"
          >
            {/* Map over the nested options to create MenuItem components */}
            {selectedNestedOptions.map((nestedOption) => (
              <MenuItem key={nestedOption.value} value={nestedOption.value}>
                {nestedOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Display the selected options */}
      <p>Main Option: {selectedMainItem}</p>
      <p>Nested Option: {selectedNestedItem}</p>
    </div>
  );
};

export default MenuItems;
