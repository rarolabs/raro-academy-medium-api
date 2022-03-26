import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AutenticaUsuarioDto } from './dto/autentica-usuario.dto';
import { Response } from 'express';
import { UsuarioOuSenhaInvalidosException } from 'src/exceptions/domain/contractor-already-has-active-theme.error';
import { TokenDTO } from './dto/Token.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<void> {
    await this.usuariosService.create(createUsuarioDto);
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async auth(
    @Body() autenticaUsuarioDto: AutenticaUsuarioDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<TokenDTO> {
    try {
      return this.usuariosService.autentica(autenticaUsuarioDto);
    } catch (error: unknown) {
      if (error instanceof UsuarioOuSenhaInvalidosException) {
        response.status(HttpStatus.UNAUTHORIZED).send();
      }

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
