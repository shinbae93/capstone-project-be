import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { User } from 'src/database/entities/user.entity'

@ObjectType()
export class UserPagination extends Pagination<User>(User) {}
