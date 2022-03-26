import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";

export class AutenticaUsuarioDto implements Pick<Usuario, 'login' | 'senha'> {
  @ApiProperty()
  login: string;
  
  @ApiProperty()
  senha: string;
}
