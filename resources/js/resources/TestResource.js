export default class {
    constructor(configManager, apiManager) {
        this.configManager = configManager;
        this.apiManager = apiManager;
    }

    async create(code) {
        return await this.apiManager.post('/api/tests', {
            //config: this.configManager.get('tool'),
            code,
        });
    }
}
