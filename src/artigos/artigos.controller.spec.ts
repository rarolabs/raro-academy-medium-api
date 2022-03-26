import { Test, TestingModule } from '@nestjs/testing';
import { ArtigosController } from './artigos.controller';
import { ArtigosService } from './artigos.service';

describe('ArtigosController', () => {
  let controller: ArtigosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtigosController],
      providers: [ArtigosService],
    }).compile();

    controller = module.get<ArtigosController>(ArtigosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
