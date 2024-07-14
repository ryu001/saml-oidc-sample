'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchTokenWithAuthorizationCode } from '@/lib/actions/auth'

let cnt = 0
const Callback = () => {
  const router = useRouter()
  useEffect(() => {
    cnt++
    if (cnt > 1) return
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code') || ''

    const fetchToken = async () => {
      const data = await fetchTokenWithAuthorizationCode(code, `${window.location.origin}/oidc/callback`)
      console.log(data)
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      router.push('/oidc/profile')
    }
    if(code) {
      fetchToken()
    }

  }, [router])

  return <div>Redirecting...</div>
}

export default Callback
