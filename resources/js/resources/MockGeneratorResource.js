export default class {
    constructor(apiManager) {
        this.apiManager = apiManager;
    }

    async all() {
        return await this.apiManager.get('/api/test-generators');
    }
}
