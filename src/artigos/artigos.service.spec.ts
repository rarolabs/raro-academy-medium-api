import { Test, TestingModule } from '@nestjs/testing';
import { ArtigosService } from './artigos.service';

describe('ArtigosService', () => {
  let service: ArtigosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtigosService],
    }).compile();

    service = module.get<ArtigosService>(ArtigosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
