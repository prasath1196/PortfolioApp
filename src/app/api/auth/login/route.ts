
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import * as bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Missing credentials' },
                { status: 400 }
            );
        }

        await dbConnect();

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isValid = await bcrypt.compare(password, admin.password);

        if (isValid) {
            const secretKey = new TextEncoder().encode(process.env.ADMIN_SECRET);
            const alg = 'HS256';

            const token = await new SignJWT({ admin: true, email: admin.email })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(secretKey);

            const response = NextResponse.json({ success: true });

            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
