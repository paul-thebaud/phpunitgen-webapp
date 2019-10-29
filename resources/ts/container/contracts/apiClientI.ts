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
     *
     * @param {string} endpoint
     *
     * @returns {Promise<any>}
     */
    get(endpoint: string): Promise<any>;

    /**
     *
     * @param {string} endpoint
     * @param {any} data
     *
     * @returns {Promise<any>}
     */
    post(endpoint: string, data: any): Promise<any>;
}
