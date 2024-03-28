'use client'

import { Card, CardTitle } from '@/app/(shared)/components/card'
import React from 'react'

type SettingsCardProps = {
  title: string
  children: React.ReactNode
}

const SettingsCard = ({ title, children }: SettingsCardProps) => {
  return (
    <Card className='w-full px-3 py-2'>
      <CardTitle className='text-lg'>{title}</CardTitle>
      {children}
    </Card>
  )
}

export default SettingsCard
