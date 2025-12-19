import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const SiteContentSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true, default: 'Prasath' },
        tagline: { type: String, default: 'Full Stack Engineer' },
        resumeLink: { type: String, default: 'https://tr.ee/_3C6JlMK_X' },
        socials: { type: Object },
    },
    sections: [
        {
            id: { type: String, required: true },
            type: { type: String, enum: ['text', 'projects', 'timeline', 'list'], required: true },
            title: { type: String, required: true },
            visible: { type: Boolean, default: true },
            data: { type: mongoose.Schema.Types.Mixed, default: {} },
        },
    ],
}, { timestamps: true });

const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema, 'site_content');

async function updateContent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const finalHtml = `
<p class="mb-6">
  I architect high-performance systems with a focus on scalability and reliability.
  My expertise lies in <strong>Backend Engineering</strong> and <strong>Distributed Systems</strong>, ensuring the invisible machinery of products works flawlessly.
</p>

<div class="mb-6">
  <h3 class="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">Current Focus</h3>
  <p>Architecting autonomous AI agents and engineering scalable, event-driven backend infrastructure.</p>
</div>

<div class="mb-6">
  <h3 class="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">Core Philosophy</h3>
  <p>Simplicity is the ultimate sophistication. Code should be clean, efficient, and maintainable.</p>
</div>

<blockquote class="border-l-2 border-emerald-500/50 pl-4 italic text-zinc-500">
  "Simplicity is the ultimate sophistication. Complex systems fail at scale; simple, decoupled architectures endure."
</blockquote>
`;

        const content = await SiteContent.findOne().sort({ createdAt: -1 });

        if (content) {
            // Update Profile Tagline to reflect Backend focus
            content.profile.tagline = "Software Engineer (Backend & Distributed Systems)";

            // Update About Section
            const aboutSection = content.sections.find(s => s.id === 'about' || s.title?.toLowerCase() === 'about me');
            if (aboutSection) {
                aboutSection.data = { content: finalHtml };
            } else {
                content.sections.unshift({
                    id: 'about',
                    type: 'text',
                    title: 'About Me',
                    visible: true,
                    data: { content: finalHtml }
                });
            }

            await content.save();
            console.log('Updated profile and about section.');
        } else {
            console.log('No content found to update.');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateContent();
