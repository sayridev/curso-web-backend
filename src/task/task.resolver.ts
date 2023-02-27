import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GetUserG } from 'src/auth/decorators/get-userg.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthG } from '../auth/decorators/authG.decorator';

@Resolver(() => Task)
@AuthG()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @GetUserG() user:User
    ) {
    return this.taskService.create(createTaskInput,user);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(
    @GetUserG() user:User
  ) {
    return this.taskService.findAll(user);
  }

  @Query(() => Task, { name: 'task' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @GetUserG() user:User
    ) {
    return this.taskService.findOne(id,user);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @GetUserG() user:User
    ) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput, user);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => String }) id: string, @GetUserG() user: User) {
    return this.taskService.remove(id, user);
  }
}
