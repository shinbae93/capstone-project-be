import { Resolver } from '@nestjs/graphql';
import { QuizQuestionService } from './quiz-question.service';

@Resolver()
export class QuizQuestionResolver {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}
}
