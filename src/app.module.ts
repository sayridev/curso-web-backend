import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { EventModule } from './event/event.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      useFactory: async( jwtService: JwtService ) => ({
        playground: false,
        autoSchemaFile: join( process.cwd(), 'src/schema.gql'), 
        plugins: [
          ApolloServerPluginLandingPageLocalDefault
        ],
        context({ req }) {
          const token = req.headers.authorization?.replace('Bearer ','');
          if ( !token ) throw Error('Token needed');

          const payload = jwtService.decode( token );
          if ( !payload ) throw Error('Token not valid');
          
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    EventModule,
    TaskModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


