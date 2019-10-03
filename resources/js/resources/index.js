import { apiManager, configManager } from '@/services';
import TestResource from '@/resources/TestResource';
import TestGeneratorResource from '@/resources/TestGeneratorResource';
import MockGeneratorResource from '@/resources/MockGeneratorResource';

const testResource = new TestResource(configManager, apiManager);
const testGeneratorResource = new TestGeneratorResource(apiManager);
const mockGeneratorResource = new MockGeneratorResource(apiManager);

export { testResource, testGeneratorResource, mockGeneratorResource };
