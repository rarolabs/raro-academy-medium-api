import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutenticaUsuarioDto } from 'src/usuarios/dto/autentica-usuario.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() autenticaUsuarioDto: AutenticaUsuarioDto,
  ) {
    return this.authService.login(autenticaUsuarioDto);
  }
}
