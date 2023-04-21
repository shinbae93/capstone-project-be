import { Injectable } from '@nestjs/common';
import { CreateLessonCommentInput } from './dto/create-lesson-comment.input';
import { UpdateLessonCommentInput } from './dto/update-lesson-comment.input';

@Injectable()
export class LessonCommentService {
  create(createLessonCommentInput: CreateLessonCommentInput) {
    return 'This action adds a new lessonComment';
  }

  findAll() {
    return `This action returns all lessonComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonComment`;
  }

  update(id: number, updateLessonCommentInput: UpdateLessonCommentInput) {
    return `This action updates a #${id} lessonComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonComment`;
  }
}
