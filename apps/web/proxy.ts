
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const response = await getSession();

    if (!response.ok) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const session = await response.json();

    // Adapte ce chemin à la structure réelle de ta réponse.
    const emailVerified = session?.user?.emailVerified;

    if (emailVerified !== true) {
      return NextResponse.redirect(
        new URL("/verify-email", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Session verification failed:", error);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
