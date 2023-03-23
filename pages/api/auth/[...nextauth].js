import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../database/conn'
import Users from '../../../model/Schema'
import { compare } from 'bcryptjs'
export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials , req){
        connectMongo().catch(err => {error: "Connection Failed...!"})
        // check user existance
        const result = await Users.findOne({email:credentials.email})
        if(!result){
          throw new Error("No user Found with Email Please Sign up...!")
        }
        // comparing password
        const checkPassword = await compare(credentials.password , result.password)
        // incorrect password
        if(!checkPassword || result.email != credentials.email){
          throw new Error("Username or password doesn't match")
        }
        return result
      }
    }),
  ]
})