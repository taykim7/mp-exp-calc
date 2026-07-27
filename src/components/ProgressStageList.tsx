'use client'

import { useCalculatorStore } from '@/store/calculatorStore'

export function ProgressStageList() {
  const { progressStages } = useCalculatorStore()

  if (progressStages.length === 0) {
    return (
      <section style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>진행 단계 계획</h3>
        </div>
        <div style={{ borderRadius: '0.75rem', border: '2px dashed #d1d5db', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.5rem' }}>
            아직 진행 계획이 없습니다
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            위에서 이벤트를 선택하면 진행 계획이 여기에 표시됩니다
          </p>
        </div>
      </section>
    )
  }

  // 일일 진행 내역을 그룹화
  const dailySchedule = progressStages.reduce(
    (acc, stage) => {
      const dayKey = `day-${stage.day}`
      if (!acc[dayKey]) {
        acc[dayKey] = { day: stage.day, events: [] }
      }
      acc[dayKey].events.push(stage)
      return acc
    },
    {} as Record<string, { day: number; events: typeof progressStages }>,
  )

  const sortedDays = Object.values(dailySchedule).sort((a, b) => a.day - b.day)
  const maxDay = Math.max(...sortedDays.map((d) => d.day))

  return (
    <section style={{ padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>진행 단계 계획</h3>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', background: '#3b82f6', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
          총 {maxDay}일
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '24rem', overflowY: 'auto' }}>
        {sortedDays.map(({ day, events }) => {
          const dayPercentage = (day / maxDay) * 100
          const totalRuns = events.reduce((sum, e) => sum + e.runs, 0)
          return (
            <div
              key={`day-${day}`}
              style={{
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'flex', width: '1.75rem', height: '1.75rem', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', background: 'linear-gradient(to right, #3b82f6, #9333ea)', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                    {day}
                  </span>
                  Day {day}
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280' }}>
                  {totalRuns}회
                </div>
              </div>

              {/* 진행률 바 */}
              <div style={{ marginBottom: '0.75rem', height: '0.375rem', background: '#d1d5db', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #3b82f6, #9333ea)',
                    width: `${dayPercentage}%`,
                    transition: 'width 0.5s ease-out',
                  }}
                />
              </div>

              {/* 이벤트 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {events.map((event, idx) => (
                  <div
                    key={`${event.eventId}-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#374151',
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>→</span>
                    <span style={{ fontWeight: 500 }}>{event.eventName}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 700, color: '#1f2937', background: '#e5e7eb', padding: '0.125rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
                      ×{event.runs}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
