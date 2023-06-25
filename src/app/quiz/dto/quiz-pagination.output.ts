import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Quiz } from 'src/database/entities/quiz.entity'

@ObjectType()
export class QuizPagination extends Pagination<Quiz>(Quiz) {}
