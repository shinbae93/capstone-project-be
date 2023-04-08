import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressResolver } from './user-address.resolver';
import { UserAddressService } from './user-address.service';

describe('UserAddressResolver', () => {
  let resolver: UserAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAddressResolver, UserAddressService],
    }).compile();

    resolver = module.get<UserAddressResolver>(UserAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
