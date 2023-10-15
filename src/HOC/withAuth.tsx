import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import Router from 'next/router'

interface Ctx {
  req: NextApiRequest
  res: NextApiResponse
  asPath: string
}

const login = (ctx: Ctx) => {
  return `/login?redirected=true&prevPath=${ctx.asPath}`
}

const checkUserAuthentication = (ctx: Ctx) => {
  const { req, res } = ctx
  const jwt = getCookie('accessToken', { req, res })
  const userData = getCookie('userData', { req, res })
  const parsedUserData = userData && JSON.parse(userData)
  return { auth: !!jwt, userData: parsedUserData }
}

const withAuth = (WrappedComponent: any) => {
  const HocComponent = ({ ...props }) => {
    return <WrappedComponent {...props} />
  }

  HocComponent.getInitialProps = async (ctx: Ctx) => {
    const userAuth = await checkUserAuthentication(ctx)

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (ctx.res) {
        ctx.res?.writeHead(302, {
          Location: login(ctx),
        })
        ctx.res?.end()
      } else {
        Router.replace(login(ctx))
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...ctx,
        auth: userAuth.auth,
        userData: userAuth.userData,
      })
      return { ...wrappedProps }
    }

    return { auth: userAuth.auth, userData: userAuth.userData }
  }

  return HocComponent
}

export default withAuth
