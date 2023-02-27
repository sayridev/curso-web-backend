import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator/types/decorator/decorators';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsUUID()
    id: string;
}
