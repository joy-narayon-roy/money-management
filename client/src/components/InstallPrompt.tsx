// src/components/InstallPrompt.tsx
import type { CSSProperties } from 'react'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

export default function InstallPrompt() {
  const { isInstallable, isInstalled, isDismissed, promptInstall, dismiss } = useInstallPrompt()

  if (isInstalled || !isInstallable || isDismissed) return null

  return (
    <div style={styles.banner}>
      <span>Install this app for a better experience</span>
      <div style={styles.actions}>
        <button style={styles.installBtn} onClick={promptInstall}>
          Install
        </button>
        <button style={styles.closeBtn} onClick={dismiss} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  banner: {
    position: 'fixed',
    bottom: 16,
    left: 16,
    right: 16,
    maxWidth: 400,
    margin: '0 auto',
    padding: '12px 16px',
    background: '#1f1f1f',
    color: '#fff',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  installBtn: {
    background: '#fff',
    color: '#1f1f1f',
    border: 'none',
    borderRadius: 8,
    padding: '8px 14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  closeBtn: {
    background: 'transparent',
    color: '#fff',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
    padding: 4,
    lineHeight: 1,
  },
}