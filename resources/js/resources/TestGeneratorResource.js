export default class {
    constructor(api) {
        this.api = api;
    }

    async find(id) {
        return await this.api.get(`/api/test-generators/${id}`);
    }

    async all() {
        return await this.api.get('/api/test-generators');
    }
}
