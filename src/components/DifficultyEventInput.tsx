'use client'

import { useCalculatorStore } from '@/store/calculatorStore'
import { eventsData } from '@/data/events'

const difficultyColors = {
  초급: { bg: '#10b981', bgLight: '#ecfdf5' },
  중급: { bg: '#3b82f6', bgLight: '#eff6ff' },
  고급: { bg: '#ef4444', bgLight: '#fef2f2' },
}

interface DifficultyEventInputProps {
  eventsData?: typeof eventsData
}

export function DifficultyEventInput({ eventsData: providedEventsData }: DifficultyEventInputProps) {
  const { finalLevel, eventCounts, setEventCount } = useCalculatorStore()
  const data = providedEventsData || eventsData

  return (
    <section style={{ padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🎯</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>난이도별 진행 횟수</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {data.difficulties.map((difficulty) => {
          const colors = difficultyColors[difficulty.name as keyof typeof difficultyColors]
          return (
            
            <div
              key={difficulty.name}
              style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                background: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              }}
            >
              {/* 헤더 */}
              <div style={{ background: colors.bg, padding: '1rem', color: 'white' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{difficulty.name}</h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Lv. {difficulty.minLevel}~{difficulty.maxLevel}</p>
              </div>

              {/* 이벤트 목록 */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {difficulty.events.map((event) => (
                  <div key={event.id} style={{ background: colors.bgLight, padding: '1rem', borderRadius: '0.5rem', border: `1px solid ${colors.bg}33` }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      {/* <img
                        src="/images/thums/test.png"
                        alt={event.name}
                        style={{ width: '3rem', height: '3rem', borderRadius: '0.375rem', objectFit: 'cover', flexShrink: 0 }}
                      /> */}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{event.name} ({event.requiredLevel.min}~{event.requiredLevel.max})</p>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginTop: '0.25rem' }}>
                          {event.expReward.toLocaleString()} EXP
                        </p>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
                        진행 횟수
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {/* - 버튼 */}
                        <button
                          onClick={() => {
                            const current = eventCounts[event.id] || 0
                            setEventCount(finalLevel, event.id, Math.max(0, current - 1))
                          }}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            minWidth: '2rem',
                            minHeight: '2rem',
                            borderRadius: '50%',
                            border: `2px solid ${colors.bg}`,
                            background: 'white',
                            color: colors.bg,
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            padding: '0',
                            flex: '0 0 auto',
                            lineHeight: '1',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = colors.bgLight
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'white'
                          }}
                        >
                          −
                        </button>

                        {/* 숫자 입력 */}
                        <input
                          type="text"
                          inputMode="numeric"
                          value={eventCounts[event.id] === 0 ? '' : (eventCounts[event.id] || '')}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            setEventCount(finalLevel, event.id, value === '' ? 0 : Math.max(0, Number(value)))
                          }}
                          placeholder="0"
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            border: `1px solid ${colors.bg}66`,
                            background: 'white',
                            color: '#1f2937',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            outline: 'none',
                            boxSizing: 'border-box',
                            minWidth: '0',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = colors.bg)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = colors.bg + '66')}
                        />

                        {/* + 버튼 */}
                        <button
                          onClick={() => {
                            const current = eventCounts[event.id] || 0
                            setEventCount(finalLevel, event.id, current + 1)
                          }}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            minWidth: '2rem',
                            minHeight: '2rem',
                            borderRadius: '50%',
                            border: `2px solid ${colors.bg}`,
                            background: colors.bg,
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            padding: '0',
                            flex: '0 0 auto',
                            lineHeight: '1',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.opacity = '0.9'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.opacity = '1'
                          }}
                        >
                          +
                        </button>

                        {/* <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280' }}>회</span> */}
                      </div>
                    </div>
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
