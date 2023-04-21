import { Test, TestingModule } from '@nestjs/testing';
import { TutorReviewService } from './tutor-review.service';

describe('TutorReviewService', () => {
  let service: TutorReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorReviewService],
    }).compile();

    service = module.get<TutorReviewService>(TutorReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
