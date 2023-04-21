import { Test, TestingModule } from '@nestjs/testing';
import { QuizUserChoiceService } from './quiz-user-choice.service';

describe('QuizUserChoiceService', () => {
  let service: QuizUserChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizUserChoiceService],
    }).compile();

    service = module.get<QuizUserChoiceService>(QuizUserChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
