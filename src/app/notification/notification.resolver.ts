import { Resolver, Query, Args, ID } from '@nestjs/graphql'
import { NotificationService } from './notification.service'
import { Notification } from '../../database/entities/notification.entity'
import { NotificationPagination } from './dto/notification-pagination.output'

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => NotificationPagination, { name: 'notifications' })
  findAll() {
    return this.notificationService.findAll()
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.notificationService.findOne(id)
  }
}
