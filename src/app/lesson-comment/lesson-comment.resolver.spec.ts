import { Test, TestingModule } from '@nestjs/testing';
import { LessonCommentResolver } from './lesson-comment.resolver';
import { LessonCommentService } from './lesson-comment.service';

describe('LessonCommentResolver', () => {
  let resolver: LessonCommentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonCommentResolver, LessonCommentService],
    }).compile();

    resolver = module.get<LessonCommentResolver>(LessonCommentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
