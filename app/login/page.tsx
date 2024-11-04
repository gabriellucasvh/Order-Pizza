import Login from '@/app/login/components/Login'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar no sistema',
  description: 'Faça login para entrar no sistema',
  icons: {
    icon: '/favicon.ico',
  }
}
const login = () => {
  return (
    <div>
        <Login />
    </div>
  )
}

export default login