import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository< Task >
  ){}

  async create(createTaskInput: CreateTaskInput, user:User) {
    try {
      const task = this.taskRepository.create({...createTaskInput,user});
      return await this.taskRepository.save(task);   
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
   
  }

  async findAll( { id }: User ) {
    return this.taskRepository.findBy({
      user:{
        id
      }
    });
  }

  async findOne(id: string, user: User ) {
    const task = await this.taskRepository.findOneBy({
      id,
      user:{
        id:user.id
      }
    })
    if ( !task ) throw new NotFoundException('No existe una tarea con ese id');
    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput,user: User) {
    await this.findOne(id, user);
    const task = await this.taskRepository.preload( updateTaskInput );
    if ( !task ) throw new NotFoundException('La tarea no fue encontrada');
    return await this.taskRepository.save( task );
  }

  async remove(id: string, user: User) {
    let task = await this.findOne(id, user);
    task.isActive = false ;
    task = await this.taskRepository.preload( task );
    return await this.taskRepository.save( task );
  }
}
