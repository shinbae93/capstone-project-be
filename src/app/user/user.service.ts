import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { User } from 'src/database/entities/user.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(criteria: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    return await this.userRepository.findOneBy(criteria)
  }

  async findOneIfExist(criteria: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    const user = await this.findOne(criteria)

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND)
    }

    return user
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async delete(id: string) {
    await this.findOneIfExist({ id })
    await this.userRepository.delete({ id })

    return true
  }
}
