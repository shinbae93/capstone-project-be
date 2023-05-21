import { Module } from '@nestjs/common'
import { TutorDetailService } from './tutor-detail.service'
import { TutorDetailResolver } from './tutor-detail.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TutorDetail])],
  providers: [TutorDetailResolver, TutorDetailService],
})
export class TutorDetailModule {}
