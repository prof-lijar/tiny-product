import { NextResponse } from 'next/server';
import { getWorkDistributionMetrics } from '@/lib/data/metrics';

export async function GET() {
  try {
    const distribution = await getWorkDistributionMetrics();
    return NextResponse.json({ data: distribution });
  } catch (error) {
    console.error('Error fetching work distribution:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
