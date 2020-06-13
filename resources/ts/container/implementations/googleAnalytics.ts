import Vue from "vue";
import { inject, injectable } from "inversify";
import { bootstrap } from "vue-gtag";
import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";
import { Dictionary } from "@/utils/types";
import { TYPES } from "@/container/types";
import router from "@/router";
import Cookies from "js-cookie";

// Declare process to avoid TS compilation errors.
declare const process: { env: Dictionary<string | undefined> };

// The storage key used to store accept status.
const cookieStorageKey = "phpunitgen_ga";

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
     * The window instance.
     */
    protected window: Window;

    /**
     * GoogleAnalytics constructor.
     *
     * @param {Window} window
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
    ) {
        this.analyticsAppId = process.env.MIX_GOOGLE_ANALYTICS_ID;
        this.window = window;
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
        return this.getAcceptStatus() === "1"
            || this.getAcceptStatus() === "0";
    }

    /**
     * @inheritDoc
     */
    public isAccepted(): boolean {
        return this.getAcceptStatus() === "1";
    }

    /**
     * @inheritDoc
     */
    public accept(): void {
        const wasAccepted = this.isAccepted();

        this.setAcceptStatus("1");

        if (! wasAccepted) {
            this.activate();
        }
    }

    /**
     * @inheritDoc
     */
    public refuse(): void {
        const wasAccepted = this.isAccepted();

        this.setAcceptStatus("0");

        if (wasAccepted) {
            Object.keys(Cookies.get()).forEach(cookieName => {
                Cookies.remove(cookieName, {
                    path: "/",
                    domain: `.${window.location.hostname}`,
                });
            });
            window.location.reload();
        }
    }

    /**
     * @inheritDoc
     */
    public activate(): void {
        if (this.isConfigured() && this.window.location.pathname.indexOf("/docs") !== 0) {
            bootstrap().then(() => {
                (Vue as unknown as Vue).$gtag.pageview({
                    "page_title": router.currentRoute.name || undefined,
                    "page_path": router.currentRoute.path,
                    "page_location": window.location.href,
                });
            });
        }
    }

    /**
     * @inheritDoc
     */
    public generateEvent(isDefaultCode: boolean): void {
        if (this.isConfigured() && this.isAccepted()) {
            const eventLabel = `Code generation request: ${isDefaultCode ? "default" : "custom"}`;

            (Vue as unknown as Vue).$gtag.event("generate", {
                "event_category": "engagement",
                "event_label": eventLabel,
            });
        }
    }

    /**
     * Get the accept status from local storage.
     *
     * @returns {string | null}
     */
    protected getAcceptStatus(): string | null {
        return this.window.localStorage.getItem(cookieStorageKey);
    }

    /**
     * Set the accept status in local storage.
     *
     * @param {string} value
     */
    protected setAcceptStatus(value: string): void {
        return this.window.localStorage.setItem(cookieStorageKey, value);
    }
}
