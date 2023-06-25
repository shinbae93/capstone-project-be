import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Assignment } from 'src/database/entities/assignment.entity'
import { AssignmentService } from './assignment.service'
import { AssignmentPagination } from './dto/assignment-pagination.output'
import { AssignmentFilterParams, AssignmentQueryParams } from './dto/assignment-query-params.input'
import { SubmitAssignmentInput } from './dto/submit-assignment.input'
import { FeedbackAssignmentInput } from './dto/feedback-assignmen.input'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from 'src/database/entities/user.entity'
import { Quiz } from 'src/database/entities/quiz.entity'
import { AssignmentLoader } from './assignment.loader'

@Resolver(() => Assignment)
export class AssignmentResolver {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly assignmentLoader: AssignmentLoader
  ) {}

  @Query(() => [Assignment], { name: 'assignmentsWithoutPagination' })
  findAllWithoutPagination(@Args('queryParams') queryParams: AssignmentFilterParams) {
    return this.assignmentService.findAllWithoutPagination(queryParams)
  }

  @Query(() => AssignmentPagination, { name: 'assignments' })
  findAll(@Args('queryParams') queryParams: AssignmentQueryParams) {
    return this.assignmentService.findAll(queryParams)
  }

  @Query(() => AssignmentPagination, { name: 'myAssignments' })
  findMyAssignments(@Args('queryParams') queryParams: AssignmentQueryParams, @CurrentUser() currentUser: User) {
    return this.assignmentService.findAll(queryParams, currentUser.id)
  }

  @Query(() => Assignment, { name: 'assignment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.assignmentService.findOne(id)
  }

  @Mutation(() => Assignment, { name: 'submitAssignment' })
  submitAssignment(@Args('input') input: SubmitAssignmentInput) {
    return this.assignmentService.submit(input.id, input)
  }

  @Mutation(() => Assignment, { name: 'feedbackAssignment' })
  feedbackAssignment(@Args('input') input: FeedbackAssignmentInput) {
    return this.assignmentService.feedback(input.id, input)
  }

  @ResolveField('quiz', () => Quiz)
  async getQuiz(@Parent() assignment: Assignment) {
    const { quizId } = assignment
    return this.assignmentLoader.batchQuizzes.load(quizId)
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() assignment: Assignment) {
    const { userId } = assignment
    return this.assignmentLoader.batchUsers.load(userId)
  }
}
