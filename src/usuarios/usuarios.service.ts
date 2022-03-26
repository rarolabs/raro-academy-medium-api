import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { createHmac } from "crypto";
import { AutenticaUsuarioDto } from './dto/autentica-usuario.dto';
import { UsuarioOuSenhaInvalidosException } from 'src/exceptions/domain/contractor-already-has-active-theme.error';
import { sign } from 'jsonwebtoken';
import { TokenDTO, TokenPayloadDto } from './dto/Token.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new Usuario();
    usuario.login = createUsuarioDto.login;
    usuario.nome = createUsuarioDto.nome;
    usuario.senha = this.hashSenha(createUsuarioDto.senha);

    return this.usuariosRepo.save(usuario);
  }

  async autentica(autenticaUsuarioDto: AutenticaUsuarioDto) {
    const { login, senha } = autenticaUsuarioDto;
    const usuario = await this.usuariosRepo.findOne({ login });
    if (!usuario) {
      throw new UsuarioOuSenhaInvalidosException();
    }

    if (this.hashSenha(senha) !== usuario.senha) {
      throw new UsuarioOuSenhaInvalidosException();
    }

    return this.gerarToken({ id: usuario.id });
  }

  private hashSenha (senha: string): string {
    const { CRYPTO_ALGORITHM, SECRET } = process.env;
    return createHmac(CRYPTO_ALGORITHM, SECRET).update(senha).digest('hex');
  }

  private gerarToken(usuario: TokenPayloadDto): TokenDTO {
    const token = sign(usuario, process.env.AUTH_SECRET);
    return { token };
  }

}
