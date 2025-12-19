
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const secretKey = new TextEncoder().encode(process.env.ADMIN_SECRET);
        await jwtVerify(token, secretKey);
        return NextResponse.json({ authenticated: true });
    } catch (e) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
