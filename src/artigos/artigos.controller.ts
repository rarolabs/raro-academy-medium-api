import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArtigosService } from './artigos.service';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { Artigo } from './entities/artigo.entity';

@ApiTags('artigos')
@Controller('artigos')
export class ArtigosController {
  constructor(private readonly artigosService: ArtigosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createArtigoDto: CreateArtigoDto) {
    return this.artigosService.create(createArtigoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ isArray: true, type: Artigo })
  findAll(): Promise<Artigo[]> {
    return this.artigosService.findAll();
  }

  @Get('meus-artigos')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ isArray: true, type: Artigo })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findMine(): Promise<Artigo[]> {
    return this.artigosService.findMine();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: Artigo })
  findOne(@Param('id') id: string): Promise<Artigo> {
    return this.artigosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateArtigoDto: UpdateArtigoDto) {
    return this.artigosService.update(+id, updateArtigoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<void> {
    await this.artigosService.remove(+id);
  }
}
