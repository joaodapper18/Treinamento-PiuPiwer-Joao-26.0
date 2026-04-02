import { NextRequest, NextResponse } from "next/server";
import type { Role } from "./generated/prisma"; // Importar apenas o 'type' não quebra o Edge

// Configuration for different page types
const ROUTE_CONFIG = {
  authRequired: [
    "/aprender",
    "/dashboard",
    "/perfil",
    "/settings",
  ],
  adminRequired: [
    "/admin/**",
  ],
  redirectIfAuth: [
    "/login",
    "/cadastro",
  ],
  specialRoutes: [
    "/admin", 
  ]
};

function matchesAnyPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.endsWith('**')) {
      const basePattern = pattern.slice(0, -2);
      return pathname.startsWith(basePattern);
    }
    return pathname === pattern || pathname.startsWith(pattern + '/');
  });
}

function hasRequiredRole(userRole: Role | undefined, requiredRoles: Role[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // A MÁGICA: Em vez de importar o auth.ts e o Prisma, fazemos uma requisição HTTP limpa
  let sessionData = null;
  try {
    const response = await fetch(new URL("/api/auth/get-session", request.url), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    if (response.ok) {
      sessionData = await response.json();
    }
  } catch (error) {
    console.error("Erro ao buscar sessão no middleware:", error);
  }
  
  const userRole = sessionData?.user?.role as Role | undefined;
  const isAuthenticated = !!sessionData?.session;

  if (pathname === "/admin") {
    if (!isAuthenticated) {
      return NextResponse.next();
    }
    
    if (hasRequiredRole(userRole, ["ADMIN", "SUPER_ADMIN"])) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (matchesAnyPattern(pathname, ROUTE_CONFIG.redirectIfAuth)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/aprender", request.url));
    }
    return NextResponse.next();
  }

  if (matchesAnyPattern(pathname, ROUTE_CONFIG.adminRequired)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    
    if (!hasRequiredRole(userRole, ["ADMIN", "SUPER_ADMIN"])) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.next();
  }

  if (matchesAnyPattern(pathname, ROUTE_CONFIG.authRequired)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Removi o runtime: "nodejs" porque a Vercel exige Edge para o middleware
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
