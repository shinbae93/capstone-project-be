import { registerEnumType } from '@nestjs/graphql'

export enum ClassMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export enum RoleId {
  ADMIN = 'b9961f54-9748-424d-9453-7dbeec05e212',
  TUTOR = '33358dbf-7697-4324-bccd-334a3691b84b',
  STUDENT = '9a588a6e-c21e-48f5-a8da-307724a76b89',
}

export enum TutorRequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPT = 'ACCEPT',
}

registerEnumType(TutorRequestStatus, {
  name: 'TutorRequestStatus',
})

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
}

registerEnumType(CourseStatus, {
  name: 'CourseStatus',
})
