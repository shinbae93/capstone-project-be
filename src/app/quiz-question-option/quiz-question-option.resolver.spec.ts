import { Test, TestingModule } from '@nestjs/testing';
import { QuizQuestionOptionResolver } from './quiz-question-option.resolver';
import { QuizQuestionOptionService } from './quiz-question-option.service';

describe('QuizQuestionOptionResolver', () => {
  let resolver: QuizQuestionOptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizQuestionOptionResolver, QuizQuestionOptionService],
    }).compile();

    resolver = module.get<QuizQuestionOptionResolver>(QuizQuestionOptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
