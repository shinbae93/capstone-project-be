import { registerEnumType } from '@nestjs/graphql'

export enum ClassMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

registerEnumType(ClassMethod, {
  name: 'ClassMethod',
})

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

registerEnumType(Gender, {
  name: 'Gender',
})

export enum RoleId {
  ADMIN = 'b9961f54-9748-424d-9453-7dbeec05e212',
  TUTOR = '33358dbf-7697-4324-bccd-334a3691b84b',
  STUDENT = '9a588a6e-c21e-48f5-a8da-307724a76b89',
}

export enum TutorRequestStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

registerEnumType(TutorRequestStatus, {
  name: 'TutorRequestStatus',
})

export enum CourseStatus {
  UP_COMING = 'UP_COMING',
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED',
}

registerEnumType(CourseStatus, {
  name: 'CourseStatus',
})

export enum EnrolmentStatus {
  UP_COMING = 'UP_COMING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

registerEnumType(EnrolmentStatus, {
  name: 'EnrolmentStatus',
})

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
})

export enum SortNullDirection {
  NULLS_FIRST = 'NULLS FIRST',
  NULLS_LAST = 'NULLS LAST',
}

registerEnumType(SortNullDirection, {
  name: 'SortNullDirection',
})
