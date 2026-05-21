import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface RegisterRequestBody {
  email: string;
  password: string;
}

const users = [];

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequestBody = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const existingUser = users.find(user => user.email === body.email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(body.password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long and include uppercase, lowercase, and numeric characters' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const newUser = {
      id: users.length + 1,
      email: body.email,
      password: hashedPassword,
    };

    users.push(newUser);

    return NextResponse.json({ data: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
