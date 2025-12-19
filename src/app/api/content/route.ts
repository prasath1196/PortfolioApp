
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;

    try {
        const secretKey = new TextEncoder().encode(process.env.ADMIN_SECRET);
        await jwtVerify(token, secretKey);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    await dbConnect();
    try {
        // Determine if user is admin (to maybe show extra fields? or just reuse this for public)
        // For now, simple fetch.
        let content = await SiteContent.findOne().sort({ createdAt: -1 });

        if (!content) {
            // Seed initial content if empty
            content = await SiteContent.create({
                profile: {
                    name: 'Prasath',
                    tagline: 'Full Stack Engineer',
                    resumeLink: 'https://tr.ee/_3C6JlMK_X',
                    socials: {
                        github: 'https://github.com/prasath1196',
                        linkedin: 'https://linkedin.com/in/prasath-c',
                    }
                },
                sections: [
                    {
                        id: 'stats',
                        type: 'text',
                        title: 'Statistics',
                        data: {
                            items: [
                                { label: 'Experience', value: '4+ Years' },
                                { label: 'Projects', value: '20+' },
                                { label: 'Commits', value: '2k+' }
                            ]
                        }
                    },
                    {
                        id: 'projects',
                        type: 'projects',
                        title: 'Featured Work',
                        data: {
                            items: [
                                { title: 'Project Alpha', desc: 'A revolutionary app', tags: ['React', 'Node'], link: '#' }
                            ]
                        }
                    }
                ]
            });
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await request.json();

        // Upsert the content
        // We could either update the existing one or create new version.
        // For simplicity, let's update the latest one or create new.
        // To allow "revert", maybe create new?
        // User asked for "easy to consume", "json file".
        // Let's just update the single document to keep it simple as requested ("Like a JSON file")

        const updated = await SiteContent.findOneAndUpdate(
            {}, // filter (find first one)
            body,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}
