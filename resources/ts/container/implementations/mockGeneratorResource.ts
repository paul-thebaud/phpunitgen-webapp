import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject, injectable } from "inversify";
import { TYPES } from "@/container/types";
import { MockGenerator, MockGeneratorResourceI } from "@/container/contracts/mockGeneratorResourceI";

@injectable()
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
    public all(): Promise<MockGenerator[]> {
        return this.apiClient.get("mock-generators") as Promise<MockGenerator[]>;
    }
}
