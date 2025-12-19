
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const SiteContentSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true, default: 'Prasath' },
        tagline: { type: String, default: 'Full Stack Engineer' },
        resumeLink: { type: String, default: 'https://tr.ee/_3C6JlMK_X' },
        socials: { type: Map, of: String },
    },
    sections: [
        {
            id: { type: String, required: true },
            type: { type: String, enum: ['text', 'projects', 'timeline', 'list'], required: true },
            title: { type: String, required: true },
            data: { type: mongoose.Schema.Types.Mixed, default: {} },
        },
    ],
}, { timestamps: true });

const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema, 'site_content');

const projects = [
    {
        id: '1',
        title: 'Rise Agentic Pipeline',
        description: 'Event-driven Agentic pipeline analyzing 10k+ weekly tickets for root-cause insights.',
        longDescription: 'Architected an event-driven Agentic pipeline (AWS Lambda/SQS) analyzing 10k+ weekly tickets for root-cause insights. Implemented RAG-based compliance workflows to validate agent responses against policy docs, saving 20+ weekly audit hours.',
        challenge: 'Our product and ops teams were manually analyzing over 50,000 Zendesk support interactions monthly. This process was slow, and we were missing real-time insights into critical customer pain points.',
        solution: 'I took the initiative to design and build an end-to-end, serverless AI pipeline. I used AWS Lambda and EventBridge to process the interactions in real-time, integrating with the Gemini API to automatically extract, classify, and analyze the sentiment of each customer issue. The data was then stored in DynamoDB.',
        impact: 'Built a real-time dashboard on top of this data that provided immediate visibility and drill-down capabilities. This empowered our product team to move from slow manual analysis to instant, data-driven decisions, which directly informed our product roadmap and feature prioritization.',
        technologies: ['AWS Lambda', 'SQS', 'LangChain', 'RAG', 'DynamoDB', 'Gemini API'],
        category: 'work',
        featured: true
    },
    {
        id: '2',
        title: 'Rise Payment Core',
        description: 'High-performance payment gateway handling 200k+ users with row-level locking.',
        longDescription: 'Engineered concurrency control for payment microservice using row-level locks, improving system reliability for 200k+ users. Reduced median, API latency by 250ms.',
        challenge: 'We had a critical customer-reported bug where payments were failing at a specific time daily. Initial investigation showed no code errors, but the failures were real, indicating a deep system-level conflict.',
        solution: 'I conducted a deep system analysis and discovered a race condition: a background installment update job was locking database rows at the exact same moment users were trying to pay. I implemented a robust Postgres Row-Level Lock strategy to act as a "traffic cop", ensuring user transactions always took precedence.',
        impact: 'This fix completely eliminated the "ghost" payment failures and stabilized the core financial transaction flow for over 200,000 users. It transformed a flaky experience into reliable infrastructure.',
        technologies: ['Python', 'PostgreSQL', 'Redis', 'AWS', 'Row-Level Locking'],
        category: 'work',
        featured: true
    },
    {
        id: '3',
        title: 'LinkBee - AI LinkedIn Agent',
        description: 'Chrome Extension acting as your personal technical career coach and executive assistant for LinkedIn.',
        longDescription: 'LinkBee is a powerful Chrome Extension that acts as your personal technical career coach. It scans your messaging inbox, analyzes conversations using Google Gemini AI, and identifies high-value opportunities to follow up—ensuring you never drop the ball on a recruiter, peer, or lead.',
        challenge: 'Job seekers and professionals struggle to manage hundreds of LinkedIn conversations. High-value opportunities (recruiter messages, referral asks) often get lost in the noise, and "dead threads" are rarely revived effectively because manual tracking is impossible at scale.',
        solution: 'I built a Chrome Extension powered by Google Gemini 2.5 Flash. It utilizes a Service Worker to scan the inbox, auto-scrolls to find old chats, and applies a fuzzy-matching algorithm to locate specific people. The AI classifies chats into 7 strategic playbooks (e.g., "Recruiter Recovery", "Strategic Pivot") and drafts context-aware replies.',
        impact: 'Transforms a chaotic social inbox into a prioritized Sales Pipeline. Features "Smart Navigation" that handles LinkedIn\'s complex SPA architecture without reloading, automated confidence scoring, and context-aware draft suggestions.',
        githubUrl: 'https://github.com/prasath1196/LinkBee',
        technologies: ['Chrome Extension', 'Gemini 2.5 Flash', 'Vite', 'JavaScript', 'Tailwind'],
        category: 'personal',
        featured: true
    },
    {
        id: '4',
        title: 'GitResume',
        description: 'AI-driven service transforming Git commits into quantified resume bullets.',
        longDescription: 'Built an AI-driven service that transforms Git commits into quantified resume bullets, reducing self-reporting effort by 80%. Operates in the $100–500M developer résumé tools (TAM), validated on 500+ commits.',
        challenge: 'Engineers struggle to remember and quantify their impact when writing resumes. Their actual work is buried in thousands of Git commits.',
        solution: 'I built an Agentic workflow that connects to GitHub, analyzes commit history using LLMs, and automatically generates "Resume Ready" bullet points using the STAR method.',
        impact: 'Validated on 500+ commits and reducing the time to write a technical resume by 80%.',
        technologies: ['PostgreSQL', 'GraphQL', 'FastAPI', 'React', 'LLM'],
        category: 'personal',
        featured: true
    },
    {
        id: '5',
        title: 'Enterprise CI/CD Orchestration',
        description: 'Intelligent CI/CD pipeline optimizing deployment efficiency and developer feedback loops.',
        longDescription: 'Architected a sophisticated CircleCI pipeline for the Core Platform API, focusing on reducing cycle time and "shifting left" on quality and security. The pipeline orchestrates testing, security scanning, and multi-environment deployments while keeping project management tools in perfect sync.',
        challenge: 'The engineering team faced slow feedback loops due to sequential testing, manual ticket updates in ClickUp, and silent failures in code quality checks. Deployments were a bottleneck.',
        solution: 'I engineered a parallelized pipeline (CircleCI) that runs RSpec across 4 concurrent nodes. I wrote custom Bash scripts to parse Bundle Audit & Rubocop results and post them directly as comments on GitLab Merge Requests. I also built automation to move ClickUp tickets based on branch status.',
        impact: 'Reduced build/test time by 50% via parallelization. The "Bot Feedback" on MRs enforced zero-vulnerability standards without human intervention. Ticket automation saved ~2 hours of admin work per dev/week.',
        technologies: ['CircleCI', 'Docker', 'Bash', 'GitLab API', 'ClickUp API', 'Ruby'],
        category: 'work',
        featured: true
    },
    {
        id: '6',
        title: 'Automated e-KYC',
        description: 'Automated identity verification system reducing onboarding time by 95%.',
        longDescription: 'Built a lightweight, high-impact identity verification service to replace a manual admin process. The system automatically extracts, validates, and processes user ID documents.',
        challenge: 'New user onboarding was a manual bottleneck. Admins had to physically look at uploaded IDs and type data into the dashboard. This caused a 3-day wait time for users and high drop-off rates.',
        solution: 'Instead of over-engineering a custom ML model, I initiated a "scrappy" solution using FastAPI and the Google Vision OCR API. I built a wrapper service that accepted ID images, sanitized the OCR output, and auto-filled the admin review form.',
        impact: ' slashed user verification time from 3 days to near-instant. Automated 95% of all applications, leaving admins to handle only the edge cases.',
        technologies: ['Python', 'FastAPI', 'Google Vision API', 'OCR'],
        category: 'work',
        featured: true
    }
];

const resumeData = {
    personalInfo: {
        name: 'Prasath Rajasekaran',
        title: 'Senior Software Engineer | Python • Ruby • Typescript • AWS',
        email: 'prasath1196@gmail.com',
        phone: '(510) 935-3771',
        location: 'Newark, California, United States',
        summary: `I am a Senior Software Engineer with 6 years of experience building Fintech & Data infrastructure.\n\nMISSION:\nTo architect scalable, reliable systems that power financial access and high-stakes decision making.\n\nCAPABILITIES:\n• System Architecture (Event-Driven/Serverless)\n• High-Concurrency Payments (200k+ users)\n• Agentic AI Pipelines (RAG/LangChain)\n\nLOOKING FOR:\nA founding/core engineering role to solve complex 0-1 technical challenges at scale.`,
    },
    experience: [
        {
            id: '1',
            title: 'Senior Software Engineer (Graduate Co-op)',
            company: 'Rise',
            location: 'United States',
            startDate: '2025-05',
            endDate: '2025-11',
            description: [
                'Architected an event-driven Agentic pipeline (AWS Lambda/SQS) analyzing 10k+ weekly tickets for root-cause insights.',
                'Implemented RAG-based compliance workflows to validate agent responses against policy docs, saving 20+ weekly audit hours.',
                'Engineered a LangChain agent that detects anomaly clusters and autonomously drafts engineering tickets with 95% precision.',
                'Engineered concurrency control for payment microservice using row-level locks, improving system reliability for 200k+ users.',
                'Built a type-safe analytics dashboard (React/TypeScript) using generic HOCs and custom hooks, for visualizing 50k+ interactions.',
                'Implemented a secure data pipeline to migrate RDS snapshots via S3 to Snowflake, powering BI and key metrics tracking.'
            ],
            technologies: ['AWS Lambda', 'SQS', 'LangChain', 'RAG', 'React', 'TypeScript', 'Snowflake']
        },
        {
            id: '2',
            title: 'Senior Software Engineer',
            company: 'Rootquotient',
            location: 'India',
            startDate: '2021-12',
            endDate: '2023-11',
            description: [
                'Automated e-KYC onboarding with FastAPI and Google OCR for 95% of new user applications, slashing onboarding time by 3 days.',
                'Integrated a payment gateway with state-driven workflow and SQS queues, routing 60% of the platform’s repayments.',
                'Engineered CI/CD pipeline with Docker builds and CircleCI, reducing deployment time by 50% and enabling faster releases.',
                'Reduced incident detection from 15 min to 3 min by deploying Datadog across 3 services and wiring real-time alerts.',
                'Developed a Shopify loyalty application (Rails) on Kubernetes that resulted in a 20% increase in recurring purchases.',
                'Led a cross-functional team of 10, achieving 95% on-time production deployment across 5+ apps.'
            ],
            technologies: ['FastAPI', 'Google OCR', 'SQS', 'Docker', 'CircleCI', 'Datadog', 'Rails', 'Kubernetes']
        },
        {
            id: '3',
            title: 'Software Development Engineer',
            company: 'Forensic Alpha',
            location: 'India',
            startDate: '2020-02',
            endDate: '2021-11',
            description: [
                'Optimized research report generation from a day to an hour by automating 50+ ETL tasks into microservices on AWS Lambda.',
                'Built a dashboard with React & TypeScript surfacing 350+ research metrics in real time, reducing analyst reporting prep from several hours to under 30 minutes.',
                'Led infrastructure migration from GCP to AWS, optimized EC2, RDS, and Lambda usage, and cut cloud costs by 30%.'
            ],
            technologies: ['AWS Lambda', 'React', 'TypeScript', 'EC2', 'RDS']
        },
        {
            id: '4',
            title: 'Software Engineer',
            company: 'Crediwatch',
            location: 'India',
            startDate: '2019-06',
            endDate: '2020-01',
            description: [
                'Built a Ruby microservice to automate company risk scoring from 200+ daily news articles, reducing analysis time by 90%.',
                'Deployed unified SSO across 5 microservices (OAuth, SAML, Cognito), enabling a seamless login experience for 50+ employees.',
                'Designed and deployed a scalable microservice with Rails, React, and Elasticsearch, cutting document search times by 60%.'
            ],
            technologies: ['Ruby', 'OAuth', 'SAML', 'Cognito', 'Rails', 'Elasticsearch']
        },
        {
            id: '5',
            title: 'Software Engineer',
            company: 'Digiryte',
            location: 'India',
            startDate: '2018-01',
            endDate: '2019-05',
            description: [
                'Built e-commerce modules (cart, discounts, delivery), reducing manual order handling by 40% for wholesale vendors.',
                'Built an Android module analyzing signal and usage data, enabling users to access the best prepaid plans and improve accuracy.'
            ],
            technologies: ['Android', 'E-commerce']
        }
    ],
    education: [
        {
            id: '1',
            degree: 'Master of Science, Information Systems',
            institution: 'University of Cincinnati',
            location: 'Cincinnati, United States',
            graduationDate: 'Dec 2025',
            grade: '3.99 GPA'
        },
        {
            id: '2',
            degree: 'Master of Science (Integrated), Information Technology',
            institution: 'Anna University',
            location: 'Chennai, India',
            graduationDate: 'May 2018',
            grade: '8.05 GPA'
        }
    ],
    skills: [
        { category: 'Programming Languages & Frameworks', skills: ['Python', 'Ruby', 'TypeScript', 'SQL', 'Bash', 'FastAPI', 'Ruby on Rails', 'React', 'GraphQL'] },
        { category: 'AI & LLM Engineering', skills: ['LangChain', 'RAG Pipelines', 'Agentic Workflows', 'Gemini Models', 'Vector Search', 'Elasticsearch'] },
        { category: 'Cloud & Infra', skills: ['AWS (Lambda, S3, EC2, RDS, SAM, Eventbridge)', 'Docker', 'GCP', 'CircleCI'] },
        { category: 'Databases & Storage', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis', 'Elasticsearch'] },
        { category: 'Messaging & Monitoring', skills: ['SQS', 'CloudWatch', 'Datadog', 'Pub/Sub'] },
        { category: 'Tools', skills: ['Git', 'Cursor', 'Claude Code'] }
    ]
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const content = {
            profile: {
                name: resumeData.personalInfo.name,
                tagline: resumeData.personalInfo.title,
                resumeLink: 'https://tr.ee/_3C6JlMK_X',
                socials: {
                    email: resumeData.personalInfo.email,
                    linkedin: 'https://linkedin.com/in/prasath-c',
                    github: 'https://github.com/prasath1196',
                    blog: 'https://theboringbatman.substack.com/'
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
                            { label: 'Projects', value: `${projects.length}+` },
                            { label: 'Certifications', value: 'AWS SA' }
                        ]
                    }
                },
                {
                    id: 'projects',
                    type: 'projects',
                    title: 'Featured Work',
                    data: {
                        items: projects
                    }
                },
                {
                    id: 'experience',
                    type: 'timeline',
                    title: 'Experience',
                    data: {
                        items: resumeData.experience
                    }
                },
                {
                    id: 'education',
                    type: 'timeline',
                    title: 'Education',
                    data: {
                        items: resumeData.education
                    }
                },
                {
                    id: 'skills',
                    type: 'list',
                    title: 'Skills',
                    data: {
                        items: resumeData.skills
                    }
                },
                {
                    id: 'about',
                    type: 'text',
                    title: 'About Me',
                    data: {
                        content: resumeData.personalInfo.summary
                    }
                }
            ]
        };

        await SiteContent.findOneAndUpdate(
            {},
            content,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log('Content seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding content:', error);
        process.exit(1);
    }
}

seed();
