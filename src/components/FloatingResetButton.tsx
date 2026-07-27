'use client'

import { useState } from 'react'
import { useCalculatorStore } from '@/store/calculatorStore'

export function FloatingResetButton() {
  const { reset } = useCalculatorStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReset = () => {
    reset()
    setShowConfirm(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
      {/* 확인 팝업 */}
      {showConfirm && (
        <div style={{ borderRadius: '0.75rem', background: 'white', boxShadow: '0 20px 25px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', padding: '1rem', width: '16rem', animation: 'slideUp 0.3s ease-out' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>
            정말 모든 입력값을 초기화하시겠어요?
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.375rem',
                background: '#e5e7eb',
                color: '#1f2937',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#d1d5db')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#e5e7eb')}
            >
              취소
            </button>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.375rem',
                background: '#ef4444',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#dc2626')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#ef4444')}
            >
              초기화
            </button>
          </div>
          <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}

      {/* 초기화 버튼 */}
      <button
        onClick={() => setShowConfirm(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #ef4444, #ec4899)',
          color: 'white',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        title="모든 입력값을 초기화합니다"
      >
        <span style={{ fontSize: '1.125rem' }}>🔄</span>
        <span>초기화</span>
      </button>
    </div>
  )
}
