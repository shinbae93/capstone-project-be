import { LessonTime } from 'src/database/entities/sub-object/lesson-time'
import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'

export type Schedule = {
  startDate: Date
  endDate: Date
  schedule: ScheduleTime[]
}

export function isScheduleTimeOverlapped(firstDate: ScheduleTime, secondDate: ScheduleTime) {
  return (
    firstDate.dayOfWeek === secondDate.dayOfWeek &&
    (!(firstDate.endTime < secondDate.startTime) || !(firstDate.startTime > secondDate.endTime))
  )
}

export function isScheduleTimeArrayOverllaped(schedule: ScheduleTime[]) {
  for (let i = 0; i < schedule.length; i++) {
    const firstDate = schedule[i]

    for (let j = i + 1; j < schedule.length; j++) {
      const secondDate = schedule[j]

      if (isScheduleTimeOverlapped(firstDate, secondDate)) {
        return false
      }
    }
  }

  return true
}

export function isTwoScheduleTimeArrayOverllaped(firstSchedule: ScheduleTime[], secondSchedule: ScheduleTime[]) {
  for (const schedule of firstSchedule) {
    const isOverlapped = secondSchedule.filter((item) => isScheduleTimeOverlapped(item, schedule))

    if (isOverlapped.length) {
      return true
    }
  }

  return false
}

export function isScheduleOverlapped(firstSchedule: Schedule, secondSchedule: Schedule) {
  if (!(firstSchedule.endDate < secondSchedule.startDate) || !(firstSchedule.startDate > secondSchedule.endDate)) {
    const firstScheduleDates = firstSchedule.schedule
    const secondScheduleDates = secondSchedule.schedule

    if (isTwoScheduleTimeArrayOverllaped(firstScheduleDates, secondScheduleDates)) return true
  }

  return false
}

export function convertScheduleListToMap(schedule: ScheduleTime[]) {
  return new Map(
    schedule.map((item) => [
      item.dayOfWeek,
      {
        startTime: item.startTime,
        endTime: item.endTime,
      },
    ])
  )
}

export function convertLessonTimeToString(lessonTime: LessonTime) {
  return `${lessonTime.hour.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${lessonTime.minute.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`
}
