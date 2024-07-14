'use client'
import { CardWrapper } from '@/component/CardWrapper'
import {
  OIDC_AUTH_DOMAIN,
  OIDC_CLIENT_ID
} from '@/constant'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material'

const OIDC_HOME = () => {
  const oidcSignIn = () => {
  const redirectUri = encodeURIComponent(`${window.location.origin}/oidc/callback`)
  const authUrl = `${OIDC_AUTH_DOMAIN}/oauth2/authorize?
response_type=code
&client_id=${OIDC_CLIENT_ID}
&scope=email+openid+profile
&redirect_uri=${redirectUri}`
    window.location.href = authUrl
  }

  return(
    <>
      <CardWrapper headerLabel="Sign in via OpenID Connect.">
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <Button
            variant="contained"
            onClick={oidcSignIn}
          >
            SignIn
          </Button>
        </Box>
      </CardWrapper>

    </>
  )
}
export default OIDC_HOME