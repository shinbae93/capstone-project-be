import { EnrolmentStatus } from 'src/common/enums'
import * as moment from 'moment'

export function getEnrolmentStatus(startDate: Date, endDate: Date) {
  let status = EnrolmentStatus.UP_COMING

  if (moment().isBetween(startDate, endDate, null, '()')) {
    status = EnrolmentStatus.IN_PROGRESS
  }

  return status
}
