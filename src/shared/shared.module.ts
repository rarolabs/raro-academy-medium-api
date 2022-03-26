import { Module } from '@nestjs/common';
import { SenhaService } from './senha.service';

@Module({
  providers: [SenhaService],
  exports: [SenhaService]
})
export class SharedModule {}
