import faker from '@faker-js/faker';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { EdicaoDeArtigoNaoAutorizadaException } from 'src/exceptions/domain/EdicaoDeArtigoNaoAutorizada.error';
import { Repository, Like } from 'typeorm';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { Artigo } from './entities/artigo.entity';

@Injectable({ scope: Scope.REQUEST })
export class ArtigosService {
  constructor(
    @InjectRepository(Artigo) private artigosRepo: Repository<Artigo>,
    @Inject(REQUEST) private readonly request: any,
  ) {}
  
  create(createArtigoDto: CreateArtigoDto) {
    return this.artigosRepo.save(this.mapArtigo(createArtigoDto));
  }

  findAll(titulo = '') {
    return this.artigosRepo.find({
      select: ['id', 'titulo', 'resumo', 'imagem'],
      relations: [ 'autor' ],
      where: {
        titulo: Like(`%${titulo}%`),
      }
    });
  }

  findMine(titulo = '') {
    return this.artigosRepo.find({
      select: ['id', 'titulo', 'resumo', 'imagem'],
      where: {
        autor: { id: this.request.user.id, },
        titulo: Like(`%${titulo}%`),
      },
      relations: [ 'autor' ],
    });
  }

  findOne(id: number) {
    return this.artigosRepo.findOne({
      where: { id },
      relations: [ 'autor' ]
    });
  }

  async update(id: number, updateArtigoDto: UpdateArtigoDto) {
    await this.verificaProprietarioDoArtigo(id);
    await this.artigosRepo.update(id, updateArtigoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.verificaProprietarioDoArtigo(id);
    return this.artigosRepo.delete({
      id,
      autor: { id: this.request.user.id }
    });
  }

  private async verificaProprietarioDoArtigo(id: number) {
    const artigo = await this.findOne(id)
    if (artigo.autor.id !== this.request.user.id) {
      throw new EdicaoDeArtigoNaoAutorizadaException();
    }
  }

  private mapArtigo(createArtigoDto: CreateArtigoDto | UpdateArtigoDto) {
    const artigo = new Artigo();
    artigo.titulo = createArtigoDto.titulo;
    artigo.conteudo = createArtigoDto.conteudo;
    artigo.resumo = createArtigoDto.resumo;
    artigo.imagem = createArtigoDto.imagem;
    artigo.autor = this.request.user;
    artigo.tempoDeLeitura = `${faker.datatype.number({ min: 1, max: 10 })} min`

    return artigo;
  }
}
