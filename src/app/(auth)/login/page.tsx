import { ClientSafeProvider, getProviders } from 'next-auth/react'
import Login from '@/app/(shared)/components/login'
import connectMongo from '@/app/(shared)/util/mongoose-connect'

type LoginPageProps = {
  providers: Record<string, ClientSafeProvider> | null
}

async function getServerSideProps() {
  const providers = await getProviders()
  await connectMongo()
  return { providers }
}

const LoginPage = async () => {
  const { providers }: LoginPageProps = await getServerSideProps()
  return <Login providers={providers as Record<string, ClientSafeProvider>} />
}

export default LoginPage
