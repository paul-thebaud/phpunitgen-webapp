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
        @inject(TYPES.ApiClient) apiClient: ApiClientI
    ) {
        this.apiClient = apiClient;
    }

    /**
     * @inheritDoc
     */
    public async find(id: string): Promise<TestGenerator> {
        return this.apiClient.get(`/api/test-generators/${id}`);
    }

    /**
     * @inheritDoc
     */
    public async all(): Promise<TestGenerator[]> {
        return this.apiClient.get("/api/test-generators");
    }
}
