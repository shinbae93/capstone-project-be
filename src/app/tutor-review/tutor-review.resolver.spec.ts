import { Test, TestingModule } from '@nestjs/testing';
import { TutorReviewResolver } from './tutor-review.resolver';
import { TutorReviewService } from './tutor-review.service';

describe('TutorReviewResolver', () => {
  let resolver: TutorReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorReviewResolver, TutorReviewService],
    }).compile();

    resolver = module.get<TutorReviewResolver>(TutorReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
