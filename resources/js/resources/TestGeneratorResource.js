export default class {
    constructor(apiManager) {
        this.apiManager = apiManager;
    }

    async find(id) {
        return await this.apiManager.get(`/api/test-generators/${id}`);
    }

    async all() {
        return await this.apiManager.get('/api/test-generators');
    }
}
