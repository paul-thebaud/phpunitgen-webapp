import { api, storage } from '@/services';
import TestResource from '@/resources/TestResource';
import TestGeneratorResource from '@/resources/TestGeneratorResource';
import MockGeneratorResource from '@/resources/MockGeneratorResource';

const testResource = new TestResource(storage, api);
const testGeneratorResource = new TestGeneratorResource(api);
const mockGeneratorResource = new MockGeneratorResource(api);

export { testResource, testGeneratorResource, mockGeneratorResource };
