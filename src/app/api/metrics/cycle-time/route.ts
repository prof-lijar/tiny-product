import { NextResponse } from 'next/server';
import { getCycleTimeMetrics } from '@/lib/data/metrics';

export async function GET() {
  try {
    const data = await getCycleTimeMetrics();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
