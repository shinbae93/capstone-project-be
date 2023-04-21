import { Resolver } from '@nestjs/graphql';
import { InstallationService } from './installation.service';

@Resolver()
export class InstallationResolver {
  constructor(private readonly installationService: InstallationService) {}
}
