import { Module } from '@nestjs/common';
import { QuizUserChoiceService } from './quiz-user-choice.service';
import { QuizUserChoiceResolver } from './quiz-user-choice.resolver';

@Module({
  providers: [QuizUserChoiceResolver, QuizUserChoiceService]
})
export class QuizUserChoiceModule {}
