import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject, injectable } from "inversify";
import { TYPES } from "@/container/types";
import { LocaleI } from "@/container/contracts/localeI";
import { ValidationError } from "@/errors/ValidationError";
import { UnknownError } from "@/errors/UnknownError";

/**
 * Class ApiClient.
 *
 * The API HTTP client using fetch.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class ApiClient implements ApiClientI {
    /**
     * The window to call "fetch" method.
     */
    protected window: Window;

    /**
     * The locale to integrate current locale in HTTP headers.
     */
    protected locale: LocaleI;

    /**
     * ApiClient constructor.
     *
     * @param {Window} window
     * @param {LocaleI} locale
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
        @inject(TYPES.Locale) locale: LocaleI,
    ) {
        this.window = window;
        this.locale = locale;
    }

    /**
     * @inheritDoc
     */
    public async get(endpoint: string): Promise<any> {
        return this.json("get", endpoint);
    }

    /**
     * @inheritDoc
     */
    public async post(endpoint: string, data: any): Promise<any> {
        return this.json("post", endpoint, data);
    }

    /**
     * Make a JSON request with the given request parameters.
     *
     * @param {string} method
     * @param {string} endpoint
     * @param {any} data
     *
     * @returns {Promise<any>}
     */
    protected async json(method: string, endpoint: string, data?: any): Promise<any> {
        const request: RequestInit = this.buildRequest(method, data);

        const response = await this.window.fetch(endpoint, request);
        const json = await response.json();

        if (response.status === 422) {
            throw new ValidationError(json.message, json.errors);
        }

        if (response.status < 200 || response.status >= 300) {
            throw new UnknownError(json.message, json.exception || {});
        }

        return json;
    }

    /**
     * Create a request for the given method and data.
     *
     * @param {string} method
     * @param {any} data
     *
     * @returns {RequestInit}
     */
    protected buildRequest(method: string, data?: any): RequestInit {
        const request: RequestInit = {
            method,
            headers: this.buildHeaders(),
        };

        if (data) {
            request.body = JSON.stringify(data);
        }

        return request;
    }

    /**
     * Create the request headers.
     *
     * @returns {HeadersInit}
     */
    protected buildHeaders(): HeadersInit {
        return {
            "Accept": "application/json",
            "Accept-Language": this.locale.getLocale(),
            "Content-Type": "application/json",
        };
    }
}
