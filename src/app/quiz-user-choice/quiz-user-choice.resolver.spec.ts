import { Test, TestingModule } from '@nestjs/testing';
import { QuizUserChoiceResolver } from './quiz-user-choice.resolver';
import { QuizUserChoiceService } from './quiz-user-choice.service';

describe('QuizUserChoiceResolver', () => {
  let resolver: QuizUserChoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizUserChoiceResolver, QuizUserChoiceService],
    }).compile();

    resolver = module.get<QuizUserChoiceResolver>(QuizUserChoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
