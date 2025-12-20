
import dbConnect from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import DesktopLayout from '@/components/DesktopLayout';
import MobileLayout from '@/components/mobile/MobileLayout';

// Force dynamic rendering to ensure fresh content on every request
export const dynamic = 'force-dynamic';

async function getData() {
  await dbConnect();
  const content = await SiteContent.findOne().sort({ createdAt: -1 });
  if (!content) return null;
  return JSON.parse(JSON.stringify(content));
}

export default async function Home() {
  const data = await getData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
        <p className="animate-pulse">Initializing system...</p>
      </div>
    );
  }

  return (
    <>
      <DesktopLayout data={data} />
      <MobileLayout data={data} />
    </>
  );
}

