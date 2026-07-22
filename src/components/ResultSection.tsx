'use client'

interface ResultSectionProps {
  finalLevel?: number
  finalExp?: number
  totalRuns?: number
  estimatedDays?: number
}

export function ResultSection({
  finalLevel = 51,
  finalExp = 0,
  totalRuns = 0,
  estimatedDays = 0,
}: ResultSectionProps) {
  return (
    <section className="space-y-4 rounded bg-gray-50 p-4">
      <h2 className="text-xl font-bold">📈 계산 결과</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">최종 레벨</p>
          <p className="text-2xl font-bold">{finalLevel}</p>
        </div>

        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">최종 경험치</p>
          <p className="text-lg font-bold">{finalExp.toLocaleString()}</p>
        </div>

        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">총 진행 횟수</p>
          <p className="text-2xl font-bold">{totalRuns}회</p>
        </div>

        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">소요 예정 일자</p>
          <p className="text-2xl font-bold">{estimatedDays}일</p>
        </div>
      </div>
    </section>
  )
}
