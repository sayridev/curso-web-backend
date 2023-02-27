import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([
        User
    ]),
    PassportModule.register({ defaultStrategy:'jwt'}),
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ ConfigModule],
      inject: [ConfigService],
      useFactory:(configService:ConfigService) => {
        return {
          secret:configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'10h'
          }
        }
      },
    }),
    ConfigModule   
  ],
  exports:[
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
