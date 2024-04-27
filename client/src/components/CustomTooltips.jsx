
export function renderEthnicityTooltip({ active, payload }, data, colors) {
    if (active && payload && payload.length) {
        // Extract the name, value, and index from the payload
        const { name, value, payload: payloadData} = payload[0];
        const index = data.findIndex((ethn) => ethn.name === name);
        const sliceColor = colors[index % colors.length];
        // Check if the slice is 'Others' and has details
        if (name === 'Others' && payloadData.details) {
            // Return the custom tooltip content
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', color: 'black', padding: '8px', borderRadius: '4px' }}>
                    <p><strong style={{ color: sliceColor }}>{name}: {value}</strong></p>
                    <hr style={{ margin: '4px 0', border: '1px solid #ccc' }} />
                    {/* List each detail as a separate paragraph with its percentage */}
                    {payloadData.details.map((detail, detailIndex) => {
                        // Split the detail into the name and value
                        const [detailName, detailValue] = detail.split(': ').map(part => part.trim());

                        // Convert the detail value to a number
                        const detailNumericValue = parseFloat(detailValue);

                        // Calculate the percentage of each detail based on the total value of 'Others'
                        const detailPercentage = (detailNumericValue / value) * 100;

                        return (
                            <p key={detailIndex} style={{ margin: 0 }}>
                                <strong>
                                    {detailName}: {detailValue} ({detailPercentage.toFixed(2)}%)
                                </strong>
                            </p>
                        );
                    })}
                </div>
            );
        } else {
            // Default tooltip content for other slices
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', color: 'black', padding: '8px', borderRadius: '4px' }}>
                    <p><strong style={{ color: sliceColor }}>{name}: {value}</strong></p>
                </div>
            );
        }
    }

    return null;
}
