import { PartialType } from '@nestjs/swagger';
import { CreateArtigoDto } from './create-artigo.dto';

export class UpdateArtigoDto extends PartialType(CreateArtigoDto) {}
