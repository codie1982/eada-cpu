const path = require("path");
const binaryPath = path.join(__dirname, "prebuilds", `eada.node`);
const eada = require(binaryPath);

/**
 * Adds data to the FAISS HNSW index.
 * @param {number[][]} data - A 2D array of vectors with D dimensions.
 * @returns {Promise<string>} Operation result message.
 */
function indexKNN(data) {
    return new Promise((resolve, reject) => {
        try {
            const result = eada.indexKNN(data);
            resolve(result);
        } catch (error) {
            reject(`Error in indexKNN: ${error.message}`);
        }
    });
}

/**
 * Searches for the k nearest neighbors in the FAISS HNSW index.
 * @param {number[]} query - The vector to search (an array of D dimensions).
 * @param {number} k - Number of neighbors to return.
 * @returns {Promise<Array<{ id: number; distance: number }>>} A list of k nearest neighbors with id and distance.
 */
function searchKNN(query, k) {
    return new Promise((resolve, reject) => {
        try {
            const result = eada.searchKNN(query, k);
            resolve(result);
        } catch (error) {
            reject(`Error in searchKNN: ${error.message}`);
        }
    });
}

/**
 * Loads a saved FAISS index file.
 * @param {string} filename - The name of the index file to load.
 * @returns {Promise<string>} Operation result message.
 */
function loadIndex(filename) {
    return new Promise((resolve, reject) => {
        try {
            const result = eada.loadIndex(filename);
            resolve(result);
        } catch (error) {
            reject(`Error in loadIndex: ${error.message}`);
        }
    });
}

/**
 * Saves the current FAISS index to a file.
 * @param {string} [filename] - The name of the file to save (optional).
 * @returns {Promise<string>} Operation result message.
 */
function saveIndex(filename) {
    return new Promise((resolve, reject) => {
        try {
            const result = eada.saveIndex(filename);
            resolve(result);
        } catch (error) {
            reject(`Error in saveIndex: ${error.message}`);
        }
    });
}

module.exports = {
    indexKNN,
    searchKNN,
    loadIndex,
    saveIndex
};
