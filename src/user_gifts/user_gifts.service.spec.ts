import { Test, TestingModule } from '@nestjs/testing';
import { UserGiftsService } from './user_gifts.service';

describe('UserGiftsService', () => {
  let service: UserGiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGiftsService],
    }).compile();

    service = module.get<UserGiftsService>(UserGiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
