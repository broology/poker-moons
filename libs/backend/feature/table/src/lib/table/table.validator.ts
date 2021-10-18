import { CreateTableRequest } from '@poker-moons/shared/type';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTableRequestValidator implements CreateTableRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
