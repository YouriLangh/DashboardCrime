export function organizeGroups(items) {
    const result = [];
    const groupMap = new Map();

    // Iterate through each item in the input array
    for (const item of items) {
        // Check if the item contains a '::' delimiter
        if (item.includes('::')) {
            // Split the item into group and subgroup
            const [group, subgroup] = item.split('::');

            // Check if the group already exists in the map
            if (!groupMap.has(group)) {
                // If the group doesn't exist, create a new array for the subgroups
                groupMap.set(group, []);
            }

            // Add the subgroup to the array associated with the group
            groupMap.get(group).push({
                submenu: item, // Include the complete hierarchy as the value field
                value: subgroup, 
            });
        } else {
            // If the item does not contain '::', it is a group without a subgroup
            // Store the item directly as a singleton in the result array
            result.push({
                value: item,
            });
        }
    }

    // Convert the groupMap entries into result array
    for (const [group, subgroups] of groupMap.entries()) {
        result.push({
            value: group,
            submenu: subgroups,
        });
    }

    // Return the result array
    return result;
}
