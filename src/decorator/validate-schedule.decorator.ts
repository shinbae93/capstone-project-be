import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { ERROR_MESSAGE } from 'src/common/error-message'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import { isScheduleTimeArrayOverllaped } from 'src/util/schedule'

@ValidatorConstraint()
export class ValidateScheduleConstraint implements ValidatorConstraintInterface {
  async validate(value: ScheduleTime[]): Promise<boolean> {
    if (!value || !value.length) {
      return false
    }

    return isScheduleTimeArrayOverllaped(value)
  }

  defaultMessage() {
    return ERROR_MESSAGE.INVALID_SCHEDULE
  }
}

export function ValidateSchedule(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValidateScheduleConstraint,
    })
  }
}
