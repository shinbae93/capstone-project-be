import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Enrolment } from 'src/database/entities/enrolment.entity'

@ObjectType()
export class EnrolmentsPagination extends Pagination<Enrolment>(Enrolment) {}
