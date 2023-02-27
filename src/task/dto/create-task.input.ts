import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { StatusTask } from '../enum/task.enum';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsString()
  @MinLength(6)
  description: string;
  @IsOptional()
  @IsString()
  @Field( () => StatusTask,{nullable: true })
  status: StatusTask;
}
