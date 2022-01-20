import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PotManagerService } from './pot-manager.service';

describe('PotManagerService', () => {
    let service: PotManagerService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PotManagerService],
        }).compile();

        service = module.get<PotManagerService>(PotManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('incrementPot', () => {
        it('should increment the pot the designated amount', () => {
            const result = service.incrementPot(500, 10);

            expect(result).toEqual(510);
        });

        it('should throw BadRequestException if amount is not an integer', () => {
            expect(() => service.incrementPot(500, 10.5)).toThrow(
                new BadRequestException('The pot can only be incremented by integer amounts.')
            );
        });
    });

    describe('splitPot', () => {
        it('should split the pot equally and return the amount leftover', () => {
            const result = service.splitPot(500, 3);

            expect(result).toEqual({ amountToDistribute: 166, amountLeftover: 2 });
        });
    });
});
