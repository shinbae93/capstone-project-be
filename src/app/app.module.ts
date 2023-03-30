import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';
import { BranchModule } from './branch/branch.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { BrandModule } from './brand/brand.module';
import { RoleModule } from './role/role.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    ReviewModule,
    OrderModule,
    BrandModule,
    BranchModule,
    RoleModule,
    CustomerModule,
    PaymentModule,
  ],
})
export class AppModule {}
