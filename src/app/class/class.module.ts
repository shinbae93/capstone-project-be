import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';

@Module({
  providers: [ClassResolver, ClassService]
})
export class ClassModule {}
