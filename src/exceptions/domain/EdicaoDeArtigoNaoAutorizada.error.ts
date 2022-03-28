import { HttpException, HttpStatus } from "@nestjs/common";

export class EdicaoDeArtigoNaoAutorizadaException extends HttpException {
  constructor() {
      super('edicao_de_artigo_nao_autorizada', HttpStatus.FORBIDDEN);
  }
}
