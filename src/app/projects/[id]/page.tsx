import dbConnect from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import { notFound } from 'next/navigation';
import ProjectDetailView from '@/components/projects/ProjectDetailView';

export const dynamic = 'force-dynamic';

async function getProject(id: string) {
    await dbConnect();
    const content = await SiteContent.findOne().sort({ createdAt: -1 }).lean();
    if (!content) return null;

    const sections = (content as any).sections || [];
    const projectsSection = sections.find((s: any) => s.id === 'projects');
    if (!projectsSection) return null;

    const project = projectsSection.data.items.find((p: any) => p.id === id);
    return JSON.parse(JSON.stringify(project || null));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return notFound();
    }

    return <ProjectDetailView project={project} />;
}
