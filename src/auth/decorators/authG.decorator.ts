import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from "./role-protected.decorator";
import { ValidRoles } from '../interfaces/validRoles.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseRoleGuardG } from '../guards/use-roleG.guard';


export const AuthG = (roles: ValidRoles[] = []) => {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(JwtAuthGuard, UseRoleGuardG)
    )
}