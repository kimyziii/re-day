import { useQuery } from '@tanstack/react-query'
import { fetchCategoryList } from '../service/category'

function useCategoryItems(userId: string) {
  console.log(`userId in useCategoryItems: ${userId}`)
  const queryKey = ['categoryItems', userId]
  const queryFn = async () => {
    return fetchCategoryList(userId).then((result) => console.log(result))
  }

  return useQuery({ queryKey, queryFn })
}

export default useCategoryItems
