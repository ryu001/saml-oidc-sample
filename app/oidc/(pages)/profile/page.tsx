'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchUserInfo, verifyAccessToken } from "@/lib/actions/auth"
import { CardWrapper } from "@/component/CardWrapper"

const OIDC_Profile = () => {
  let cnt = 0
  const [userInfo, setUserInfo] = useState()
  const router = useRouter()
  useEffect(() =>{
    cnt++
    if (cnt > 1) return
    const verify = async () => {
      const access_token = localStorage.getItem('access_token')
      const refresh_token = localStorage.getItem('refresh_token')
      if (access_token && refresh_token) {
        const verify_result = await verifyAccessToken(access_token, refresh_token)
        if (verify_result.error) {
          router.push('/oidc')
        } else {
          // check if token has been refreshed
          if (verify_result.access_token && verify_result.access_token != access_token) {
            console.log('token refreshed')
            localStorage.setItem('access_token', verify_result.access_token)
            localStorage.setItem('refresh_token', verify_result.id_token)
          }
          // fetch user info
          const user = await fetchUserInfo(localStorage.getItem('access_token') || '')
          setUserInfo(user)
        }
      }
      else router.push('/oidc')
    }

    verify()
  }, [router])
  return(
    <>
      <CardWrapper headerLabel="Your profile">
        {JSON.stringify(userInfo)}
      </CardWrapper>
    </>
  )
}
export default OIDC_Profile