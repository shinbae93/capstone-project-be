import { Module } from '@nestjs/common';
import { QuizQuestionOptionService } from './quiz-question-option.service';
import { QuizQuestionOptionResolver } from './quiz-question-option.resolver';

@Module({
  providers: [QuizQuestionOptionResolver, QuizQuestionOptionService]
})
export class QuizQuestionOptionModule {}
