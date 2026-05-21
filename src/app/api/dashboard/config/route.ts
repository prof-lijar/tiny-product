import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth-utils';
import { getUserDashboardConfig, saveUserDashboardConfig } from '@/lib/data/dashboard';
import { DashboardConfig } from '@/types/dashboard';

const DEFAULT_CONFIG: DashboardConfig = {
  widgets: [
    { id: 'lead-time-metric', x: 0, y: 0, w: 3, h: 2, isEnabled: true },
    { id: 'cycle-time-metric', x: 3, y: 0, w: 3, h: 2, isEnabled: true },
    { id: 'deployment-frequency-metric', x: 6, y: 0, w: 3, h: 2, isEnabled: true },
    { id: 'change-failure-rate-metric', x: 0, y: 2, w: 3, h: 2, isEnabled: true },
    { id: 'work-distribution-analysis', x: 3, y: 2, w: 6, h: 2, isEnabled: true },
  ],
};

export async function GET() {
  try {
    const auth = await verifyAuthToken();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const config = await getUserDashboardConfig(auth.userId);
    
    return NextResponse.json({ 
      data: config || DEFAULT_CONFIG 
    });
  } catch (error) {
    console.error('GET /api/dashboard/config error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuthToken();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body.widgets || !Array.isArray(body.widgets)) {
      return NextResponse.json({ error: 'Invalid request body: widgets array is required' }, { status: 400 });
    }

    // Basic validation of widget structure
    for (const widget of body.widgets) {
      if (!widget.id || typeof widget.x !== 'number' || typeof widget.y !== 'number' || 
          typeof widget.w !== 'number' || typeof widget.h !== 'number' || typeof widget.isEnabled !== 'boolean') {
        return NextResponse.json({ error: 'Invalid widget configuration' }, { status: 400 });
      }
    }

    const config: DashboardConfig = {
      widgets: body.widgets,
    };

    await saveUserDashboardConfig(auth.userId, config);
    
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error('POST /api/dashboard/config error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
