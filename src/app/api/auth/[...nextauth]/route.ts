import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth/next'

const handler = (req, res) => NextAuth(req, res, authConfig)

export { handler as GET, handler as POST }
