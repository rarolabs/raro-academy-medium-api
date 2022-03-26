import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { Artigo } from './entities/artigo.entity';

@Injectable({ scope: Scope.REQUEST })
export class ArtigosService {
  constructor(
    @InjectRepository(Artigo) private artigosRepo: Repository<Artigo>,
    @Inject(REQUEST) private readonly request: any,
  ) {}
  
  // @todo: por agora, o arquivo funciona como base-64. Verificar se é complicado
  // transformar em um upload.
  create(createArtigoDto: CreateArtigoDto) {
    return this.artigosRepo.create(createArtigoDto);
  }

  findAll() {
    return this.artigosRepo.find({
      where: { autor: { id: this.request.user.id, } }
    });
  }

  findOne(id: number) {
    return this.artigosRepo.findOne({
      where: { id, autor: { id: this.request.user.id } }
    });
  }

  update(id: number, updateArtigoDto: UpdateArtigoDto) {
    return this.artigosRepo.update(id, updateArtigoDto);
  }

  remove(id: number) {
    return this.artigosRepo.delete({
      id,
      autor: { id: this.request.user.id }
    });
  }
}
