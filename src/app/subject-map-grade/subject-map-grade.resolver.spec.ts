import { Test, TestingModule } from '@nestjs/testing';
import { SubjectMapGradeResolver } from './subject-map-grade.resolver';
import { SubjectMapGradeService } from './subject-map-grade.service';

describe('SubjectMapGradeResolver', () => {
  let resolver: SubjectMapGradeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectMapGradeResolver, SubjectMapGradeService],
    }).compile();

    resolver = module.get<SubjectMapGradeResolver>(SubjectMapGradeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
