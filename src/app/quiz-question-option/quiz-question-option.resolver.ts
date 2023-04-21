import { Resolver } from '@nestjs/graphql';
import { QuizQuestionOptionService } from './quiz-question-option.service';

@Resolver()
export class QuizQuestionOptionResolver {
  constructor(private readonly quizQuestionOptionService: QuizQuestionOptionService) {}
}
