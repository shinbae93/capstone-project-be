import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { EnrolmentService } from './enrolment.service'
import { Enrolment } from '../../database/entities/enrolment.entity'
import { CreateEnrolmentInput } from './dto/create-enrolment.input'
import { CurrentUser } from 'src/decorator/current-user.decorator'
import { User } from 'src/database/entities/user.entity'

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
