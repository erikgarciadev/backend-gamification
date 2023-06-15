import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Model } from 'mongoose';
import { Chapters, ChaptersDocument } from './schema/chapter.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapters.name)
    private readonly chapterModel: Model<ChaptersDocument>,
  ) {}
  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  async createByUnit(unit_id: string, createChapterDto: CreateChapterDto) {
    const findChapter = await this.chapterModel
      .findOne({
        deleted: false,
        unit_id: unit_id,
      })
      .sort({
        order: -1,
      });

    let order = 1;

    if (findChapter) {
      order = findChapter.order + 1;
    }

    return this.chapterModel.create({
      unit_id,
      order,
      ...createChapterDto,
    });
  }

  findAll() {
    return `This action returns all chapters`;
  }

  async findAllByUnitSimple(unit_id: string) {
    const chapters = await this.chapterModel
      .find({
        deleted: false,
        unit_id,
      })
      .sort({
        order: 1,
      });

    const data = [];

    for (const chapter of chapters) {
      data.push({
        _id: chapter._id,
        name: chapter.name,
      });
    }

    return chapters;
  }

  async findAllByUnit(unit_id: string) {
    const chapters = await this.chapterModel
      .find({
        deleted: false,
        unit_id,
      })
      .sort({
        order: 1,
      });

    return chapters;
  }

  async findOne(id: string) {
    const chapter = await this.chapterModel.findOne({
      _id: id,
    });

    return chapter;
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    await this.chapterModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateChapterDto,
      {
        new: true,
      },
    );

    return {
      message: 'Se actualizo el capitulo',
    };
  }

  async remove(id: string) {
    const res = await this.chapterModel.findOneAndUpdate(
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

    const chapters = await this.chapterModel
      .find({
        deleted: false,
        unit_id: res.unit_id,
      })
      .sort({
        order: 1,
      });

    const promises = [];
    let order = 1;

    for (const chapter of chapters) {
      promises.push(
        this.chapterModel.updateOne(
          {
            _id: chapter._id,
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
      message: 'Se elimino el capitulo',
    };
  }
}
