'use client'

import { useCalculatorStore } from '@/store/calculatorStore'

export function ResultSection() {
  const { finalLevel, finalExp, totalRuns, estimatedDays } = useCalculatorStore()

  const stats = [
    { icon: '⭐', label: '레벨', value: finalLevel, unit: '레벨', color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#93c5fd' },
    { icon: '✨', label: '경험치', value: finalExp.toLocaleString(), unit: 'EXP', color: '#059669', bgColor: '#ecfdf5', borderColor: '#86efac' },
    { icon: '🎮', label: '총 진행 횟수', value: totalRuns, unit: '회', color: '#9333ea', bgColor: '#faf5ff', borderColor: '#e9d5ff' },
    { icon: '📅', label: '소요 예정 일자', value: estimatedDays, unit: '일', color: '#ea580c', bgColor: '#fef3c7', borderColor: '#fcd34d' },
  ]

  return (
    <section style={{ padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '1.5rem' }}>📈</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>계산 결과</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '0.75rem',
              padding: '1.25rem',
              border: `2px solid ${stat.borderColor}`,
              background: stat.bgColor,
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color, letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: 700, color: stat.color, wordBreak: 'break-word' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: stat.color }}>{stat.unit}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
