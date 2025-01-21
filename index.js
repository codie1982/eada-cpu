const path = require("path");
const os = require("os");
const fs = require("fs");

// 📌 package.json içindeki versiyon numarasını dinamik olarak al
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version; // Örn: "1.0.8"

// 📌 Platform, mimari ve NAPI versiyonunu belirle
const platform = os.platform(); // 'win32', 'linux', 'darwin'
const arch = os.arch(); // 'x64', 'arm64', 'ia32' vb.
const napiVersion = process.versions.napi; // Node.js’in desteklediği NAPI versiyonu

if (!napiVersion) {
    throw new Error("NAPI version not found. Ensure you are using a supported Node.js version.");
}

// 📌 Prebuilt dosya adını dinamik olarak oluştur
const binaryFileName = `eada-cpu-v${version}-napi-v${napiVersion}-${platform}-${arch}.node`;

// 📌 Dosyanın tam yolunu oluştur
const binaryPath = path.join(__dirname, "prebuilds", binaryFileName);

// 📌 Native modülü yükle
const eada = require(binaryPath);
/**
 * Adds data to the FAISS HNSW index.
 * @param {number[][]} data - A 2D array of vectors with D dimensions.
 * @returns {Promise<string>} Operation result message.
 */
function addIndex(data) {
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
function searchIndex(query, k) {
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
function loadIndexFile(filename) {
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
function saveIndexFile(filename) {
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
    addIndex,
    searchIndex,
    loadIndexFile,
    saveIndexFile
};
