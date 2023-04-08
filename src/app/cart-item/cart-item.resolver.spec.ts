import { Test, TestingModule } from '@nestjs/testing';
import { CartItemResolver } from './cart-item.resolver';
import { CartItemService } from './cart-item.service';

describe('CartItemResolver', () => {
  let resolver: CartItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItemResolver, CartItemService],
    }).compile();

    resolver = module.get<CartItemResolver>(CartItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
