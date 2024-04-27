export function preprocessEthnicityData(data) {
    // Calculate the total value
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    // Initialize the new data array and a variable for the 'Others' slice
    let newData = [];
    let othersValue = 0;
    let othersDetails = [];

    // Iterate over the data and categorize the values
    data.forEach(entry => {
        const percentage = (entry.value / total) * 100;

        // If the percentage is less than 6%, add the value to 'Others'
        if (percentage < 6) {
            othersValue += entry.value;
            // Store the details for the 'Others' slice
            othersDetails.push(`${entry.name}: ${entry.value}`);
        } else {
            newData.push(entry);
        }
    });

    // If there is a non-zero 'Others' value, add it as a new entry
    if (othersValue > 0) {
        newData.push({ name: 'Others', value: othersValue, details: othersDetails });
    }

    return newData;
}