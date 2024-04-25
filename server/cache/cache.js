// Define an in-memory cache object
const cache = {};

// Method to get data from the cache
function get(key) {
    console.log("got something from cache on: ", key)
    return cache[key];
}

// Method to set data in the cache
function set(key, value) {

    cache[key] = value;
}

// Method to check if data exists in the cache
function has(key) {
    return cache.hasOwnProperty(key);
}

// Export the cache utility functions
export default {
    get,
    set,
    has,
};
