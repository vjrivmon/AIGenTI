import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </SessionProvider>
  )
} 