/**
 * Interface GoogleAnalyticsI.
 *
 * The GoogleAnalytics helpers methods.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface GoogleAnalyticsI {
    /**
     * Check if GoogleAnalytics is configured.
     *
     * @returns {boolean}
     */
    isConfigured(): boolean;

    /**
     * Retrieve the application ID.
     *
     * @returns {string}
     */
    getApplicationId(): string;

    /**
     * Tells if GoogleAnalytics has been accepted/refused.
     *
     * @returns {boolean}
     */
    isChecked(): boolean;

    /**
     * Tells if GoogleAnalytics has been accepted.
     *
     * @returns {boolean}
     */
    isAccepted(): boolean;

    /**
     * Accept GoogleAnalytics.
     */
    accept(): void;

    /**
     * Accept GoogleAnalytics.
     */
    refuse(): void;

    /**
     * Bootstrap and trigger "pageview" for Google Analytics.
     */
    activate(): void;

    /**
     * Emit the event "Code generation request" when activated.
     * Choose event name if it is default code or not.
     *
     * @param {boolean} isDefaultCode
     */
    generateEvent(isDefaultCode: boolean): void;
}
