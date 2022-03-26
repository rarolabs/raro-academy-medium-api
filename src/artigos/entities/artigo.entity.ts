import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artigo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  titulo: string;

  @ApiProperty()
  @Column("longtext")
  imagem: string;

  @ApiProperty()
  @Column("longtext")
  resumo: string;

  @ApiProperty()
  @Column("longtext")
  conteudo: string;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, usuario => usuario.artigos)
  autor: Usuario;
}
