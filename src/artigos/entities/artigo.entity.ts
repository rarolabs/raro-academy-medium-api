import faker from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({ default: `${faker.datatype.number({ min: 1, max: 10 })} min` })
  tempoDeLeitura: string;

  @CreateDateColumn()
  dataPublicacao: Date;

  @UpdateDateColumn()
  dataAtualizacao: Date;
}
