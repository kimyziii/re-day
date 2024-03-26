'use client'
import { IUser } from '@/app/models/user'
import { ClientSafeProvider, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from '../../../(shared)/components/button'
import { Card } from '../../../(shared)/components/card'

type LoginProps = {
  providers: Record<string, ClientSafeProvider> | null
}

const Login = ({ providers }: LoginProps) => {
  const router = useRouter()
  const session = useSession()

  async function handleClick(providerId: string) {
    await signIn(providerId, {
      redirect: false,
    })
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      if ((session.data?.user as IUser).type === 'n') {
        router.push('/signup')
      } else {
        router.push('/')
      }
    }
  }, [session])

  return (
    <div className='w-full flex flex-col items-center mt-[10vh] gap-2'>
      <h2 className='flex items-center gap-3 scroll-m-20 mb-2 text-3xl font-extrabold tracking-tight lg:text-5xl'>
        <Image src='/logo.svg' width={40} height={40} alt='Re-Day' />
        Re-Day
      </h2>
      <div className='w-full flex justify-center'>
        <Card className='w-[40%] p-6'>
          {providers && (
            <ul className='space-y-3'>
              {Object.values(providers).map((provider) => (
                <li key={provider.id} className='text-center'>
                  <Button
                    variant='secondary'
                    className='w-full h-[5vh]'
                    onClick={() => handleClick(provider.id)}
                  >
                    {provider.name} 계정으로 로그인하기
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <div className='mt-2'>계정이 없다면 자동으로 회원가입이 진행됩니다.</div>
    </div>
  )
}

export default Login
