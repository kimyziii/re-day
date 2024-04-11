import CategoryWrapper from './components/CategoryWrapper'

const CategoriesPage = () => {
  return (
    <div className='w-[90%] mx-auto h-[90svh] bg-background flex flex-col justify-start items-start mt-[5vh]'>
      <div className='w-full text-3xl font-bold text-primary px-2 mb-2'>
        카테고리
      </div>
      <CategoryWrapper />
    </div>
  )
}

export default CategoriesPage
