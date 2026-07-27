// 이벤트 타입 정의
export interface EventLevel {
  min: number
  max: number
}

export interface GameEvent {
  id: string
  name: string
  imagePath: string
  requiredLevel: EventLevel
  expReward: number
}

export interface Difficulty {
  name: string
  minLevel: number
  maxLevel: number
  events: GameEvent[]
}

export interface EventsData {
  difficulties: Difficulty[]
  levelExpTable: Record<number, number>
}

// 진행 단계
export interface ProgressStage {
  day: number
  eventId: string
  eventName: string
  runs: number
}

// 계산 결과
export interface CalculationResult {
  finalLevel: number
  finalExp: number
  totalRuns: number
  estimatedDays: number
  progressStages: ProgressStage[]
}

// 계산기 상태
export interface CalculatorState {
  currentLevel: number
  currentExp: number
  eventCounts: Record<string, number>
  finalLevel: number
  finalExp: number
  totalRuns: number
  estimatedDays: number
  progressStages: ProgressStage[]

  setCurrentLevel: (level: number) => void
  setCurrentExp: (exp: number) => void
  setEventCount: (finalLevel: number, requiredLevel: string, count: number) => void
  calculate: () => void
  reset: () => void
  setCalculationResult: (result: CalculationResult) => void
}
