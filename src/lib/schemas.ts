import { z } from 'zod'

// 현재 상태 검증
export const currentStateSchema = z.object({
  currentLevel: z.number().min(51).max(120),
  currentExp: z.number().min(0),
})

// 이벤트 횟수 검증
export const eventCountsSchema = z.record(z.string(), z.number().min(0).int())

// 전체 입력 검증
export const calculatorInputSchema = z.object({
  currentLevel: z.number().min(51).max(120),
  currentExp: z.number().min(0),
  eventCounts: z.record(z.string(), z.number().min(0).int()),
})

export type CurrentState = z.infer<typeof currentStateSchema>
export type EventCounts = z.infer<typeof eventCountsSchema>
export type CalculatorInput = z.infer<typeof calculatorInputSchema>
