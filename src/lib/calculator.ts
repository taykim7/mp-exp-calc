import type { EventsData, CalculationResult, ProgressStage } from './types'

// 현재 레벨에서 다음 레벨까지 필요한 경험치 계산
function getExpRequiredForLevel(level: number, levelExpTable: Record<number, number>): number {
  if (level >= 120) return 0
  // const nextLevel = level + 1
  // return (levelExpTable[nextLevel] as number) || 0
  return (levelExpTable[level] as number) || 0
}

// 경험치 누적으로 최종 레벨 계산
function calculateFinalLevel(
  currentLevel: number,
  currentExp: number,
  gainedExp: number,
  levelExpTable: Record<number, number>,
): { level: number; exp: number } {
  let level = currentLevel
  let exp = currentExp + gainedExp

  // 각 레벨별로 경험치 확인
  while (50 <= level && level < 120) {
    // 현재 필요 경험치
    const requiredExp = getExpRequiredForLevel(level, levelExpTable)

    if (exp >= requiredExp) {
      exp -= requiredExp
      level += 1
    } else {
      break
    }
  }

  // 최대 레벨 제한
  if (level > 120) {
    level = 120
  }

  return { level, exp }
}

// 메인 계산 함수
export function calculate(
  currentLevel: number,
  currentExp: number,
  eventCounts: Record<string, number>,
  eventsData: EventsData,
): CalculationResult {
  // 모든 이벤트에서 얻을 경험치 합계
  let totalGainedExp = 0
  const eventList: Array<{ eventId: string; eventName: string; count: number }> = []

  for (const difficulty of eventsData.difficulties) {
    for (const event of difficulty.events) {
      const count = eventCounts[event.id] || 0
      if (count > 0) {
        totalGainedExp += event.expReward * count
        eventList.push({
          eventId: event.id,
          eventName: event.name,
          count,
        })
      }
    }
  }

  // 최종 레벨 계산
  const { level: finalLevel, exp: finalExp } = calculateFinalLevel(
    currentLevel,
    currentExp,
    totalGainedExp,
    eventsData.levelExpTable,
  )

  // 총 진행 횟수
  const totalRuns = eventList.reduce((sum, e) => sum + e.count, 0)

  // 소요 일자 (1일 2회 진행)
  const estimatedDays = Math.ceil(totalRuns / 2)

  // 진행 단계 생성 (일일 2회 제한 적용)
  const progressStages: ProgressStage[] = []
  let day = 1
  let runsInDay = 0
  const dayEventsMap: Map<string, { eventId: string; eventName: string; runs: number }> = new Map()

  for (const event of eventList) {
    for (let i = 0; i < event.count; i++) {
      if (runsInDay >= 2) {
        // 현재 날의 이벤트 저장
        for (const dayEvent of dayEventsMap.values()) {
          progressStages.push({
            day,
            eventId: dayEvent.eventId,
            eventName: dayEvent.eventName,
            runs: dayEvent.runs,
          })
        }
        // 다음 날로 이동
        day += 1
        runsInDay = 0
        dayEventsMap.clear()
      }

      // 현재 이벤트를 일일 맵에 추가
      if (dayEventsMap.has(event.eventId)) {
        const existing = dayEventsMap.get(event.eventId)!
        existing.runs += 1
      } else {
        dayEventsMap.set(event.eventId, {
          eventId: event.eventId,
          eventName: event.eventName,
          runs: 1,
        })
      }
      runsInDay += 1
    }
  }

  // 마지막 날의 이벤트 저장
  for (const dayEvent of dayEventsMap.values()) {
    progressStages.push({
      day,
      eventId: dayEvent.eventId,
      eventName: dayEvent.eventName,
      runs: dayEvent.runs,
    })
  }

  return {
    finalLevel,
    finalExp,
    totalRuns,
    estimatedDays,
    progressStages,
  }
}
