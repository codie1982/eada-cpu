/** Search result object. */
export interface SearchResult {
    /** Distances of the nearest neighbors found, size n*k. */
    distances: number[];
    /** Labels of the nearest neighbors found, size n*k. */
    labels: number[];
}

/**
 * FAISS-based KNN Search API
 */
export declare class EadaCPU {
    /**
     * Creates an index with given dimensions.
     * @param {number} dims The number of dimensions for the vector.
     */
    constructor(dims: number);

    /**
     * Adds vectors to the index.
     * @param {number[][]} vectors A 2D array of vectors to add.
     */
    add(vectors: number[][]): void;

    /**
     * Performs a KNN search on the index.
     * @param {number[]} queryVector The input vector for search.
     * @param {number} k The number of nearest neighbors to find.
     * @returns {SearchResult} The search result with distances and labels.
     */
    search(queryVector: number[], k: number): SearchResult;

    /**
     * Saves the index to a file.
     * @param {string} filePath Path to save the index file.
     */
    saveIndex(filePath: string): void;

    /**
     * Loads the index from a file.
     * @param {string} filePath Path to load the index file from.
     */
    loadIndex(filePath: string): void;
}
