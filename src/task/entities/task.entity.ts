import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => String )
  id: string;

  @Column({ type: 'character varying',comment:'descripcion de la tarea a realizar o el nombre de la tarea'  })
  @Field( () => String )
  description: string;

  @Column({ type: 'character varying', default:'pendiente'})
  @Field( () => String )
  status : string;

  @Column({ type: 'boolean', default:true})
  @Field( () => Boolean )
  isActive : boolean;

  @ManyToOne( () => User , (user) => user.tasks ,{ lazy: true } )
  @Field( () => User )
  user: User
}
