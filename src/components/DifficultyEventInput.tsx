'use client'

import { useState } from 'react'
import type { EventsData } from '@/lib/types'

// 임시 이벤트 데이터 (나중에 events.json으로 대체)
const defaultEventsData: EventsData = {
  difficulties: [
    {
      name: '초급',
      minLevel: 51,
      maxLevel: 80,
      events: [],
    },
    {
      name: '중급',
      minLevel: 81,
      maxLevel: 100,
      events: [],
    },
    {
      name: '고급',
      minLevel: 101,
      maxLevel: 120,
      events: [],
    },
  ],
  levelExpTable: {},
}

interface DifficultyEventInputProps {
  eventsData?: EventsData
}

export function DifficultyEventInput({ eventsData = defaultEventsData }: DifficultyEventInputProps) {
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({})

  const handleEventChange = (eventId: string, count: number) => {
    setEventCounts((prev) => ({ ...prev, [eventId]: count }))
  }

  return (
    <section className="space-y-6 p-4">
      <h2 className="text-xl font-bold">🎯 난이도별 진행 횟수</h2>

      {eventsData.difficulties.map((difficulty) => (
        <div key={difficulty.name} className="space-y-3 rounded border p-4">
          <h3 className="font-semibold">{difficulty.name}</h3>

          {difficulty.events.length === 0 ? (
            <p className="text-sm text-gray-500">이벤트 데이터를 불러오는 중입니다...</p>
          ) : (
            difficulty.events.map((event) => (
              <div key={event.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-200">
                    <span className="text-xs text-gray-500">이미지</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.expReward.toLocaleString()} EXP</p>
                  </div>
                </div>

                <input
                  type="number"
                  min={0}
                  value={eventCounts[event.id] || 0}
                  onChange={(e) => handleEventChange(event.id, Number(e.target.value))}
                  placeholder="횟수"
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
            ))
          )}
        </div>
      ))}
    </section>
  )
}
