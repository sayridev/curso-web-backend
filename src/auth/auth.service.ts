import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService:ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){

  }


  async login( loginUserDto: LoginUserDto)  {
      const { email, password } = loginUserDto;
      const user = await  this.userRepository.findOne({
        where:{email},
        select:{email: true,password: true, id: true }
      });
      if ( !user ) throw new UnauthorizedException('El usuario no existe');
      if ( !bcrypt.compareSync(password, user.password) ) throw new UnauthorizedException('Email o password incorrectos');
      return {
        ...user,
        token:this.getJwtToken({id: user.id})
      };
   
  }
  
  
  async create(createUserDto: CreateUserDto) {
      try {
        const user = this.userRepository.create( createUserDto);
        await this.userRepository.save( user );
        delete user.password;
        return {
          ...user,
          token:this.getJwtToken({id: user.id})
        };
      } catch (error) {
        this.handleDBError(error);
      }
  }

  revalidate( user: User) {
    return {
      ...user,
      token:this.getJwtToken({id: user.id})
    };
  }


  private getJwtToken( payload: IJwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
 
  private handleDBError(error: any) {
    if (error.code === '23505') throw new BadRequestException( error.detail );
    throw new InternalServerErrorException('Error en el servidor');
  }
}
