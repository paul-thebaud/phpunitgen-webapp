import UnknownError from '@/errors/UnknownError';
import ValidationError from '@/errors/ValidationError';

export default class {
    constructor(storage) {
        this.storage = storage;
    }

    async json(endpoint, payload = {}, method = 'get') {
        const request = {
            method,
            headers: this.headers,
        };

        if (method !== 'get' && payload) {
            request.body = JSON.stringify(payload);
        }

        const response = await fetch(endpoint, request);
        const json = await response.json();

        if (response.status === 422) {
            throw new ValidationError(json.message, json.errors);
        }

        if (response.status < 200 || response.status >= 300) {
            throw new UnknownError(json.message, json.exception || {});
        }

        return json;
    }

    async get(endpoint) {
        return await this.json(endpoint, null, 'get');
    }

    async post(endpoint, payload = {}) {
        return await this.json(endpoint, payload, 'post');
    }

    get headers() {
        return {
            'Accept': 'application/json',
            'Accept-Language': this.storage.get('locale'),
            'Content-Type': 'application/json',
        };
    }
}
