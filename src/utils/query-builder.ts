import { SortField } from 'src/base/types/query-params.type'
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export function joinRelations<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, relations: string[]) {
  relations.forEach((relation) => {
    let relationField = relation
    let alias = relation
    if (relation.split('.').length > 1) {
      relationField = relation.split('.')[1]
      alias = `${relation.split('.')[0]}.${relationField}`
    }

    queryBuilder.leftJoinAndSelect(relationField, alias)
  })
}

export function applySorting<T>(queryBuilder: SelectQueryBuilder<T>, sorting: SortField[]) {
  queryBuilder.addOrderBy('id', 'ASC', 'NULLS LAST')
  sorting.forEach((sortField) => {
    queryBuilder.addOrderBy(sortField.field, sortField.direction, sortField.nulls)
  })
}
