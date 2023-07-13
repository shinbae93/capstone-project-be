import { ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/base/types/pagination.type'
import { Payment } from 'src/database/entities/payment.entity'

@ObjectType()
export class PaymentPagination extends Pagination<Payment>(Payment) {}
