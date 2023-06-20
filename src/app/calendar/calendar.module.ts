import { Module } from '@nestjs/common'
import { CalendarService } from './calendar.service'
import { CalendarResolver } from './calendar.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Calendar } from 'src/database/entities/calendar.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])],
  providers: [CalendarResolver, CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
