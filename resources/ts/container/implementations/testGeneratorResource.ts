import { ApiClientI } from "@/container/contracts/apiClientI";
import { inject, injectable } from "inversify";
import { TYPES } from "@/container/types";
import { TestGenerator, TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";

@injectable()
export class TestGeneratorResource implements TestGeneratorResourceI {
    /**
     * The API client to retrieve test generators.
     */
    protected apiClient: ApiClientI;

    /**
     * TestGeneratorResource constructor.
     *
     * @param {ApiClientI} apiClient
     */
    public constructor(
        @inject(TYPES.ApiClient) apiClient: ApiClientI,
    ) {
        this.apiClient = apiClient;
    }

    /**
     * @inheritDoc
     */
    public find(id: string): Promise<TestGenerator> {
        return this.apiClient.get(`test-generators/${id}`) as Promise<TestGenerator>;
    }

    /**
     * @inheritDoc
     */
    public all(): Promise<TestGenerator[]> {
        return this.apiClient.get("test-generators") as Promise<TestGenerator[]>;
    }
}
