'use client'

import { useState } from 'react'

interface InputState {
  currentLevel: number
  currentExp: number
}

export function InputSection() {
  const [input, setInput] = useState<InputState>({
    currentLevel: 51,
    currentExp: 0,
  })

  const handleChange = (field: keyof InputState, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="space-y-4 p-4">
      <h2 className="text-xl font-bold">📊 현재 상태</h2>

      <div>
        <label className="block text-sm font-medium">현재 레벨</label>
        <input
          type="number"
          value={input.currentLevel}
          onChange={(e) => handleChange('currentLevel', Number(e.target.value))}
          min={51}
          max={120}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">현재 경험치</label>
        <input
          type="number"
          value={input.currentExp}
          onChange={(e) => handleChange('currentExp', Number(e.target.value))}
          step="0.01"
          className="w-full rounded border p-2"
        />
      </div>
    </section>
  )
}
