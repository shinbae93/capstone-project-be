import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { ClassService } from './class.service'
import { Class } from '../../database/entities/class.entity'
import { CreateClassInput } from './dto/create-class.input'
import { UpdateClassInput } from './dto/update-class.input'
import { CurrentUser } from 'src/decorator/current-user.decorator'
import { User } from 'src/database/entities/user.entity'

@Resolver(() => Class)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Mutation(() => Class)
  createClass(@Args('input') input: CreateClassInput, @CurrentUser() currentUser: User) {
    return this.classService.create(input, currentUser.id)
  }

  @Query(() => [Class], { name: 'classes' })
  findAll() {
    return this.classService.findAll()
  }

  @Query(() => Class, { name: 'class' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.classService.findOne({ id })
  }

  @Mutation(() => Class)
  updateClass(@Args('input') input: UpdateClassInput, @CurrentUser() currentUser: User) {
    return this.classService.update(input.id, input, currentUser.id)
  }

  @Mutation(() => Boolean)
  removeClass(@Args('id', { type: () => ID }) id: string) {
    return this.classService.remove(id)
  }
}
