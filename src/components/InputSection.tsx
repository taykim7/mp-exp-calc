'use client'

import { useCalculatorStore } from '@/store/calculatorStore'

export function InputSection() {
  const { currentLevel, currentExp, setCurrentLevel, setCurrentExp } = useCalculatorStore()

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
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Number(e.target.value))}
            min={50}
            max={120}
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
              if (value < 50) {
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
            type="number"
            value={currentExp}
            onChange={(e) => setCurrentExp(Number(e.target.value))}
            step="1"
            min="0"
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
            onFocus={(e) => (e.currentTarget.style.borderColor = '#9333ea')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')} 
            // TODO 해당 레벨대의 최대 경험치로
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem', color: '#6b7280' }}>
            <span style={{ fontWeight: 600, color: '#7c3aed' }}>{currentExp.toLocaleString()}</span>
            <span>&nbsp;EXP</span>
            {/* TODO 퍼센테이지 표기하기 */}
          </div>
        </div>
      </div>
    </section>
  )
}
