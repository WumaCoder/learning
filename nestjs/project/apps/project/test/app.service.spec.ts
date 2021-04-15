import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { TempService } from '../src/temp/temp.service';

jest.mock('../src/temp/temp.service');

console.log(TempService);

describe('app.service.ts', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, TempService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getHello', () => {
    expect(service.getHello()).toBe('Hello World');
  });
});
