import { Test, TestingModule } from '@nestjs/testing';
import { UserCalificationsService } from './user_califications.service';

describe('UserCalificationsService', () => {
  let service: UserCalificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCalificationsService],
    }).compile();

    service = module.get<UserCalificationsService>(UserCalificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
