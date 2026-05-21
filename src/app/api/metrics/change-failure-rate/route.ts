import { NextResponse } from 'next/server';
import { getChangeFailureRateMetrics } from '@/lib/data/metrics';

export async function GET() {
  try {
    const data = await getChangeFailureRateMetrics();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
