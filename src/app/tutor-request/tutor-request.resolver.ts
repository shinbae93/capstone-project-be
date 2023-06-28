import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { CreateTutorRequestInput } from './dto/create-tutor-request.input'
import { TutorRequestPagination } from './dto/tutor-request-pagination.output'
import { TutorRequestQueryParams } from './dto/tutor-request-query-params.input'
import { UpdateTutorRequestStatusInput } from './dto/update-tutor-request-status.input'
import { UpdateTutorRequestInput } from './dto/update-tutor-request.input'
import { TutorRequestLoader } from './tutor-request.loader'
import { TutorRequestService } from './tutor-request.service'

@Resolver(() => TutorRequest)
export class TutorRequestResolver {
  constructor(
    private readonly tutorRequestService: TutorRequestService,
    private readonly tutorRequestLoader: TutorRequestLoader
  ) {}

  @Query(() => TutorRequestPagination, { name: 'tutorRequests' })
  findAll(@Args('queryParams') queryParams: TutorRequestQueryParams) {
    return this.tutorRequestService.findAll(queryParams)
  }

  @Query(() => TutorRequest, { name: 'tutorRequest' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tutorRequestService.findOne({ id })
  }

  @Mutation(() => TutorRequest, { name: 'createTutorRequest' })
  createTutorRequest(@Args('input') input: CreateTutorRequestInput, @CurrentUser() currentUser: User) {
    return this.tutorRequestService.create(input, currentUser)
  }

  @Mutation(() => TutorRequest, { name: 'updateTutorRequest' })
  updateTutorRequest(@Args('input') input: UpdateTutorRequestInput) {
    return this.tutorRequestService.update(input.id, input)
  }

  @Mutation(() => TutorRequest, { name: 'updateTutorRequestStatus' })
  updateTutorRequestStatus(@Args('input') input: UpdateTutorRequestStatusInput) {
    return this.tutorRequestService.updateStatus(input.id, input)
  }

  @Mutation(() => Boolean, { name: 'removeTutorRequest' })
  removeTutorRequest(@Args('id', { type: () => ID }) id: string) {
    return this.tutorRequestService.remove(id)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() tutorRequest: TutorRequest) {
    return this.tutorRequestLoader.batchUsers.load(tutorRequest.userId)
  }
}
