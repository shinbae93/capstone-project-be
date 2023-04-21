import { Resolver } from '@nestjs/graphql';
import { QuizUserChoiceService } from './quiz-user-choice.service';

@Resolver()
export class QuizUserChoiceResolver {
  constructor(private readonly quizUserChoiceService: QuizUserChoiceService) {}
}
