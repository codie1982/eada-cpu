const eada = require("bindings")("eada");

/**
 * EADA-CPU: FAISS-based high-performance KNN search for Node.js
 */
module.exports = {
  /**
   * Create a new index and add data.
   * @param {number[][]} data A 2D array where each row is a vector.
   * @returns {boolean} True if indexing is successful.
   */
  indexKNN: (data) => {
    if (!Array.isArray(data) || !data.length) {
      throw new Error("Invalid input: Expected a 2D array of vectors.");
    }
    return eada.indexKNN(data);
  },

  /**
   * Perform KNN search on the indexed data.
   * @param {number[]} queryVector The input query vector.
   * @param {number} k The number of nearest neighbors to find.
   * @returns {Object[]} An array of nearest neighbors with {id, distance}.
   */
  searchKNN: (queryVector, k) => {
    if (!Array.isArray(queryVector) || queryVector.length === 0) {
      throw new Error("Invalid query: Expected a vector as input.");
    }
    if (typeof k !== "number" || k <= 0) {
      throw new Error("Invalid k: Expected a positive integer.");
    }
    return eada.searchKNN(queryVector, k);
  },

  /**
   * Load an existing FAISS index from a file.
   * @param {string} filePath Path to the index file.
   * @returns {boolean} True if the index was successfully loaded.
   */
  loadIndex: (filePath) => {
    if (typeof filePath !== "string" || filePath.trim() === "") {
      throw new Error("Invalid file path.");
    }
    return eada.loadIndex(filePath);
  },

  /**
   * Save the current index to a file.
   * @param {string} filePath Path to save the index file.
   * @returns {boolean} True if the index was successfully saved.
   */
  saveIndex: (filePath) => {
    if (typeof filePath !== "string" || filePath.trim() === "") {
      throw new Error("Invalid file path.");
    }
    return eada.saveIndex(filePath);
  },
};
