import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UseRoleGuardG implements CanActivate {

  //obtener la metadata
  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    
    const validRoles: string[] = this.reflector.get(META_ROLES,context.getHandler());

    if ( !validRoles || validRoles.length === 0 ) return true;
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req.user as User;

    if ( !user ) throw new BadRequestException('Usuario no encontrado');

    for (const role of user.roles) {
     if(validRoles.includes(role)){
      return true;
     }
    }
   throw new ForbiddenException(`El usuario debe tener los siguientes roles ${validRoles}`)
   
  }
}
