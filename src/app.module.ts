import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { UnitsModule } from './units/units.module';
import { ChaptersModule } from './chapters/chapters.module';
import { BadgesModule } from './badges/badges.module';
import { UserBadgesModule } from './user_badges/user_badges.module';
import { GiftsModule } from './gifts/gifts.module';
import { UserGiftsModule } from './user_gifts/user_gifts.module';
import { UserCalificationsModule } from './user_califications/user_califications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UsersModule,
    RolesModule,
    StudentsModule,
    UnitsModule,
    ChaptersModule,
    BadgesModule,
    UserBadgesModule,
    GiftsModule,
    UserGiftsModule,
    UserCalificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
