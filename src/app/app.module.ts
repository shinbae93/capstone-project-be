import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';
import { BranchModule } from './branch/branch.module';
import { RoleModule } from './role/role.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
