import { ScheduleTime } from 'src/database/entities/sub-object/schedule-time'
import * as moment from 'moment'
import { InternalServerErrorException } from '@nestjs/common'

export type Schedule = {
  startDate: Date
  endDate: Date
  schedule: ScheduleTime[]
}

/**
 *
 * @param time must be in format HH:mm
 */
export function splitTime(time: string) {
  const splittedTime = time.split(':')
  return {
    hour: +splittedTime[0],
    minute: +splittedTime[1],
  }
}

export function timeToHours(time: string) {
  const splittedTime = splitTime(time)
  return splittedTime.hour + splittedTime.minute / 60
}

export function isScheduleTimeOverlapped(firstDate: ScheduleTime, secondDate: ScheduleTime) {
  const firstStartHours = timeToHours(firstDate.startTime)
  const firstEndHours = timeToHours(firstDate.endTime)
  const secondStartHours = timeToHours(secondDate.startTime)
  const secondEndHours = timeToHours(secondDate.endTime)

  return (
    firstDate.dayOfWeek === secondDate.dayOfWeek &&
    !(firstEndHours < secondStartHours || firstStartHours > secondEndHours)
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
    console.log('🚀 ~ file: schedule.ts:59 ~ isTwoScheduleTimeArrayOverllaped ~ isOverlapped:', isOverlapped)

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

export function getNextStart(schedule: ScheduleTime[], startDate: Date, endDate: Date, date = new Date()) {
  if (moment(date).isSameOrAfter(moment(endDate))) {
    throw new InternalServerErrorException()
  }

  let nextStart = moment(startDate)
  while (nextStart.isBefore(moment(date))) {
    nextStart.add(1, 'month')
  }

  if (nextStart.isAfter(moment(endDate))) {
    nextStart = moment(endDate)
  }

  return moment({
    year: nextStart.get('year'),
    month: nextStart.get('month'),
    day: nextStart.get('date'),
    hour: splitTime(schedule[0].startTime).hour,
    minute: splitTime(schedule[0].startTime).minute,
  })
}
