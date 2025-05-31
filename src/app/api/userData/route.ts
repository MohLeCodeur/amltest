// src/app/api/userData/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    // En production, vous utiliseriez une vraie API blockchain comme Etherscan
    // Ceci est un exemple simplifié
    const mockData = {
     
      network: "Ethereum Mainnet"
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}