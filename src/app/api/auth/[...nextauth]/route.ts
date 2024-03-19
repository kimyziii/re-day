import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, session }) {
      const reqBody = JSON.stringify({ email: token.email })
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
        method: 'POST',
        body: reqBody,
      })

      const response = await res.json()

      let newTokenObj = {
        ...token,
        type: response.result === 'new user' ? 'n' : 'e',
      }

      return newTokenObj
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          type: token.type,
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
