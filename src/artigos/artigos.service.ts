import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { Artigo } from './entities/artigo.entity';

@Injectable()
export class ArtigosService {
  constructor(
    @InjectRepository(Artigo) private artigosRepo: Repository<Artigo>
  ) {}
  
  // @todo: por agora, o arquivo funciona como base-64. Verificar se é complicado
  // transformar em um upload.
  create(createArtigoDto: CreateArtigoDto) {
    return this.artigosRepo.create(createArtigoDto);
  }

  findAll() {
    return this.artigosRepo.find();
  }

  findOne(id: number) {
    return this.artigosRepo.findOne(id);
  }

  update(id: number, updateArtigoDto: UpdateArtigoDto) {
    return this.artigosRepo.update(id, updateArtigoDto);
  }

  remove(id: number) {
    return this.artigosRepo.delete(id);
  }
}
