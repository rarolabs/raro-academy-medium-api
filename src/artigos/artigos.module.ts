import { Module } from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { ArtigosController } from './artigos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artigo } from './entities/artigo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artigo]),
  ],
  controllers: [ArtigosController],
  providers: [ArtigosService]
})
export class ArtigosModule {}
