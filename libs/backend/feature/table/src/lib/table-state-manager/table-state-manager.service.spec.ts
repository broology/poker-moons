import { Test } from '@nestjs/testing';
import { TableStateManagerService } from './table-state-manager.service';
import { BackendDataAccessStateModule } from '@poker-moons/backend-data-access-state';

describe('TableStateManagerService', () => {
    let service: TableStateManagerService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TableStateManagerService],
            imports: [BackendDataAccessStateModule],
        }).compile();

        service = module.get(TableStateManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
