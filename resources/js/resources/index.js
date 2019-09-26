import { apiManager, configManager } from '@/services';
import TestResource from '@/resources/TestResource';

const testResource = new TestResource(configManager, apiManager);

export { testResource };
