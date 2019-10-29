/**
 * The mock generator resource.
 */
export type MockGenerator = {
    id: string,
    name: string,
    description: string,
    website: string,
    author: {
        name: string,
        website: string,
    },
};

/**
 * Interface MockGeneratorResourceI.
 *
 * The mock generator resource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface MockGeneratorResourceI {
    /**
     * Retrieve all mock generators.
     *
     * @returns {Promise<MockGenerator[]>}
     */
    all(): Promise<MockGenerator[]>;
}
