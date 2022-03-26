import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class SenhaService {
  hashSenha (senha: string): string {
    const { CRYPTO_ALGORITHM, SECRET } = process.env;
    return createHmac(CRYPTO_ALGORITHM, SECRET).update(senha).digest('hex');
  }
}
