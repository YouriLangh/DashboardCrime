// This function creates a dictionary where each crime contains the value (name) and the total hierarchy to get to that element
// If the crime has subcategories, it will include a submenu rather than a hierarchy
export function organizeGroups(menu) {
    const result = [];
    const groupMap = new Map();

    // Iterate through each item in the input array
    for (const item of menu) {
        // Check if the item contains a '::' delimiter
        if (item.includes('::')) {
            // Split the item into category and subCategory
            const [category, subCategory] = item.split('::');

            // Check if the category already exists in the map
            if (!groupMap.has(category)) {
                // If the category doesn't exist, create a new array for the subCategories
                groupMap.set(category, []);
            }

            // Add the subCategory to the array associated with the category
            groupMap.get(category).push({
                value: subCategory, 
                hierarchy: item, // Include the complete hierarchy for each item
            });
        } else {
            // If the item does not contain '::', it is a category without a subCategory
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
