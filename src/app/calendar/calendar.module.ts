import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Calendar } from 'src/database/entities/calendar.entity'
import { Class } from 'src/database/entities/class.entity'
import { CalendarLoader } from './calendar.loader'
import { CalendarResolver } from './calendar.resolver'
import { CalendarService } from './calendar.service'

@Module({
  imports: [TypeOrmModule.forFeature([Calendar, Class])],
  providers: [CalendarResolver, CalendarService, CalendarLoader],
  exports: [CalendarService],
})
export class CalendarModule {}
