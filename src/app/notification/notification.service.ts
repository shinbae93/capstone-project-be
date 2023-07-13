import { Injectable } from '@nestjs/common'

@Injectable()
export class NotificationService {
  findAll() {
    return `This action returns all notification`
  }

  findOne(id: string) {
    return `This action returns a #${id} notification`
  }
}
