import React from 'react'

type BackdropProps = {
  handleCancel: () => void
}

const Backdrop = ({ handleCancel }: BackdropProps) => {
  return (
    <div
      onClick={handleCancel}
      className='fixed top-0 left-0 z-40 w-[100vw] h-[100svh] bg-foreground opacity-70'
    />
  )
}

export default Backdrop
