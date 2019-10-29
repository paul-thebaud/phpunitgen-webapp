import { Test, TestResourceI } from "@/container/contracts/testResourceI";
import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject } from "inversify";
import { TYPES } from "@/container/types";

export class TestResource implements TestResourceI {
    /**
     * The API client to send the code and retrieve the generated test.
     */
    protected apiClient: ApiClientI;

    /**
     * TestResource constructor.
     *
     * @param {ApiClientI} apiClient
     */
    public constructor(
        @inject(TYPES.ApiClient) apiClient: ApiClientI
    ) {
        this.apiClient = apiClient;
    }

    /**
     * @inheritDoc
     */
    public async create(code: string): Promise<Test> {
        return this.apiClient.post("/api/tests", { code });
    }
}
