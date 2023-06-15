import { Test, TestingModule } from '@nestjs/testing';
import { UserGiftsController } from './user_gifts.controller';
import { UserGiftsService } from './user_gifts.service';

describe('UserGiftsController', () => {
  let controller: UserGiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGiftsController],
      providers: [UserGiftsService],
    }).compile();

    controller = module.get<UserGiftsController>(UserGiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
