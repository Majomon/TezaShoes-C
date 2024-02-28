import { NextResponse } from "next/server";

export function middleware(request) {
  // Obtener el valor de la cookie "admin"
  const adminCookie = request.cookies.get("isAdmin");

  // Verificar si la cookie existe y su valor es "true"
  if (!adminCookie || adminCookie.value !== "true") {
    // Redireccionar al usuario al home si no es admin
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Permitir el acceso si la cookie es admin
  return NextResponse.next();
}
export const config = {
  matcher: "/dashboard/:path*",
};

