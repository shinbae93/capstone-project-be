import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionResolver } from './quiz-question.resolver';

@Module({
  providers: [QuizQuestionResolver, QuizQuestionService]
})
export class QuizQuestionModule {}
