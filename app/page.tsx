'use client'

import { InputSection } from '@/components/InputSection'
import { DifficultyEventInput } from '@/components/DifficultyEventInput'
import { ResultSection } from '@/components/ResultSection'
import { ProgressStageList } from '@/components/ProgressStageList'
import { FloatingResetButton } from '@/components/FloatingResetButton'
import eventsData from '@/../../public/data/events.json'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-2xl font-bold">🎮 몬스터파크 경험치 계산기</h1>
          <p className="text-sm text-gray-600">
            이벤트 진행으로 얻는 최종 레벨과 경험치를 계산해보세요!
          </p>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="mx-auto max-w-2xl">
        {/* 입력 섹션 */}
        <InputSection />

        {/* 이벤트 선택 */}
        <DifficultyEventInput eventsData={eventsData} />

        {/* 결과 표시 */}
        <ResultSection />

        {/* 진행 단계 */}
        <ProgressStageList />
      </div>

      {/* 플로팅 버튼 */}
      <FloatingResetButton />
    </main>
  )
}
