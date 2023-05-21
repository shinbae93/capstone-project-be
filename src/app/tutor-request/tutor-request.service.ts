import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId, TutorRequestStatus } from 'src/common/enums'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { TutorRequest } from 'src/database/entities/tutor-request.entity'
import { User } from 'src/database/entities/user.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { CreateTutorRequestInput } from './dto/create-tutor-request.input'
import { UpdateStatusTutorRequestInput } from './dto/update-status-tutor-request.input'
import { UpdateTutorRequestInput } from './dto/update-tutor-request.input'

@Injectable()
export class TutorRequestService {
  constructor(
    @InjectRepository(TutorRequest) private tutorRequestRepository: Repository<TutorRequest>,
    private userService: UserService
  ) {}

  findAll() {
    return this.tutorRequestRepository.find()
  }

  async findOne(
    criteria: FindOptionsWhere<TutorRequest> | FindOptionsWhere<TutorRequest>[]
  ): Promise<TutorRequest> {
    const tutorRequest = await this.tutorRequestRepository.findOneBy(criteria)

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
    const tutorRequest = await this.tutorRequestRepository.findOneBy({ id })

    this.tutorRequestRepository.merge(tutorRequest, input)

    return await this.tutorRequestRepository.save(tutorRequest)
  }

  async updateStatus(id: string, input: UpdateStatusTutorRequestInput): Promise<TutorRequest> {
    const tutorRequest = await this.tutorRequestRepository.findOneBy({ id })

    const { status } = input
    let availableStatues = []

    switch (tutorRequest.status) {
      case TutorRequestStatus.PENDING:
        availableStatues = [TutorRequestStatus.PROCESSING, TutorRequestStatus.CANCELED]
        break
      case TutorRequestStatus.PROCESSING:
        availableStatues = [TutorRequestStatus.ACCEPTED, TutorRequestStatus.REJECTED]
        break
    }

    if (!availableStatues.includes(status)) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_STATUS)
    }

    if (status === TutorRequestStatus.ACCEPTED) {
      await this.userService.createTutor(tutorRequest.userId, tutorRequest.cvImage)
    }

    this.tutorRequestRepository.merge(tutorRequest, input)

    return await this.tutorRequestRepository.save(tutorRequest)
  }

  async remove(id: string) {
    const tutorRequest = await this.findOne({ id })

    const deletableStatuses = [TutorRequestStatus.PENDING, TutorRequestStatus.CANCELED] as string[]

    if (!deletableStatuses.includes(tutorRequest.status)) {
      throw new BadRequestException(ERROR_MESSAGE.CAN_NOT_DELETE_THIS_TUTOR_REQUEST)
    }

    await this.tutorRequestRepository.delete({ id })

    return true
  }
}
