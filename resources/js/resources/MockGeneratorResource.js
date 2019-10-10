export default class {
    constructor(api) {
        this.api = api;
    }

    async all() {
        return await this.api.get('/api/mock-generators');
    }
}
