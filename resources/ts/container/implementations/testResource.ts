import { Test, TestResourceI } from "@/container/contracts/testResourceI";
import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject, injectable } from "inversify";
import { TYPES } from "@/container/types";
import { StoreI } from "@/container/contracts/storeI";

@injectable()
export class TestResource implements TestResourceI {
    /**
     * The API client to send the code and retrieve the generated test.
     */
    protected apiClient: ApiClientI;

    /**
     * The store to send the tool configuration with the code.
     */
    protected store: StoreI;

    /**
     * TestResource constructor.
     *
     * @param {ApiClientI} apiClient
     * @param {StoreI} store
     */
    public constructor(
        @inject(TYPES.ApiClient) apiClient: ApiClientI,
        @inject(TYPES.Store) store: StoreI
    ) {
        this.store = store;
        this.apiClient = apiClient;
    }

    /**
     * @inheritDoc
     */
    public create(code: string): Promise<Test> {
        return this.apiClient.post("/api/tests", {
            code,
            config: this.store.getTool(),
        }) as Promise<Test>;
    }
}
