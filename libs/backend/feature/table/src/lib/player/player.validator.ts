import { JoinTableRequest } from '@poker-moons/shared/type';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinTableRequestValidator implements JoinTableRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;
}
