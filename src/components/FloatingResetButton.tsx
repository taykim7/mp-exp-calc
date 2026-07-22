'use client'

interface FloatingResetButtonProps {
  onReset?: () => void
}

export function FloatingResetButton({ onReset }: FloatingResetButtonProps) {
  const handleReset = () => {
    onReset?.()
    console.log('Reset clicked')
  }

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={handleReset}
        className="rounded-full bg-red-500 px-4 py-2 text-white shadow-lg hover:bg-red-600"
        title="모든 입력값을 초기화합니다"
      >
        💾 초기화
      </button>
    </div>
  )
}
