import { Injectable } from '@nestjs/common'
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { uniq } from 'lodash'
import { DataSource, EntityTarget, In, ObjectLiteral } from 'typeorm'

@Injectable()
@ValidatorConstraint({ async: true })
export class EntityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly datasource: DataSource) {}

  async validate(value: string | string[], args: ValidationArguments) {
    if (!value) {
      return true
    }

    if (!args.constraints?.length) {
      return false
    }

    const entity = args.constraints[0]
    const entityIds = Array.isArray(value) ? uniq(value) : [value]

    const existingEntities = await this.datasource
      .getRepository(entity)
      .findBy({ id: In(entityIds) })

    return entityIds.length === existingEntities.length
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.constraints?.[0].name} doesn't exist`
  }
}

export function EntityExists(
  entity: EntityTarget<ObjectLiteral>,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: EntityExistsConstraint,
    })
  }
}
