import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import NavBar from '@/layouts/nav'
import SessionProvider from './(shared)/components/sessionProvider'
import QueryProviders from './(shared)/components/queryClientProvider'
import UserContextProvider from './(shared)/context/userContextProviders'

const pretendard = localFont({
  src: [
    {
      path: './../../public/PretendardVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
})

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: 'Re-Day',
  description: '하루를 돌아보고 오늘 내가 한 것들을 정리합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' className={`${pretendard.className} ${rubik.variable}`}>
      <body className='flex'>
        <UserContextProvider>
          <QueryProviders>
            <SessionProvider>
              <NavBar />
              {children}
            </SessionProvider>
          </QueryProviders>
        </UserContextProvider>
      </body>
    </html>
  )
}
