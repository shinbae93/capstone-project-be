import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as DataLoader from 'dataloader'
import { Class } from 'src/database/entities/class.entity'
import { In, Repository } from 'typeorm'

@Injectable({ scope: Scope.REQUEST })
export class CalendarLoader {
  constructor(@InjectRepository(Class) private classRepository: Repository<Class>) {}

  public readonly batchClasses = new DataLoader(async (classIds: string[]) => {
    const classes = await this.classRepository.findBy({ id: In(classIds) })
    const classesMap = new Map(classes.map((item) => [item.id, item]))
    return classIds.map((classId) => classesMap.get(classId))
  })
}
