import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';




export const GetUserG = createParamDecorator( 
    (data: string, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const user = req.user;
        if( !user ) throw new InternalServerErrorException('EL usuario no se encuentra');
        return ( !data ) ? user : user[data];
})