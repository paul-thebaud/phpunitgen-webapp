/**
 * Interface ApiClientI.
 *
 * The API HTTP client.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface ApiClientI {
    /**
     * Send a GET request.
     *
     * @param {string} endpoint
     *
     * @returns {Promise<object>}
     */
    get(endpoint: string): Promise<object>;

    /**
     * Send a post request.
     *
     * @param {string} endpoint
     * @param {object} data
     *
     * @returns {Promise<object>}
     */
    post(endpoint: string, data: object): Promise<object>;
}
