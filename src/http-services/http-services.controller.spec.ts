import { Test, TestingModule } from '@nestjs/testing';
import { HttpServicesController } from './http-services.controller';

describe('HttpServicesController', () => {
  let controller: HttpServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpServicesController],
    }).compile();

    controller = module.get<HttpServicesController>(HttpServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
