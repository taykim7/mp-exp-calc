// 이벤트 타입 (events.json과 매핑)
export interface Event {
  id: string
  name: string
  imagePath: string
  requiredLevel: { min: number; max: number }
  expReward: number
}

export interface Difficulty {
  name: string
  minLevel: number
  maxLevel: number
  events: Event[]
}

export interface EventsData {
  difficulties: Difficulty[]
  levelExpTable: Record<string, number>
}

// UI 관련 타입
export interface CalculatorResult {
  finalLevel: number
  finalExp: number
  totalRuns: number
  estimatedDays: number
  progressStages: ProgressStage[]
}

export interface ProgressStage {
  day: number
  eventId: string
  eventName: string
  runs: number
  totalExp?: number
  resultLevel?: number
  resultExp?: number
}
