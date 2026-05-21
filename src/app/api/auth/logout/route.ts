import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * API Route for User Logout
 * This endpoint removes the authentication token from the cookies,
 * effectively ending the user's session.
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Remove the authentication token cookie by setting its maxAge to 0
    cookieStore.set('auth_token', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return NextResponse.json({
      data: { message: 'Successfully logged out' },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
