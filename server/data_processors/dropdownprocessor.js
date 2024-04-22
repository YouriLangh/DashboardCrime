export function organizeGroups(menu) {
    const result = [];
    const groupMap = new Map();

    // Iterate through each item in the input array
    for (const item of menu) {
        // Check if the item contains a '::' delimiter
        if (item.includes('::')) {
            // Split the item into group and subgroup
            const [category, subCategory] = item.split('::');

            // Check if the group already exists in the map
            if (!groupMap.has(category)) {
                // If the group doesn't exist, create a new array for the subgroups
                groupMap.set(category, []);
            }

            // Add the subgroup to the array associated with the group
            groupMap.get(category).push({
                value: subCategory, 
                hierarchy: item, // Include the complete hierarchy for each item
            });
        } else {
            // If the item does not contain '::', it is a group without a subgroup
            // Store the item directly as a singleton in the result array
            result.push({
                value: item,
                hierarchy: item,
            });
        }
    }
    // Convert the groupMap entries into result array
    for (const [item, subCategories] of groupMap.entries()) {
        result.push({
            value: item,
            submenu: subCategories,
        });
    }

    // Return the result array
    return result;
}
