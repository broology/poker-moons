import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { ServerTableState, TableId } from '@poker-moons/shared/type';
import Redis from 'ioredis';
import { nanoid } from 'nanoid';
import { GenericStateServiceImpl } from '../generic-state-service.impl';

@Injectable()
export class RedisStateService implements GenericStateServiceImpl, OnModuleInit, OnModuleDestroy {
    private redis!: Redis;
    private logger = new CustomLoggerService(RedisStateService.name);

    constructor(private readonly configService: ConfigService) {}

    async onModuleInit(): Promise<void> {
        this.logger.debug(
            'Attempting to connect to redis at: ' +
                this.configService.get('REDIS_HOST') +
                ':' +
                Number.parseInt(<string>this.configService.get('REDIS_PORT'), 10),
        );
        this.redis = await new Redis({
            port: Number.parseInt(<string>this.configService.get('REDIS_PORT'), 10),
            host: this.configService.get('REDIS_HOST'),
        });
        this.logger.log(
            'Connected to redis successfully at ' +
                this.configService.get('REDIS_HOST') +
                ':' +
                Number.parseInt(<string>this.configService.get('REDIS_PORT'), 10),
        );
    }

    onModuleDestroy(): void {
        this.redis.disconnect();
        this.redis.quit();
    }

    async create(serverTableState: ServerTableState): Promise<TableId> {
        const id: TableId = `table_${nanoid()}`;
        serverTableState.id = id;
        this.logger.log('Attempting to create table with id: ' + id);
        await this.redis?.set(id, JSON.stringify(serverTableState));
        this.logger.log('New table created');
        return id;
    }

    async delete(tableId: TableId): Promise<void> {
        this.logger.log('Deleting table with id: ' + tableId);
        await this.redis.del(tableId);
    }

    async getState(tableId: TableId): Promise<ServerTableState> {
        this.logger.debug('Attempting to get the table with id: ' + tableId);
        const tableString = await this.redis.get(tableId);
        if (tableString) {
            const table: ServerTableState = JSON.parse(tableString);
            this.logger.log('Got table with id: ' + tableId + ' successfully');
            return table;
        } else {
            throw new InternalServerErrorException('There was an error retrieving the table with id: ' + tableId);
        }
    }

    async update(tableId: TableId, updatedTable: Partial<ServerTableState>): Promise<void> {
        const tableString = await this.redis.get(tableId);
        if (tableString) {
            const table: ServerTableState = JSON.parse(tableString);
            await this.redis.set(tableId, JSON.stringify({ ...table, ...updatedTable }));
        } else {
            throw new InternalServerErrorException('There was an error retrieving the table with id: ' + tableId);
        }
    }
}
