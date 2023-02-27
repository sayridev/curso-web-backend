import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  providers: [EventResolver, EventService],
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Event])
  ]
})
export class EventModule {}
