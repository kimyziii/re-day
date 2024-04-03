import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { IUser } from '@/models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID as string,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // }),
  ],
  callbacks: {
    async jwt({ token }) {
      const reqBody = JSON.stringify({ email: token.email })
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
        method: 'POST',
        body: reqBody,
      })

      const response = await res.json()

      let newTokenObj = { ...token }
      if (response.result === 'new user') {
        newTokenObj.type = 'n'
      } else if (response.result === 'existing user') {
        newTokenObj.type = 'e'
        newTokenObj.userData = response.userData
      }

      return newTokenObj
    },
    async session({ session, token }) {
      if (!token.userData) {
        token.userData = session.user
      }

      return {
        ...session,
        user: {
          type: token.type,
          ...(token.userData as IUser),
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
