import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@ObjectType()
@Entity({name:'events',schema:'eventos'})
export class Event {
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // exampleField: string;
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> String,{description:'Identificador del evento'})
  id: string;

  @Field(()=> String)
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  @Field(()=>Number)
  date: number | Date;

  @Column({ type:'boolean', default: true})
  @Field(()=> Boolean)
  isActive?: boolean;

  @ManyToOne(
    () => User,
    (user) => user.events,
    {
      lazy: true
    }
  )
  @Field(()=> User)
  user: User


  @BeforeInsert()
  setDate() {
    let fecha = Number(this.date) * 1000;
    this.date = new Date(fecha);
  }
}
