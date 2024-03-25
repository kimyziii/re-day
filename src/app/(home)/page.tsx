import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { GET } from '../(auth)/api/auth/[...nextauth]/route'
import connectMongo from '../(shared)/util/mongoose-connect'
import User from '../models/user'
import HomeWrapper from './components/home-wrapper'

const HomePage = async () => {
  // const queryClient = new QueryClient()

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <HomeWrapper />
    // </HydrationBoundary>
  )
}

export default HomePage

// const session = (await getServerSession(GET)) as { user: User }
// const userEmail = session.user.email

// await queryClient.prefetchQuery({
//   queryKey: ['categoryItem', userEmail],
//   queryFn: async () => {
//     await fetch('/api/categoryItems', {
//       method: 'POST',
//       body: JSON.stringify({ userEmail }),
//     })
//   },
// })
