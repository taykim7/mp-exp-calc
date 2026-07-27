'use client'

import { create } from 'zustand'
import type { CalculatorState, CalculationResult } from '@/lib/types'
import { calculate } from '@/lib/calculator'
import { eventsData } from '@/data/events'

const initialState = {
  currentLevel: 50,
  currentExp: 0,
  eventCounts: {} as Record<string, number>,
  finalLevel: 50,
  finalExp: 0,
  totalRuns: 0,
  estimatedDays: 0,
  progressStages: [],
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  ...initialState,

  setCurrentLevel: (level: number) => {
    set({ currentLevel: level })
    // 레벨 변경 후 자동 계산
    setTimeout(() => get().calculate(), 0)
  },

  setCurrentExp: (exp: number) => {
    set({ currentExp: exp })
    // 경험치 변경 후 자동 계산
    setTimeout(() => get().calculate(), 0)
  },

  setEventCount: (finalLevel: number, eventId: string, count: number) => {
    set((state) => ({
      eventCounts: {
        ...state.eventCounts,
        [eventId]: count,
      },
    }))
    // 이벤트 횟수 변경 후 자동 계산
    setTimeout(() => get().calculate(), 0)
  },

  calculate: () => {
    const state = get()
    const result = calculate(
      state.currentLevel,
      state.currentExp,
      state.eventCounts,
      eventsData,
    )

    set({
      finalLevel: result.finalLevel,
      finalExp: result.finalExp,
      totalRuns: result.totalRuns,
      estimatedDays: result.estimatedDays,
      progressStages: result.progressStages,
    })
  },

  reset: () => {
    set(initialState)
  },

  setCalculationResult: (result: CalculationResult) => {
    set({
      finalLevel: result.finalLevel,
      finalExp: result.finalExp,
      totalRuns: result.totalRuns,
      estimatedDays: result.estimatedDays,
      progressStages: result.progressStages,
    })
  },
}))
