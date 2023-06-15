import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Units, UnitsSchema } from './schema/unit.schema';
import { ChaptersModule } from 'src/chapters/chapters.module';

@Module({
  imports: [
    ChaptersModule,
    MongooseModule.forFeature([
      {
        name: Units.name,
        schema: UnitsSchema,
      },
    ]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
