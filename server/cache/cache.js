// Define an in-memory cache object that implements a Least Recently Used (LRU) cache algorithm
const cache = {};

// Define a list to track access order
const accessOrder = [];

// Set a limit for the cache size
const cacheLimit = 10;

// Method to get data from the cache
function get(key) {
    if (cache.hasOwnProperty(key)) {
        // Update the access order
        moveToFrontOfAccessOrder(key);
        return cache[key];
    }
    return null;
}

// Method to set data in the cache
function set(key, value) {
    // If the key is already in the cache, update the value and access order
    if (cache.hasOwnProperty(key)) {
        cache[key] = value;
        moveToFrontOfAccessOrder(key);
    } else {
        // If the cache is full, remove the least recently used item
        if (accessOrder.length >= cacheLimit) {
            const leastUsedKey = accessOrder.pop(); // Remove the least recently used key
            delete cache[leastUsedKey]; // Delete the key from the cache
        }

        // Add the new key-value pair to the cache and access order
        cache[key] = value;
        accessOrder.unshift(key);
    }
}

// Method to check if data exists in the cache
function has(key) {
    return cache.hasOwnProperty(key);
}

// Method to generate cache key from item
function generateCacheKey(item) {
    return JSON.stringify(item);
}

// Method to move a key to the front of the access order
function moveToFrontOfAccessOrder(key) {
    const index = accessOrder.indexOf(key);
    if (index > -1) {
        accessOrder.splice(index, 1); // Remove the key from its current position
        accessOrder.unshift(key); // Add the key to the front of the list
    }
}

// Export the cache utility functions
export default {
    get,
    set,
    has,
    generateCacheKey
};
