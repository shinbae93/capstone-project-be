import { Injectable } from '@nestjs/common'
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { DataSource, EntityTarget, Not, ObjectLiteral } from 'typeorm'

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueStringConstraint implements ValidatorConstraintInterface {
  constructor(private readonly datasource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, exceptProperty = 'id'] = args.constraints

    if (!value || !args.constraints?.length || !entity) {
      return false
    }

    const property = args.property

    const query = this.datasource
      .getRepository(entity)
      .createQueryBuilder()
      .where(`LOWER(${property}) = LOWER(:value)`, { value })

    const exceptPropertyValue = args.object[exceptProperty]
    if (exceptPropertyValue) query.andWhere({ [exceptProperty]: Not(exceptPropertyValue) })

    const record = await query.getOne()

    return !record
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.constraints[0].name}'s ${args.property} is already existed.`
  }
}

export function UniqueString(
  entity: EntityTarget<ObjectLiteral>,
  exceptField: string = null,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, exceptField],
      validator: UniqueStringConstraint,
    })
  }
}
