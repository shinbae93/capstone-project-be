import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Notification } from 'src/database/entities/notification.entity'

@ObjectType()
export class NotificationPagination extends Pagination<Notification>(Notification) {}
