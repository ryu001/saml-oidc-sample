'use server'
import {
  OIDC_SECRET,
  OIDC_CLIENT_ID,
  OIDC_AUTH_DOMAIN,
  OIDC_USERPOOL_ID
} from "@/constant"
import { CognitoJwtVerifier } from "aws-jwt-verify"

export const verifyAccessToken = async (accessToken: string, refreshToken: string) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: OIDC_USERPOOL_ID,
    tokenUse: "access",
    clientId: OIDC_CLIENT_ID,
  })

  try {
    const payload = await verifier.verify(accessToken)
    console.log("Token is valid.")
    return payload
  } catch(error) {
    console.log("Token not valid!")
    // const verifyError: string = {error}.error as string
    // console.log('errorMessage:' + verifyError)
    if (refreshToken) {
      // refresh token
      const refreshData = await refreshAccessToken(refreshToken)
      return refreshData
    }
    return {error: 'invalid'}
  }
}

export const fetchTokenWithAuthorizationCode = async (code: string, redirectUri: string) => {
  const params = new URLSearchParams({
    'grant_type': 'authorization_code',
    'client_id': OIDC_CLIENT_ID,
    'code': code,
    'redirect_uri': redirectUri
  })
  const tokenResult = await fetch(`${OIDC_AUTH_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ` + btoa(`${OIDC_CLIENT_ID}:${OIDC_SECRET}`)
    },
    body: params
  })
  const data = await tokenResult.json()
  return data
}

export const fetchUserInfo = async (accessToken: string) => {
  const tokenResult = await fetch(`${OIDC_AUTH_DOMAIN}/oauth2/userInfo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const data = await tokenResult.json()
  return data
}

const refreshAccessToken = async (refreshToken: string) => {
  const params = new URLSearchParams({
    'grant_type': 'refresh_token',
    'client_id': OIDC_CLIENT_ID,
    'refresh_token': refreshToken
  })
  const tokenResult = await fetch(`${OIDC_AUTH_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ` + btoa(`${OIDC_CLIENT_ID}:${OIDC_SECRET}`)
    },
    body: params
  })
  const data = await tokenResult.json()
  console.log(`refresh token: {${data}}`)
  console.log(data)
  return data
}