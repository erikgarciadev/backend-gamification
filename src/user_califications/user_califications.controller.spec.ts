import { Test, TestingModule } from '@nestjs/testing';
import { UserCalificationsController } from './user_califications.controller';
import { UserCalificationsService } from './user_califications.service';

describe('UserCalificationsController', () => {
  let controller: UserCalificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCalificationsController],
      providers: [UserCalificationsService],
    }).compile();

    controller = module.get<UserCalificationsController>(UserCalificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
