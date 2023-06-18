import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorDetail } from 'src/database/entities/tutor-detail.entity'
import { User } from 'src/database/entities/user.entity'
import { FindOptionsWhere, In, Repository } from 'typeorm'

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

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
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
}
