import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTutorRequestInput } from './dto/create-tutor-request.input'
import { UpdateTutorRequestInput } from './dto/update-tutor-request.input'
import { InjectRepository } from '@nestjs/typeorm'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { RoleId, TutorRequestStatus } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { User } from 'src/database/entities/user.entity'
import { UpdateStatusTutorRequestInput } from './dto/update-status-tutor-request.input'

@Injectable()
export class TutorRequestService {
  constructor(
    @InjectRepository(TutorRequest) private tutorRequestRepository: Repository<TutorRequest>
  ) {}

  findAll() {
    return this.tutorRequestRepository.find()
  }

  async findOne(
    criteria: FindOptionsWhere<TutorRequest> | FindOptionsWhere<TutorRequest>[]
  ): Promise<TutorRequest> {
    return await this.tutorRequestRepository.findOneBy(criteria)
  }

  async findOneIfExist(
    criteria: FindOptionsWhere<TutorRequest> | FindOptionsWhere<TutorRequest>[]
  ): Promise<TutorRequest> {
    const tutorRequest = await this.findOne(criteria)

    if (!tutorRequest) {
      throw new BadRequestException(ERROR_MESSAGE.TUTOR_REQUEST_NOT_FOUND)
    }

    return tutorRequest
  }

  async create(input: CreateTutorRequestInput, currentUser: User): Promise<TutorRequest> {
    if (currentUser.roleId === RoleId.TUTOR) {
      throw new BadRequestException(ERROR_MESSAGE.YOU_ARE_ALREADY_A_TUTOR)
    }

    const { cvImage } = input

    const request = this.tutorRequestRepository.create({
      cvImage,
      userId: currentUser.id,
      status: TutorRequestStatus.PENDING,
    })

    return await this.tutorRequestRepository.save(request)
  }

  async update(id: string, input: UpdateTutorRequestInput): Promise<TutorRequest> {
    const tutorRequest = await this.findOneIfExist({ id })

    this.tutorRequestRepository.merge(tutorRequest, input)

    return await this.tutorRequestRepository.save(tutorRequest)
  }

  async updateStatus(id: string, input: UpdateStatusTutorRequestInput): Promise<TutorRequest> {
    const tutorRequest = await this.findOneIfExist({ id })

    this.tutorRequestRepository.merge(tutorRequest, input)

    return await this.tutorRequestRepository.save(tutorRequest)
  }

  async remove(id: string) {
    await this.findOneIfExist({ id })
    await this.tutorRequestRepository.delete({ id })

    return true
  }
}
