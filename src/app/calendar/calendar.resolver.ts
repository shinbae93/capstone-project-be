import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Calendar } from 'src/database/entities/calendar.entity'
import { CalendarService } from './calendar.service'
import { CalendarQueryParams } from './dto/calendar-query-params.input'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from 'src/database/entities/user.entity'
import { CalendarLoader } from './calendar.loader'
import { Class } from 'src/database/entities/class.entity'

@Resolver(() => Calendar)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService, private readonly calendarLoader: CalendarLoader) {}

  @Query(() => [Calendar], { name: 'calendars' })
  findAll(@Args('queryParams', { nullable: true }) queryParams: CalendarQueryParams) {
    return this.calendarService.findAll(queryParams)
  }

  @Query(() => [Calendar], { name: 'myCalendars' })
  findMyCalendars(
    @Args('queryParams', { nullable: true }) queryParams: CalendarQueryParams,
    @CurrentUser() currentUser: User
  ) {
    return this.calendarService.findAll(queryParams, currentUser)
  }

  @Query(() => Calendar, { name: 'calendar' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.calendarService.findOne(id)
  }

  @ResolveField('class', () => Class, { nullable: true })
  async getClasses(@Parent() calendar: Calendar) {
    return this.calendarLoader.batchClasses.load(calendar.classId)
  }
}
