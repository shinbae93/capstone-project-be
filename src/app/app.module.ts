import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { UserAddressModule } from './user-address/user-address.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BrandModule,
    CartItemModule,
    CategoryModule,
    CustomerModule,
    UserModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    UserAddressModule,
    OrderItemModule,
    AuthModule,
  ],
})
export class AppModule {}
