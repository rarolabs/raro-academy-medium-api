import { HttpException, HttpStatus } from "@nestjs/common";

export class UsuarioOuSenhaInvalidosException extends HttpException {
  constructor() {
      super('usuario_ou_senha_invalidos', HttpStatus.UNAUTHORIZED);
  }
}
