import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { CalendarService } from './calendar.service'
import { Calendar } from 'src/database/entities/calendar.entity'
import { CalendarQueryParams } from './dto/get-calendar.input'

@Resolver(() => Calendar)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [Calendar], { name: 'calendars' })
  findAll(@Args('queryParams', { nullable: true }) queryParams: CalendarQueryParams) {
    return this.calendarService.findAll(queryParams)
  }

  @Query(() => Calendar, { name: 'calendar' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.calendarService.findOne(id)
  }
}
