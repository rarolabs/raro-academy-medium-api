import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { SenhaService } from 'src/shared/senha.service';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
    private senhaService: SenhaService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = new Usuario();
    usuario.login = createUsuarioDto.login;
    usuario.nome = createUsuarioDto.nome;
    usuario.senha = this.senhaService.hashSenha(createUsuarioDto.senha);

    return this.usuariosRepo.save(usuario);
  }

  findOneByLogin(login: string): Promise<Usuario> {
    return this.usuariosRepo.findOne({ login });
  }
}
