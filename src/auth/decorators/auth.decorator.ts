import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from "./role-protected.decorator"
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces/validRoles.interface';


export const Auth = (roles: ValidRoles[] = []) => {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UseRoleGuard)
    )
}