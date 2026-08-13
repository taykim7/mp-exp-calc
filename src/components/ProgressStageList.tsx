'use client'

import { useCalculatorStore } from '@/store/calculatorStore'

export function ProgressStageList() {
  const { progressStages } = useCalculatorStore()

  if (progressStages.length === 0) {
    return (
      <section style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>진행 단계 목록</h3>
        </div>
        <div style={{ borderRadius: '0.75rem', border: '2px dashed #d1d5db', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.5rem' }}>
            아직 진행 계획이 없습니다.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            위에서 난이도별로 원하는 필드를 선택하면 선택된 필드가 표시됩니다.
          </p>
        </div>
      </section>
    )
  }

  // 이벤트별로 총 횟수 계산
  const eventSummary = progressStages.reduce(
    (acc, stage) => {
      const existing = acc.find((e) => e.eventId === stage.eventId)
      if (existing) {
        existing.totalRuns += stage.runs
      } else {
        acc.push({
          eventId: stage.eventId,
          eventName: stage.eventName,
          totalRuns: stage.runs,
        })
      }
      return acc
    },
    [] as Array<{ eventId: string; eventName: string; totalRuns: number }>,
  )

  const totalRuns = eventSummary.reduce((sum, e) => sum + e.totalRuns, 0)

  return (
    <section style={{ padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '1.5rem' }}>📅</span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>진행 단계 목록</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {eventSummary.map((event) => (
          <div
            key={event.eventId}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#374151',
            }}
          >
            {/* <span style={{ fontSize: '1rem' }}>✅</span> */}
            <span style={{ fontWeight: 500, flex: 1 }}>{event.eventName}</span>
            <span style={{ fontWeight: 700, color: '#1f2937', background: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
              ×{event.totalRuns}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #93c5fd' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e40af' }}>총 진행 횟수</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>{totalRuns}회</span>
        </div>
      </div>
    </section>
  )
}
