import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user:User & {
      isAdmin: boolean
    }
  }
}

declare module "@auth/core"{
  interface JWT {
      isAdmin: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session ({token, session}){
      if(token){
        session.user.isAdmin = token.isAdmin as boolean ;
      }

      return session;
    },

    async jwt ({token}){
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        }
      })
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    }
  },
})
