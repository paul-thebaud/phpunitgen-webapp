/**
 * Interface SerializerI.
 *
 * The serializer for an object to string, and inverse.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface SerializerI {
    /**
     * Serialize an object to a string.
     *
     * @param {object} object
     *
     * @returns {string}
     */
    serialize(object: object): string;

    /**
     * Deserialize a string to an object.
     *
     * @param {string} string
     *
     * @returns {object}
     */
    deserialize(string: string): object;
}
