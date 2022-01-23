import { Test } from '@nestjs/testing';
import { TableStateManagerService } from './table-state-manager.service';
import { BackendFeatureStateModule } from '@poker-moons/backend/feature/state';

describe('TableStateManagerService', () => {
    let service: TableStateManagerService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TableStateManagerService],
            imports: [BackendFeatureStateModule],
        }).compile();

        service = module.get(TableStateManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
