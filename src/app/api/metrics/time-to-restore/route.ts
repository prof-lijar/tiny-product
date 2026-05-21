import { NextResponse } from 'next/server';
import { getTimeToRestoreMetrics } from '@/lib/data/metrics';

export async function GET() {
  try {
    const data = await getTimeToRestoreMetrics();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
