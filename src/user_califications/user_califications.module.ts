import { Module } from '@nestjs/common';
import { UserCalificationsService } from './user_califications.service';
import { UserCalificationsController } from './user_califications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCalifications,
  UserCalificationsSchema,
} from './schema/user_calification.schema';
import { Chapters, ChaptersSchema } from 'src/chapters/schema/chapter.schema';
import { Users, UsersSchema } from 'src/users/schema/user.schema';
import {
  UserBadges,
  UserBadgesSchema,
} from 'src/user_badges/schema/user_badge.schema';
import { Badges, BadgesSchema } from 'src/badges/schema/badge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCalifications.name,
        schema: UserCalificationsSchema,
      },
      {
        name: Chapters.name,
        schema: ChaptersSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: UserBadges.name,
        schema: UserBadgesSchema,
      },
      {
        name: Badges.name,
        schema: BadgesSchema,
      },
    ]),
  ],

  controllers: [UserCalificationsController],
  providers: [UserCalificationsService],
})
export class UserCalificationsModule {}
