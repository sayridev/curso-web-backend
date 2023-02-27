import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { User } from '../auth/entities/user.entity';
import { GetUserG } from '../auth/decorators/get-userg.decorator';
import { AuthG } from '../auth/decorators/authG.decorator';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Event)
@AuthG()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput ,
    @GetUserG() user: User
  ) {
    return this.eventService.create( createEventInput, user );
  }

  @Query(() => [Event], { name: 'events' })
  findAll( @GetUserG() user: User ) {
    return this.eventService.findAll( user.id );
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => String },ParseUUIDPipe) id: string) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @GetUserG() user: User
    ) {
    return this.eventService.update(updateEventInput.id, updateEventInput, user);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventService.remove(id);
  }
}
