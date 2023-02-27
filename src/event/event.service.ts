import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { User } from '../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class EventService {


  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ){}

  async create(createEventInput: CreateEventInput, user: User) {
    try {
      const event = this.eventRepository.create({...createEventInput,user:{id:user.id}});
      await this.eventRepository.save( event );
      return {
        ...event,
        user
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  findAll( id: string ) {
    return this.eventRepository.findBy({
      isActive:true,
      user:{
        id
      }
    });
  }

  async findOne(id: string) {
    const event= await this.eventRepository.findOneBy({id});
    if ( !event ) throw new NotFoundException('No se encontro ningun evento con ese id');
    return event;
  }    

  async update(id: string, updateEventInput: UpdateEventInput,user: User) {
    await this.findOne(id);
    const event =  await this.eventRepository.preload( updateEventInput );
    if ( !event ) throw new NotFoundException('El evento no existe');
    return await this.eventRepository.save(event);
  }

  async remove(id: string) {
    let event = await this.findOne(id);
    event.isActive = false ;
    event =  await this.eventRepository.preload( event );
    if ( !event ) throw new NotFoundException('El evento no existe');
    return await this.eventRepository.save(event);
  }

  private handleDBError(error: any) {
    throw new InternalServerErrorException('Error en el servidor');
  }
}
