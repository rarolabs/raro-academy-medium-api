import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";

export class CreateUsuarioDto implements Omit<Usuario, 'id' | 'artigos'> {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  login: string;
  
  @ApiProperty()
  senha: string;
}
