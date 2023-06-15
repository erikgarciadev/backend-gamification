import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Units, UnitsDocument } from './schema/unit.schema';
import { ChaptersService } from 'src/chapters/chapters.service';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Units.name) private readonly unitModel: Model<UnitsDocument>,
    private readonly chapterService: ChaptersService,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    const findUnit = await this.unitModel
      .findOne({
        deleted: false,
      })
      .sort({
        order: -1,
      });

    let order = 1;
    if (findUnit) {
      order = findUnit.order + 1;
    }

    return this.unitModel.create({
      order,
      ...createUnitDto,
    });
  }

  async findAllSimple() {
    const units = await this.unitModel
      .find({
        deleted: false,
      })
      .sort({
        order: 1,
      });

    return units;
  }

  async findAll() {
    const units = await this.unitModel
      .find({
        deleted: false,
      })
      .sort({
        order: 1,
      });

    const data = [];

    for (const unit of units) {
      const chapters = await this.chapterService.findAllByUnit(unit._id);

      data.push({
        ...unit.toJSON(),
        chapters,
      });
    }

    return data;
  }

  findOne(id: string) {
    return `This action returns a #${id} unit`;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    await this.unitModel.findByIdAndUpdate(
      {
        _id: id,
      },
      updateUnitDto,
      {
        new: true,
      },
    );

    return {
      message: 'Se actualizo el estudiante',
    };
  }

  async remove(id: string) {
    await this.unitModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        deleted: true,
      },
      {
        new: true,
      },
    );

    const units = await this.unitModel
      .find({
        deleted: false,
      })
      .sort({
        order: 1,
      });

    const promises = [];
    let order = 1;

    for (const unit of units) {
      promises.push(
        this.unitModel.updateOne(
          {
            _id: unit._id,
          },
          {
            order,
          },
        ),
      );
      order++;
    }

    await Promise.all(promises);

    return {
      message: 'Se elimino la unidad',
    };
  }
}
