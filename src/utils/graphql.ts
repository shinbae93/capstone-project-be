import { GraphQLResolveInfo } from 'graphql'
import { ResolveTree, parse, simplify } from 'graphql-parse-resolve-info'

export function hasField(field: string, info: GraphQLResolveInfo) {
  const parsedInfo = parse(info) as ResolveTree
  const simplifiedInfo = simplify(parsedInfo, info.returnType)

  return field in simplifiedInfo.fields
}
