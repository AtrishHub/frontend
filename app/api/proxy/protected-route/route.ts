import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export async function GET(req: NextRequest) {
  try {
    const session = await auth0.getSession(req);
    console.log("Session object:", session);

    const accessToken = session?.accessToken || session?.tokenSet?.accessToken;
    console.log("Access Token:", accessToken);

    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json(
        { error: 'No valid access token found' },
        { status: 401 }
      );
    }

    const backendRes = await fetch('http://localhost:3001/auth', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy error', details: String(error) },
      { status: 500 }
    );
  }
}
