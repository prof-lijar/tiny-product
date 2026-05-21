import { NextRequest, NextResponse } from 'next/server';
import * as data from '../../lib/data/userData'; // Assuming we have a userData module for handling user data
import { validateToken } from '../../lib/actions/authActions';
type UserProfileUpdate = {
  username?: string;
  email?: string;
  bio?: string;
};
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = validateToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    const body = await request.json() as UserProfileUpdate;
    const updatedUser = data.updateUserProfile(userId, body);
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}