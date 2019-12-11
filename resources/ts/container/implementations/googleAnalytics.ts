import { inject, injectable } from "inversify";
import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";
import { Dictionary } from "@/utils/types";
import { TYPES } from "@/container/types";

// Declare process to avoid TS compilation errors.
declare const process: { env: Dictionary<string | undefined> };

// The storage key used to store accept status.
const cookieStorageKey = 'phpunitgen_ga';

/**
 * Class GoogleAnalytics.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class GoogleAnalytics implements GoogleAnalyticsI {
    /**
     * The GoogleAnalytics ID..
     */
    protected analyticsAppId: string | undefined;

    /**
     * The local storage instance.
     */
    protected localStorage: Storage;

    /**
     * GoogleAnalytics constructor.
     *
     * @param {Window} window
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
    ) {
        this.analyticsAppId = process.env.MIX_GOOGLE_ANALYTICS_ID;
        this.localStorage = window.localStorage;
    }

    /**
     * @inheritDoc
     */
    public isConfigured(): boolean {
        return this.analyticsAppId !== undefined;
    }

    /**
     * @inheritDoc
     */
    public getApplicationId(): string {
        if (this.analyticsAppId === undefined) {
            throw new Error("google analytics app ID is not defined, cannot retrieve it");
        }

        return this.analyticsAppId;
    }

    /**
     * @inheritDoc
     */
    public isChecked(): boolean {
        return this.getAcceptStatus() === '1'
            || this.getAcceptStatus() === '0';
    }

    /**
     * @inheritDoc
     */
    public isAccepted(): boolean {
        return this.getAcceptStatus() === '1';
    }

    /**
     * @inheritDoc
     */
    public accept(): void {
        this.setAcceptStatus('1');
    }

    /**
     * @inheritDoc
     */
    public refuse(): void {
        this.setAcceptStatus('0');
    }

    /**
     * Get the accept status from local storage.
     *
     * @returns {string | null}
     */
    protected getAcceptStatus(): string | null {
        return this.localStorage.getItem(cookieStorageKey);
    }

    /**
     * Set the accept status in local storage.
     *
     * @param {string} value
     */
    protected setAcceptStatus(value: string): void {
        return this.localStorage.setItem(cookieStorageKey, value);
    }
}
