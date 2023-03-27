import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {

    const jwt = request.cookies.get("myToken")
    console.log(request.url);
    console.log(jwt);
    
  if (request.nextUrl.pathname.startsWith("/")) {
    if(jwt === undefined){
        return NextResponse.redirect(new URL("/login", request.url))
    }
    try {
        const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode("asdasd"))
        console.log(payload);
        
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

  }
  return NextResponse.next()
}