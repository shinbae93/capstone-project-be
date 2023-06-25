import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Quiz } from '../../database/entities/quiz.entity'
import { CreateQuizInput } from './dto/create-quiz.input'
import { UpdateQuizInput } from './dto/update-quiz.input'
import { QuizService } from './quiz.service'
import { QuizPagination } from './dto/quiz-pagination.output'
import { QuizQueryParams } from './dto/quiz-query-params.input'
import { QuizLoader } from './quiz.loader'
import { Assignment } from 'src/database/entities/assignment.entity'
import { Class } from 'src/database/entities/class.entity'

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService, private readonly quizLoader: QuizLoader) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('input') createQuizInput: CreateQuizInput) {
    return this.quizService.create(createQuizInput)
  }

  @Query(() => QuizPagination, { name: 'quizzes' })
  findAll(@Args('queryParams') queryParams: QuizQueryParams) {
    return this.quizService.findAll(queryParams)
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.quizService.findOne(id)
  }

  @Mutation(() => Quiz)
  updateQuiz(@Args('input') input: UpdateQuizInput) {
    return this.quizService.update(input.id, input)
  }

  @Mutation(() => Boolean)
  removeQuiz(@Args('id', { type: () => ID }) id: string) {
    return this.quizService.remove(id)
  }

  @ResolveField('assignments', () => [Assignment], { nullable: true })
  async getAssignments(@Parent() quiz: Quiz) {
    return this.quizLoader.batchAssignments.load(quiz.id)
  }

  @ResolveField('class', () => Class, { nullable: true })
  async getClasses(@Parent() quiz: Quiz) {
    return this.quizLoader.batchClasses.load(quiz.classId)
  }
}
