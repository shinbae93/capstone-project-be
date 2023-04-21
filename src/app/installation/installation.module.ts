import { Module } from '@nestjs/common';
import { InstallationService } from './installation.service';
import { InstallationResolver } from './installation.resolver';

@Module({
  providers: [InstallationResolver, InstallationService]
})
export class InstallationModule {}
