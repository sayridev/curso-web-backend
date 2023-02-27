import { Controller, Post, Body,Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-header.decorator';
import { UseRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/validRoles.interface';
import { Auth } from './decorators/auth.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.create(CreateUserDto);
  }
 
  @Get('private')
  @UseGuards( AuthGuard() )
  routePrivate(
    @GetUser('name') name: string,
    @RawHeaders() rawHeader: string[]
  ) {
    console.log(rawHeader)
    return 'Hola';
  }

  @Get('private2')
  // @SetMetadata('roles',['admin','super-user']) 
  //al implementar nuestro decorartor roleProtected usamos role protected en vez de Metadata
  @RoleProtected(ValidRoles.superUser,ValidRoles.user)
  @UseGuards( AuthGuard(),UseRoleGuard )
  routePrivate2(
    @GetUser('name') name: string,
    @RawHeaders() rawHeader: string[]
  ) {
    console.log(rawHeader)
    return 'Hola';
  }



  @Get('private3')
  @Auth([ValidRoles.admin])
  routePrivate3(
   
  ) {
   
    return 'Hola';
  }
  @Get('revalidate')
  @Auth()
  revalidate(
    @GetUser() user: User
  ) {
    return this.authService.revalidate(user);
  }

}
