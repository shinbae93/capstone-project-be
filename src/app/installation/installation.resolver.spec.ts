import { Test, TestingModule } from '@nestjs/testing';
import { InstallationResolver } from './installation.resolver';
import { InstallationService } from './installation.service';

describe('InstallationResolver', () => {
  let resolver: InstallationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallationResolver, InstallationService],
    }).compile();

    resolver = module.get<InstallationResolver>(InstallationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
