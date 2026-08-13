'use client'

import { useCalculatorStore } from '@/store/calculatorStore'
import { eventsData } from '@/data/events'

export function InputSection() {
  const { currentLevel, currentExp, setCurrentLevel, setCurrentExp } = useCalculatorStore()

  // 현재 레벨의 필요 경험치
  const requiredExpForCurrentLevel = eventsData.levelExpTable[currentLevel as keyof typeof eventsData.levelExpTable] || 0
  const currentExpPercentage = requiredExpForCurrentLevel > 0 ? (currentExp / requiredExpForCurrentLevel * 100).toFixed(2) : 0

  return (
    <section style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>📊</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>현재 상태</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>
            레벨
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={currentLevel === 0 ? '' : currentLevel}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '')
              setCurrentLevel(value === '' ? 0 : Number(value))
            }}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              background: 'white',
              color: '#1f2937',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
            onBlur={(e) => {
              const value = Number(e.target.value)
              if (!e.target.value || value < 50) {
                setCurrentLevel(50)  // 최소값으로 보정
              } else if (value > 120) {
                setCurrentLevel(120)  // 최대값으로 보정
              }
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
            <span>범위: 50 ~ 119</span>
            <span style={{ fontWeight: 600, color: '#2563eb' }}>{currentLevel}레벨</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>
            경험치
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={currentExp || ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '')
              setCurrentExp(value === '' ? 0 : Number(value))
            }}
            placeholder="0"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              background: 'white',
              color: '#1f2937',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#9333ea'
              e.currentTarget.select()
            }}
            onBlur={(e) => {
              const value = Number(e.target.value) || 0
              const maxExp = requiredExpForCurrentLevel
              const limitedExp = Math.max(0, Math.min(value, maxExp))
              setCurrentExp(limitedExp)
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
            <div>
              <span style={{ fontWeight: 600, color: '#2563eb' }}>{currentExp.toLocaleString()}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{requiredExpForCurrentLevel.toLocaleString()}</span>
              <span>&nbsp;EXP</span>
            </div>
            <span style={{ fontWeight: 600, color: '#2563eb' }}>{currentExpPercentage}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
