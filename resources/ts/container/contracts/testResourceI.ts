/**
 * The result of a test resource creation.
 */
export type Test = {
    name: string,
    code: string
    executionTime: number,
};

/**
 * Interface TestResourceI.
 *
 * The test resource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface TestResourceI {
    /**
     * Create a new test using the given code.
     *
     * @param {string} code
     *
     * @returns {Promise<Test>}
     */
    create(code: string): Promise<Test>;
}
