import { Test, TestingModule } from '@nestjs/testing';
import { EnrolmentResolver } from './enrolment.resolver';
import { EnrolmentService } from './enrolment.service';

describe('EnrolmentResolver', () => {
  let resolver: EnrolmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrolmentResolver, EnrolmentService],
    }).compile();

    resolver = module.get<EnrolmentResolver>(EnrolmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
