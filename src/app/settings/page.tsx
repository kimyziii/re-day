'use client'

import React from 'react'
import SettingsCard from './components/settingsCard'
import CategorySettings from './components/settingsCategory'

const SettingsPage = () => {
  return (
    <div className='w-full h-[90vh] bg-background mt-[5vh]'>
      <div className='w-[95%] mx-auto grid grid-cols-2 gap-2'>
        <SettingsCard title='카테고리'>
          <CategorySettings />
        </SettingsCard>
        <SettingsCard title='기타'>
          <></>
        </SettingsCard>
      </div>
    </div>
  )
}

export default SettingsPage
