import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressResolver } from './user-address.resolver';

@Module({
  providers: [UserAddressResolver, UserAddressService]
})
export class UserAddressModule {}
