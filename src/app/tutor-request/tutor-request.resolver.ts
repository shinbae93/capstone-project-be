import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { TutorRequestService } from './tutor-request.service'
import { CreateTutorRequestInput } from './dto/create-tutor-request.input'
import { UpdateTutorRequestInput } from './dto/update-tutor-request.input'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from 'src/database/entities/user.entity'
import { UpdateTutorRequestStatusInput } from './dto/update-tutor-request-status.input'

@Resolver(() => TutorRequest)
export class TutorRequestResolver {
  constructor(private readonly tutorRequestService: TutorRequestService) {}

  @Query(() => [TutorRequest], { name: 'tutorRequests' })
  findAll() {
    return this.tutorRequestService.findAll()
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
}
