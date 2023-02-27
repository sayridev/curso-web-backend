import { BeforeInsert, Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Event } from '../../event/entities/event.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../../task/entities/task.entity';
@Entity('users',{schema:'usuarios'})
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field( () => String )
    id: string;

    @Column({ type:'character varying' })
    @Field( () => String )
    name: string;
 
    @Column({ type:'character varying' })
    @Field( () => String )
    lastname: string;

    @Column({ type:'character varying', unique: true })
    @Field( () => String )
    user: string;

    @Column({ type:'character varying', unique: true })
    @Field( () => String )
    email: string;

    @Column({ type:'character varying', select:false })
    password: string;

    @Column({ type:'bool', default: true })
    @Field( () => Boolean )
    isActive: boolean;

    @Column({
        type: 'text',
        array: true,
        default: ['user']
    })

    @Field( () => [String] )
    roles: string[];



    @OneToMany(
        () => Event,
        (event) => event.user,
        {
            lazy: true
        }
        )
    @Field( () => [Event] )
    events:Event[]    

    @OneToMany(
        () => Task,
        (task) => task.user,
        { lazy: true }
    )

    tasks: Task[];


     //se puede comportar como un trigger
     @BeforeInsert()
     setUser() {
         this.user= this.name+this.lastname;
         this.email = this.email.toLocaleLowerCase().trim();
     }
     @BeforeInsert()
     encryptPassword(){
        this.password = bcrypt.hashSync(this.password,10)
     }
}

