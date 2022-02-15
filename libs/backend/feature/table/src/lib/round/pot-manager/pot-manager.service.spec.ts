import { BadRequestException } from '@nestjs/common';
import { mockRound } from '@poker-moons/shared/testing';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from './pot-manager.service';

describe('PotManagerService', () => {
    let service: PotManagerService;

    let tableStateManagerService: SpyObject<TableStateManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [PotManagerService],
            mocks: [TableStateManagerService],
        }).compile();

        service = module.get<PotManagerService>(PotManagerService);

        tableStateManagerService = module.get(TableStateManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('incrementPot', () => {
        const tableId = 'table_1';
        const round = mockRound({ pot: 500 });

        it('should increment the pot the designated amount', async () => {
            await service.incrementPot(tableId, round, 10);

            expect(tableStateManagerService.updateTable).toHaveBeenCalledWith(tableId, {
                activeRound: { ...round, pot: round.pot + 10 },
            });
        });

        it('should throw BadRequestException if amount is not an integer', async () => {
            await expect(() => service.incrementPot(tableId, round, 10.5)).rejects.toThrow(
                new BadRequestException('The pot can only be incremented by integer amounts.'),
            );
        });
    });

    describe('splitPot', () => {
        it('should split the pot equally and return the floored amount', () => {
            const result = service.splitPot(500, 3);

            expect(result).toEqual(166);
        });
    });

    describe('buildPot', () => {
        it('should build the pot amount based on the amount each player has called', () => {
            const result = service.buildPot([{ called: 100 }, { called: 150 }, { called: 25 }]);

            expect(result).toEqual(275);
        });
    });
});
