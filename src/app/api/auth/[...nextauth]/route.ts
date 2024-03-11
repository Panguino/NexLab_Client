import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth/next'

const Auth = (req, res) => NextAuth(req, res, authConfig)

export default Auth
