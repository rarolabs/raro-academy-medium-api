import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Artigo } from "src/artigos/entities/artigo.entity";

@Entity()
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  senha: string;

  @OneToMany(() => Artigo, artigo => artigo.autor)
  artigos: Artigo[];
}
