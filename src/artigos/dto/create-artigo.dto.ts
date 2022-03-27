import { ApiProperty } from "@nestjs/swagger";
import { Artigo } from "../entities/artigo.entity";

export class CreateArtigoDto implements Omit<Artigo, 'id' | 'autor' | 'tempoDeLeitura' | 'dataPublicacao' | 'dataAtualizacao'> {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  imagem: string;

  @ApiProperty()
  resumo: string;

  @ApiProperty()
  conteudo: string;
}
