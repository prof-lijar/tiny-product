import { NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth-utils';
import { userData } from '@/lib/data/users';

export async function GET() {
  try {
    const authPayload = await verifyAuthToken();

    if (!authPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await userData.findById(authPayload.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user profile data, excluding the password hash
    return NextResponse.json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
