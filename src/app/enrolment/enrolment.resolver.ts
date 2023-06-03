import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from 'src/database/entities/user.entity'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { Enrolment } from '../../database/entities/enrolment.entity'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { EnrolmentService } from './enrolment.service'

@Resolver(() => Enrolment)
export class EnrolmentResolver {
  constructor(private readonly enrolmentService: EnrolmentService) {}

  @Mutation(() => Enrolment)
  createEnrolment(@Args('input') input: CreateEnrolmentInput, @CurrentUser() currentUser: User) {
    return this.enrolmentService.create(input, currentUser.id)
  }

  @Query(() => [Enrolment], { name: 'enrolments' })
  findAll() {
    return this.enrolmentService.findAll()
  }

  @Query(() => Enrolment, { name: 'enrolment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.enrolmentService.findOne({ id })
  }

  @Mutation(() => Boolean)
  removeEnrolment(@Args('id', { type: () => ID }) id: string) {
    return this.enrolmentService.remove(id)
  }
}
