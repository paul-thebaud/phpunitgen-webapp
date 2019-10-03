import UnknownError from '@/errors/UnknownError';
import ValidationError from '@/errors/ValidationError';

export default class {
    constructor(configManager) {
        this.configManager = configManager;
    }

    async json(endpoint, payload = {}, method = 'get') {
        const response = await fetch(endpoint, {
            method,
            headers: this.headers,
            body: JSON.stringify(payload),
        });

        const json = await response.json();

        if (response.status === 422) {
            throw new ValidationError(json.message, json.errors);
        }

        if (response.status < 200 || response.status >= 300) {
            /** @todo Translate message **/
            throw new UnknownError(json.message || 'Unknown error', json.exception || {});
        }

        return json;
    }

    async post(endpoint, payload = {}) {
        return await this.json(endpoint, payload, 'post');
    }

    get headers() {
        return {
            'Accept': 'application/json',
            'Accept-Language': this.configManager.get('locale'),
            'Content-Type': 'application/json',
        };
    }
}
