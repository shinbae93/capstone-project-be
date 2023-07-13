import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { User } from 'src/database/entities/user.entity'
import { FindOptionsWhere, In, Repository } from 'typeorm'
import { UserQueryParams } from './dto/user-query-params.input'
import { applySorting } from 'src/utils/query-builder'
import { paginate } from 'nestjs-typeorm-paginate'
import { UpdateBlockStatusUserInput } from './dto/update-block-status-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(TutorDetail) private tutorDetailRepository: Repository<TutorDetail>
  ) {}

  async findOne(criteria: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    const user = await this.userRepository.findOneBy(criteria)

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND)
    }

    return user
  }

  async findAll(queryParams: UserQueryParams) {
    const { sorting, pagination } = queryParams

    const queryBuilder = this.userRepository.createQueryBuilder()

    if (queryParams.filters) {
      const { roleIds, email, fullName, phoneNumber } = queryParams.filters

      if (fullName) {
        queryBuilder.andWhere(`unaccent(LOWER("User"."fullName")) ILIKE unaccent(LOWER(:fullName))`, {
          fullName: `%${fullName}%`,
        })
      }
      if (email) {
        queryBuilder.andWhere(`LOWER("User"."email") ILIKE LOWER(:email)`, {
          email: `%${email}%`,
        })
      }
      if (roleIds) {
        queryBuilder.andWhere(`"User"."roleId" = ANY(ARRAY[:...roleIds]::uuid[])`, { roleIds })
      }
      if (phoneNumber) {
        queryBuilder.andWhere(`"User"."phoneNumber" = :phoneNumber`, { phoneNumber })
      }
    }

    if (sorting) {
      applySorting(queryBuilder, sorting)
    }

    return paginate(queryBuilder, pagination)
  }

  findManyByIds(ids: string[]) {
    return this.userRepository.findBy({ id: In(ids) })
  }

  async createTutor(id: string, cv: string) {
    await this.userRepository.update({ id }, { roleId: RoleId.TUTOR })
    await this.tutorDetailRepository.save(this.tutorDetailRepository.create({ cv, userId: id }))
  }

  async delete(id: string) {
    await this.findOne({ id })
    await this.userRepository.delete({ id })

    return true
  }

  async updateBlockStatus(input: UpdateBlockStatusUserInput) {
    const { id, isBlocked } = input
    const user = await this.findOne({ id })
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND)
    }

    await this.userRepository.update({ id }, { isBlocked })

    return true
  }
}
