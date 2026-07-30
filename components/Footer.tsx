export function Footer() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'
  // const deploymentId = process.env.VERCEL_DEPLOYMENT_ID || 'development'
  const buildDate = new Date().toISOString().split('T')[0]

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
        Build: {commitSha} | Deployed: {buildDate}
      </p>
    </footer>
  )
}
