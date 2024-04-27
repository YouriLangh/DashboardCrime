/* eslint-disable react/prop-types */

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

export function renderHourlyTooltip ({ active, payload, label }){
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip' style={{ backgroundColor: "#f5f5f5", borderRadius: "5px", padding: "5px", fontSize: "14px", fontWeight: '800', color: "black" }}>
                <p>{`${label % 12 === 0 ? 12 : label % 12}${label < 12 ? 'am' : 'pm'}`}</p>
                <p className='label'>crime: {payload[0].value}</p>
            </div>
        );
    }
    return null;
}

export function renderMonthlyTooltip ({ active, payload, label }){
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip' style={{ backgroundColor: "#f5f5f5", borderRadius: "5px", padding: "5px", fontSize: "14px", fontWeight: '800', color: "black" }}>
                <p>{label}</p>
                <p className='label'>crime: {payload[0].value}</p>
            </div>
        );
    }
    return null;
}

