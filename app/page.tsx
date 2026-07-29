'use client'

import { InputSection } from '@/components/InputSection'
import { DifficultyEventInput } from '@/components/DifficultyEventInput'
import { ResultSection } from '@/components/ResultSection'
import { ProgressStageList } from '@/components/ProgressStageList'
import { FloatingResetButton } from '@/components/FloatingResetButton'

export default function Home() {
  const burningEndDate = new Date(2026, 8, 11) // 9월 11일
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  burningEndDate.setHours(0, 0, 0, 0)
  const estimatedDays = Math.ceil((burningEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #fce7f3)' }}>
      {/* 헤더 */}
            <header style={{ position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem' }}>

          {/* 첫 번째 행: 제목 + D-DAY */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>🎮</span>
              <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
                메랜 몬스터파크<br />경험치 계산기
              </h1>
            </div>

            {/* ✅ D-DAY 표시 */}
            {estimatedDays > 0 && (
              <div style={{ textAlign: 'center', background: 'linear-gradient(to right, #ef4444, #dc2626)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', flexShrink: 0 }}>
                <p style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)', opacity: 0.9, margin: 0, whiteSpace: 'nowrap' }}>버닝 종료</p>
                <p style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>D-{estimatedDays}</p>
              </div>
            )}
          </div>

          {/* 두 번째 행: 설명 */}
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            메이플랜드 버닝서버 몬스터파크 이벤트 진행으로 얻는 최종 레벨과 경험치를 빠르게 계산해보세요
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 입력 카드 */}
        <div style={{ borderRadius: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <InputSection />
          <DifficultyEventInput />
        </div>

        {/* 결과 카드 */}
        <div style={{ borderRadius: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <ResultSection />
        </div>

        {/* 진행 단계 카드 */}
        <div style={{ borderRadius: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <ProgressStageList />
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <FloatingResetButton />

      {/* 하단 여백 */}
      <div style={{ height: '6rem' }} />
    </main>
  )
}
