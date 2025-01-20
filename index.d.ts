declare module "EADA" {
    /**
     * Adds data to the FAISS HNSW index.
     * @param data - A 2D array of vectors with D dimensions.
     * @returns Operation result message.
     */
    export function indexKNN(data: number[][]): Promise<string>;

    /**
     * Searches for the k nearest neighbors in the FAISS HNSW index.
     * @param query - The vector to search (an array of D dimensions).
     * @param k - Number of neighbors to return.
     * @returns A list of k nearest neighbors with id and distance.
     */
    export function searchKNN(query: number[], k: number): Promise<Array<{ id: number; distance: number }>>;

    /**
     * Loads a saved FAISS index file.
     * @param filename - The name of the index file to load.
     * @returns Operation result message.
     */
    export function loadIndex(filename: string): Promise<string>;

    /**
     * Saves the current FAISS index to a file.
     * @param filename - The name of the file to save (optional).
     * @returns Operation result message.
     */
    export function saveIndex(filename?: string): Promise<string>;
}
