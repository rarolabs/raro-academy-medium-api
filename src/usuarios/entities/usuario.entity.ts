import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Artigo } from "src/artigos/entities/artigo.entity";
import faker from "@faker-js/faker";

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

  @Column({ default: faker.image.avatar() })
  avatar: string;

  @OneToMany(() => Artigo, artigo => artigo.autor)
  artigos: Artigo[];
}
