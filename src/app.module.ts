import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ArtigosModule } from './artigos/artigos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UsuariosModule,
    ArtigosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
