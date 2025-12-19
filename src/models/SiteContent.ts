
import mongoose, { Schema, model, models } from 'mongoose';

const SiteContentSchema = new Schema({
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
            // Mixed type to allow flexible data structure for different section types
            // Projects: items[] { id, title, visible, imageUrl, ... }
            // Experience: items[] { id, title, description[] { text, visible }, ... }
            data: { type: Schema.Types.Mixed, default: {} },
        },
    ],
}, { timestamps: true });

// Prevent overwrite on HMR
const SiteContent = models.SiteContent || model('SiteContent', SiteContentSchema, 'site_content');

export default SiteContent;
