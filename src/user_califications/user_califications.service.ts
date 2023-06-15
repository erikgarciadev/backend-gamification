import { Injectable } from '@nestjs/common';
import {
  CreateUserCalificationDto,
  EvaluationDto,
} from './dto/create-user_calification.dto';
import { UpdateUserCalificationDto } from './dto/update-user_calification.dto';
import {
  UserCalifications,
  UserCalificationsDocument,
} from './schema/user_calification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapters, ChaptersDocument } from 'src/chapters/schema/chapter.schema';
import { Users, UsersDocument } from 'src/users/schema/user.schema';
import { QUESTION_TYPES } from 'src/utils/constants';
import {
  UserBadges,
  UserBadgesDocument,
} from 'src/user_badges/schema/user_badge.schema';
import { Badges, BadgesDocument } from 'src/badges/schema/badge.schema';

@Injectable()
export class UserCalificationsService {
  constructor(
    @InjectModel(UserCalifications.name)
    private readonly userCalificationModel: Model<UserCalificationsDocument>,
    @InjectModel(Chapters.name)
    private readonly chapterModel: Model<ChaptersDocument>,
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
    @InjectModel(UserBadges.name)
    private readonly userBadgeModel: Model<UserBadgesDocument>,
    @InjectModel(Badges.name)
    private readonly badgeModel: Model<BadgesDocument>, // private readonly chapterService: ChaptersService,
  ) {}

  create(createUserCalificationDto: CreateUserCalificationDto) {
    return this.userCalificationModel.create({
      ...createUserCalificationDto,
    });
  }

  async evaluation(evaluationDto: EvaluationDto) {
    const { questions, user_id, chapter_id } = evaluationDto;

    //get chapter
    const chapter = await this.chapterModel.findOne({
      deleted: false,
      _id: chapter_id,
    });

    const questionsChapter = chapter.questions;

    const unit_id = chapter.unit_id;

    let pointsOld = 0;

    const findCalification = await this.userCalificationModel.findOne({
      chapter_id: chapter_id,
      user_id,
    });

    if (findCalification) {
      pointsOld = findCalification.points;
    }

    const feedback = [];

    //correct question = 10 points
    let corrects = 0;
    for (let index = 0; index < questions.length; index++) {
      const questionChapter = questionsChapter[index];
      const questionUser = questions[index];

      if (questionUser.type === QUESTION_TYPES.TRUE_OR_FALSE) {
        const value = questionChapter?.is_correct ?? null;
        const valueUser = questionUser?.user_select ?? null;

        if (valueUser === null) {
          feedback.push({
            ...questionUser,
            correct: false,
          });
          continue;
        }

        if (valueUser === value) {
          corrects++;
          feedback.push({
            ...questionUser,
            correct: true,
          });
          continue;
        }
        feedback.push({
          ...questionUser,
          correct: false,
        });
      }

      if (questionUser.type === QUESTION_TYPES.MULTIPLE) {
        const optionsUser = questionUser?.options ?? [];
        const optionsQuestion = questionChapter?.options ?? [];

        const correctsOptions = optionsQuestion.filter(
          (option) => option.is_correct === true,
        );

        let correctOption = 0;

        for (let i = 0; i < optionsQuestion.length; i++) {
          const optionUser = optionsUser[i];
          const option = optionsQuestion[i];

          const value = option?.is_correct ?? null;
          const valueUser = optionUser?.user_select ?? null;

          if (valueUser === null) continue;

          if (value) {
            if (valueUser === value) correctOption++;
          }
        }

        if (correctsOptions.length === correctOption) {
          corrects++;
          feedback.push({
            ...questionUser,
            correct: true,
          });
          continue;
        }

        feedback.push({
          ...questionUser,
          correct: false,
        });
      }

      if (questionUser.type === QUESTION_TYPES.UNIQUE) {
        const optionsUser = questionUser?.options ?? [];
        const optionsQuestion = questionChapter?.options ?? [];

        let correctOption = 0;

        for (let i = 0; i < optionsQuestion.length; i++) {
          const optionUser = optionsUser[i];
          const option = optionsQuestion[i];

          const value = option?.is_correct ?? null;
          const valueUser = optionUser?.user_select ?? null;

          if (valueUser === null) continue;

          if (value) {
            if (valueUser === value) correctOption++;
          }
        }

        if (1 === correctOption) {
          corrects++;
          feedback.push({
            ...questionUser,
            correct: true,
          });
          continue;
        }

        feedback.push({
          ...questionUser,
          correct: false,
        });
      }
    }

    const pointsNew = corrects * 10;
    let addPoints = pointsNew;

    if (pointsNew > pointsOld) {
      addPoints = pointsNew - pointsOld;
    }

    //create calification
    await this.create({
      unit_id,
      chapter_id,
      user_id,
      points: pointsNew,
    });

    //validate approved
    const totalPoints = questions.length * 10;
    let approved = false;

    let percentage = 0;
    if (totalPoints !== 0) {
      percentage = (pointsNew / totalPoints) * 100;
    }

    //add points y coins
    const findUser = await this.userModel.findOne({
      deleted: false,
      _id: user_id,
    });

    const pointsUser = findUser.points + addPoints;

    findUser.points = pointsUser;
    findUser.coins = findUser.coins + addPoints;

    findUser.save();

    if (percentage >= 60) {
      approved = true;
    }

    //badges
    let win_badge = false;
    const userBadges = await this.userBadgeModel.find({
      deleted: false,
      user_id,
    });

    const badges = await this.badgeModel
      .find({
        deleted: false,
        points: {
          $lte: pointsUser,
        },
      })
      .sort({
        points: 1,
      });

    let badge_id = null;

    if (badges.length > userBadges.length) {
      const userBadgesIds = userBadges.map((data) => data._id);
      for (const badge of badges) {
        if (!userBadgesIds.includes(badge._id)) {
          badge_id = badge._id;
          win_badge = true;
          break;
        }
      }
    }

    if (win_badge) {
      await this.userBadgeModel.create({
        user_id,
        badge_id,
      });
    }

    return {
      approved,
      feedback,
      win_badge,
    };
  }

  findAll() {
    return `This action returns all userCalifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCalification`;
  }

  update(id: number, updateUserCalificationDto: UpdateUserCalificationDto) {
    return `This action updates a #${id} userCalification`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCalification`;
  }
}
