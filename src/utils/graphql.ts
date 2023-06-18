import { FieldNode, FragmentSpreadNode, GraphQLResolveInfo, ResponsePath, SelectionSetNode } from 'graphql'
import { flatMap } from 'lodash'
import { ObjectLiteral } from 'typeorm'

function instanceOfFieldNode(object: ObjectLiteral): object is FieldNode {
  return 'kind' in object && object.kind === 'Field'
}
function instanceOfFragmentSpreadNode(object: ObjectLiteral): object is FragmentSpreadNode {
  return 'kind' in object && object.kind === 'FragmentSpread'
}

const getQueriedName = (field: FieldNode) => (field.alias ? field.alias.value : field.name.value)

const getPath = (path: ResponsePath, agg: string[] = []): string[] => {
  if (typeof path.key !== 'string') {
    throw new Error(`Unhandled non string key in graphql path: "${path.key}"`)
  }
  const newAgg = agg.concat([path.key])
  if (path.prev) {
    return getPath(path.prev, newAgg)
  }
  return newAgg
}

const getFieldNodesWithResolvedFragments = (info: GraphQLResolveInfo, selectionSet: SelectionSetNode) => {
  // extract fragment field nodes
  const fragmentNodes = selectionSet.selections.filter(instanceOfFragmentSpreadNode)
  const fragmendFields = flatMap(fragmentNodes, (f: FragmentSpreadNode) =>
    info.fragments[f.name.value].selectionSet.selections.filter(instanceOfFieldNode)
  )
  // extract "normal" nodes
  const fields = selectionSet.selections.filter(instanceOfFieldNode)
  return fields.concat(fragmendFields)
}

const getSelectionSetFromPath = (
  info: GraphQLResolveInfo,
  selectionSet: SelectionSetNode,
  path: string[]
): SelectionSetNode => {
  const fieldNodes = getFieldNodesWithResolvedFragments(info, selectionSet)
  const fieldNode = fieldNodes.find((s) => getQueriedName(s) === path[0])
  if (!fieldNode) {
    return null
  }
  if (path.length <= 1) {
    return fieldNode.selectionSet
  }
  return getSelectionSetFromPath(info, fieldNode.selectionSet, path.slice(1, path.length))
}

export const hasSelectedField = (info: GraphQLResolveInfo, childFieldPath: string[]) => {
  const selectionSet = getSelectionSetFromPath(
    info,
    info.operation.selectionSet,
    getPath(info.path)
      .reverse()
      .concat(childFieldPath.slice(0, childFieldPath.length - 1))
  )
  if (!selectionSet) {
    return false
  }
  const fieldNodes = getFieldNodesWithResolvedFragments(info, selectionSet)
  const fieldExists = fieldNodes.some((s) => getQueriedName(s) === childFieldPath[childFieldPath.length - 1])

  return fieldExists
}
