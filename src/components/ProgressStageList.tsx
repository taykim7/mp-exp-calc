'use client'

import type { ProgressStage } from '@/lib/types'

interface ProgressStageListProps {
  progressStages?: ProgressStage[]
}

export function ProgressStageList({ progressStages = [] }: ProgressStageListProps) {
  if (progressStages.length === 0) {
    return (
      <section className="space-y-4 p-4">
        <h3 className="text-lg font-bold">📅 진행 단계</h3>
        <p className="text-center text-gray-500">입력을 완료하면 진행 계획이 표시됩니다.</p>
      </section>
    )
  }

  return (
    <section className="space-y-4 p-4">
      <h3 className="text-lg font-bold">📅 진행 단계</h3>

      <div className="space-y-2">
        {progressStages.map((stage) => (
          <div key={stage.day} className="rounded border-l-4 border-blue-500 bg-gray-50 p-3">
            <p className="text-sm font-semibold">
              Day {stage.day}: {stage.eventName} × {stage.runs}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
