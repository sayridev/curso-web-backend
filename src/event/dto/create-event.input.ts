import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateEventInput {

  @IsString()
  @MinLength(6,{message: 'La descripcion debe tener al menos 6 caracteres'})
  @Field( () => String ) 
  description: string;
  @IsNumber()
  @Field( () => Number ) 
  date: number;
 
  
}
