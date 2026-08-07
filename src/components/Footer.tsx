'use client'

import { APP_VERSION } from '@/config/version'

export function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '1.5rem 1rem',
      fontSize: '0.75rem',
      color: '#999',
      borderTop: '1px solid #eee',
      background: 'rgba(255,255,255,0.5)',
    }}>
      <p style={{ margin: '0.5rem 0' }}>
        v{APP_VERSION} © 총알몬
      </p>
    </footer>
  )
}
