import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ){
        super({
            secretOrKey:configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate( payload: IJwtPayload ): Promise< User > {
        const { id } = payload;
        const user = await this.userRepository.findOneBy({id});
        if ( !user )
        throw new UnauthorizedException ('Token no valido')
        if ( !user.isActive )
        throw new UnauthorizedException ('Actualmente el usuario esta bloqueado consulte con el administrador')
        return user;
    }

}