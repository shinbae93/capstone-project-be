import * as moment from 'moment'
import { CourseStatus } from 'src/common/enums'

export function getCourseStatus(startDate: Date, endDate: Date) {
  const now = moment()
  const start = moment(startDate)
  const end = moment(endDate)

  let status: string

  if (now.isBefore(start)) {
    status = CourseStatus.UP_COMING
  } else if (now.isSameOrAfter(start) && now.isSameOrBefore(end)) {
    status = CourseStatus.IN_PROGRESS
  } else {
    status = CourseStatus.ENDED
  }

  return status
}
