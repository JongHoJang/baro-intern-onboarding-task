import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  // Cookie에서 accessToken 확인
  const token = req.cookies.get('accessToken')

  // 로그인된 상태에서 로그인 페이지로 이동 막기
  if (req.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (req.nextUrl.pathname === '/signup' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // 로그인되지 않은 상태에서 막기
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!token && req.nextUrl.pathname.startsWith('/mypage')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 나머지 요청들은 계속 처리
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/mypage', '/signup'], // 미들웨어가 적용될 경로 설정
}
