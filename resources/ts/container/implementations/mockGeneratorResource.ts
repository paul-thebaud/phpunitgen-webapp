import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject } from "inversify";
import { TYPES } from "@/container/types";
import { MockGenerator, MockGeneratorResourceI } from "@/container/contracts/mockGeneratorResourceI";

export class MockGeneratorResource implements MockGeneratorResourceI {
    /**
     * The API client to retrieve mock generators.
     */
    protected apiClient: ApiClientI;

    /**
     * MockGeneratorResource constructor.
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
    public async all(): Promise<MockGenerator[]> {
        return this.apiClient.get("/api/mock-generators");
    }
}
