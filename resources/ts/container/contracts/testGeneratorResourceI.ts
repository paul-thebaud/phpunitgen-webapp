/**
 * The test generator resource.
 */
export type TestGenerator = {
    id: string;
    name: string;
    description: string;
    example: string;
    source: string;
};

/**
 * Interface TestGeneratorResourceI.
 *
 * The test generator resource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface TestGeneratorResourceI {
    /**
     * Retrieve one test generator.
     *
     * @param {string} id
     *
     * @returns {Promise<TestGenerator>}
     */
    find(id: string): Promise<TestGenerator>;

    /**
     * Retrieve all test generators.
     *
     * @returns {Promise<TestGenerator[]>}
     */
    all(): Promise<TestGenerator[]>;
}
