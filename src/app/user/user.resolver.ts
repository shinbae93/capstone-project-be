import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from '../../database/entities/user.entity'
import { UserService } from './user.service'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { UserLoader } from './user.loader'
import { Role } from 'src/database/entities/role.entity'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserPagination } from './dto/user-pagination.output'
import { UserQueryParams } from './dto/user-query-params.input'
import { UpdateBlockStatusUserInput } from './dto/update-block-status-user.input'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private userLoader: UserLoader,
    @InjectRepository(TutorDetail) private tutorDetailRepository: Repository<TutorDetail>
  ) {}

  @Query(() => User, { name: 'getMe' })
  findMe(@CurrentUser() user: User) {
    return user
  }

  @Query(() => User, { name: 'getUser' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne({ id })
  }

  @Query(() => UserPagination, { name: 'getUsers' })
  findAll(@Args('queryParams') queryParams: UserQueryParams) {
    return this.userService.findAll(queryParams)
  }

  @Mutation(() => Boolean, { name: 'updateBlockStatusUser' })
  updateBlockStatusUser(@Args('input') input: UpdateBlockStatusUserInput) {
    return this.userService.updateBlockStatus(input)
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.delete(id)
  }

  @ResolveField('role', () => Role)
  async getRole(@Parent() user: User) {
    const { roleId } = user
    return this.userLoader.batchRoles.load(roleId)
  }

  @ResolveField('tutorDetail', () => TutorDetail, { nullable: true })
  async getTutorDetail(@Parent() user: User) {
    const { id } = user
    return this.tutorDetailRepository.findOneBy({ userId: id })
  }
}
