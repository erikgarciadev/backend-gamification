import { Module } from '@nestjs/common';
import { UserBadgesService } from './user_badges.service';
import { UserBadgesController } from './user_badges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBadges, UserBadgesSchema } from './schema/user_badge.schema';
import { Badges, BadgesSchema } from 'src/badges/schema/badge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
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
  controllers: [UserBadgesController],
  providers: [UserBadgesService],
  exports: [UserBadgesService],
})
export class UserBadgesModule {}
