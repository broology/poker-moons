import { RedisStateService } from '@poker-moons/backend/data-access/state';

describe('RedisStateService', () => {
    it('test', () => {
        const service = new RedisStateService();
        service.test();
    });
});
