'use client'
import { Button } from '@/app/(shared)/components/button'
import { Card } from '@/app/(shared)/components/card'
import { Input } from '@/app/(shared)/components/input'
import { IUser } from '@/app/models/user'
import { Label } from '@radix-ui/react-label'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEvent, useState } from 'react'

const SignupPage = () => {
  const router = useRouter()
  const { data: session, status, update } = useSession()
  const user = session?.user as IUser

  const [nickname, setNickname] = useState<string>(user?.nickname || '')

  async function handleNavigateToPrev(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    await signOut({ redirect: false }).then(() => {
      router.push('/login')
    })
  }

  function handleChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value)
  }

  async function handleSave() {
    const newData = {
      ...user,
      nickname,
    }
    const res = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify(newData),
    })

    const response = await res.json()

    if (response.status === 201) {
      update({ ...session, user: response.userData })
      router.push('/')
    } else {
      console.error('error is ', response.message)
    }
  }

  return (
    <div className='w-full flex flex-col items-center mt-[10vh]'>
      <h2 className='flex items-center gap-3 scroll-m-20 mb-2 text-3xl font-extrabold tracking-tight lg:text-5xl'>
        <Image src='/logo.svg' width={40} height={40} alt='Re-Day' />
        Re-Day
      </h2>
      <h3 className='my-2'>추가 정보 입력하기</h3>

      {status === 'authenticated' && (
        <>
          <Card className='w-[40%] px-4 py-2 mb-4'>
            <div className='flex gap-7 items-center'>
              <Label className='w-[30%] text-sm' htmlFor='email'>
                이메일
              </Label>
              <Input
                disabled
                type='email'
                id='email'
                placeholder='Email'
                value={user.email}
                className='border-none'
              />
            </div>
            <div className='flex gap-7 items-center'>
              <Label className='w-[30%] text-sm' htmlFor='name'>
                이름
              </Label>
              <Input
                disabled
                type='email'
                id='name'
                placeholder='Name'
                value={user.name}
                className='border-none'
              />
            </div>
            <hr className='my-3' />
            <div className='flex gap-7 items-center'>
              <Label className='w-[30%] text-sm' htmlFor='nickname'>
                닉네임
              </Label>
              <Input
                type='email'
                id='nickname'
                placeholder='닉네임을 입력해 주세요.'
                value={nickname}
                onChange={(e) => handleChangeNickname(e)}
              />
            </div>
          </Card>
          <div className='space-x-3'>
            <Button
              variant='secondary'
              className='w-[200px]'
              onClick={(event) => handleNavigateToPrev(event)}
            >
              로그인 화면으로 돌아가기
            </Button>
            <Button onClick={handleSave} className='w-[100px]'>
              저장
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SignupPage
