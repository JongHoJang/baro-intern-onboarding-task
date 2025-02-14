import { NextResponse } from 'next/server'
import { middleware } from './middleware' // 실제 middleware 파일 경로

// mock for NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}))

describe('middleware', () => {
  let req: any

  beforeEach(() => {
    req = {
      cookies: {
        get: jest.fn(), // mock for cookies.get
      },
      nextUrl: {
        pathname: '', // mock for nextUrl.pathname
      },
      url: 'http://localhost',
    }
  })

  it('should redirect to /dashboard if already logged in and trying to access /login', async () => {
    req.nextUrl.pathname = '/login'
    req.cookies.get.mockReturnValue('fake-token') // Simulate token in cookies

    const res = await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/dashboard',
      })
    )
  })

  it('should redirect to /dashboard if already logged in and trying to access /signup', async () => {
    req.nextUrl.pathname = '/signup'
    req.cookies.get.mockReturnValue('fake-token') // Simulate token in cookies

    const res = await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/dashboard',
      })
    )
  })

  it('should redirect to /login if not logged in and trying to access /dashboard', async () => {
    req.nextUrl.pathname = '/dashboard'
    req.cookies.get.mockReturnValue(undefined) // No token in cookies

    const res = await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/login',
      })
    )
  })

  it('should redirect to /login if not logged in and trying to access /mypage', async () => {
    req.nextUrl.pathname = '/mypage'
    req.cookies.get.mockReturnValue(undefined) // No token in cookies

    const res = await middleware(req)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/login',
      })
    )
  })

  it('should allow access to other pages when logged in', async () => {
    req.nextUrl.pathname = '/some-other-page'
    req.cookies.get.mockReturnValue('fake-token') // Simulate token in cookies

    const res = await middleware(req)
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('should allow access to /login if no token is present', async () => {
    req.nextUrl.pathname = '/login'
    req.cookies.get.mockReturnValue(undefined) // No token in cookies

    const res = await middleware(req)
    expect(NextResponse.next).toHaveBeenCalled()
  })
})
