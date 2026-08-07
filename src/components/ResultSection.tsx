'use client'

import { useCalculatorStore } from '@/store/calculatorStore'
import { eventsData } from '@/data/events'

export function ResultSection() {
  const { currentLevel, currentExp, finalLevel, finalExp, totalRuns, estimatedDays } = useCalculatorStore()

  // 시작 레벨 경험치
  const requiredExpForCurrentLevel = eventsData.levelExpTable[currentLevel as keyof typeof eventsData.levelExpTable] || 0
  const currentExpPercentage = requiredExpForCurrentLevel > 0 ? (currentExp / requiredExpForCurrentLevel * 100).toFixed(2) : 0
  
  // 최종 레벨 경험치
  const requiredExpForFinalLevel = eventsData.levelExpTable[finalLevel as keyof typeof eventsData.levelExpTable] || 0
  const finalExpPercentage = requiredExpForFinalLevel > 0 ? (finalExp / requiredExpForFinalLevel * 100).toFixed(2) : 0

  // 버닝 종료 날짜 계산
  const burningEndDate = new Date(2026, 8, 11)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  burningEndDate.setHours(0, 0, 0, 0)
  const daysUntilBurningEnd = Math.ceil((burningEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // 주의사항 확인
  const hasLevelLimitWarning = (currentLevel <= 82 && finalLevel >= 71) || (finalLevel <= 82 && currentLevel >= 71)
  const exceedsBurningDeadline = estimatedDays > daysUntilBurningEnd

  const stats = [
    { icon: '🌱', label: '시작 레벨', value: `${currentLevel}`, unit: `${currentExpPercentage}% (${currentExp.toLocaleString()})`, color: '#059669', bgColor: '#ecfdf5', borderColor: '#86efac' },
    // { icon: '🌱', label: '시작 경험치', value: currentExp.toLocaleString(), unit: `EXP (${currentExpPercentage}%)`,  color: '#1f2937', borderColor: '#d1d5db' },
    { icon: '⭐', label: '최종 레벨', value: `${finalLevel}`, unit: `${finalExpPercentage}% (${finalExp.toLocaleString()})`, color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#93c5fd' },
    // { icon: '⭐', label: '최종 경험치', value: finalExp.toLocaleString(), unit: `EXP (${finalExpPercentage}%)`, color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#93c5fd' },
    { icon: '🎮', label: '진행 횟수', value: totalRuns, unit: '회', color: '#9333ea', bgColor: '#faf5ff', borderColor: '#e9d5ff' },
    { icon: '📅', label: '예정 일자', value: estimatedDays, unit: '일', color: '#ea580c', bgColor: '#fef3c7', borderColor: '#fcd34d' },
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

      {/* 주의사항 영역 */}
      {(hasLevelLimitWarning || exceedsBurningDeadline) && (
        <div style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: '0.75rem', background: '#fff5f5', border: '2px solid #fca5a5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#dc2626' }}>주의사항</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {hasLevelLimitWarning && (
              <p style={{ fontSize: '0.875rem', color: '#991b1b', fontWeight: 600 }}>
                • 71~83레벨 구간에서는 2레벨 이상 동시 레벨업에 주의하세요. 한 번에 2레벨 이상 오를 만큼의 경험치를 획득하면, 일부 경험치가 정상적으로 반영되지 않을 수 있습니다.
              </p>
            )}
            {exceedsBurningDeadline && (
              <p style={{ fontSize: '0.875rem', color: '#991b1b', fontWeight: 600 }}>
                • 버닝서버 종료일(2026년 9월 11일) 이전까지 진행해야 합니다.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
