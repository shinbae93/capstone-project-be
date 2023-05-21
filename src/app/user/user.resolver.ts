import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../../database/entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'getUser' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne({ id })
  }

  @Query(() => [User], { name: 'getUsers' })
  findAll() {
    return this.userService.findAll()
  }

  @Mutation(() => User, { name: 'deleteUser' })
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.delete(id)
  }
}
