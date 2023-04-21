import { Module } from '@nestjs/common';
import { LessonCommentService } from './lesson-comment.service';
import { LessonCommentResolver } from './lesson-comment.resolver';

@Module({
  providers: [LessonCommentResolver, LessonCommentService]
})
export class LessonCommentModule {}
