import { NextRequest, NextResponse } from 'next/server';
import { getMetrics, saveMetrics } from '@/lib/data/metrics';

export async function GET() {
  try {
    const metrics = await getMetrics();
    return NextResponse.json({ data: metrics });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await saveMetrics(body);
    return NextResponse.json({ data: { message: 'Metrics updated successfully' } });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
