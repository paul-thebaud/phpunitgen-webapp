export default class {
    constructor(storage, api) {
        this.storage = storage;
        this.api = api;
    }

    async create(code) {
        return await this.api.post('/api/tests', {
            config: this.storage.get('tool'),
            code,
        });
    }
}
