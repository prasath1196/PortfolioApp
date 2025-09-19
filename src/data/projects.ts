export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'work' | 'personal';
  expertiseAreas: ExpertiseArea[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type ExpertiseArea =
  | 'Software'
  | 'Data Analytics'
  | 'AI'
  | 'Cloud'
  | 'Project Management';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Payment Microservice Overhaul',
    description: 'Overhauled overdue payment microservice with granular row-level locks and atomic transactions, reducing fee miscalculations by 75%.',
    longDescription: 'Led the complete overhaul of a critical payment microservice at Deall Inc, implementing granular row-level locks and atomic transactions. This project improved system reliability for 100,000+ users and achieved a 75% reduction in fee miscalculations. The solution involved complex database optimization and concurrent processing improvements.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'PostgreSQL', 'Redis', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'Cloud', 'Data Analytics'],
    featured: true
  },
  {
    id: '2',
    title: 'High-Performance Payment Gateway',
    description: 'Engineered a high-performance payment gateway utilizing Redis caching to slash median latency by 250ms.',
    longDescription: 'Designed and implemented a high-performance payment gateway system that leverages Redis caching to dramatically improve transaction processing speed. The solution enabled 2x faster transaction settlements and significantly improved user experience for real-time payment processing.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'Redis', 'PostgreSQL', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'Cloud'],
    featured: true
  },
  {
    id: '3',
    title: 'Real-time Financial Risk Dashboard',
    description: 'Built a real-time dashboard tracking 15+ KPIs across 86 vendors for instant financial risk monitoring.',
    longDescription: 'Developed a comprehensive real-time dashboard using React and Chart.js that provides instant monitoring of financial risk metrics. The dashboard tracks over 15 key performance indicators across 86 vendors, enabling rapid decision-making and risk assessment for the payments team.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
    technologies: ['React', 'Chart.js', 'Python', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'Data Analytics', 'Cloud'],
    featured: true
  },
  {
    id: '4',
    title: 'Automated e-KYC Onboarding System',
    description: 'Engineered automated e-KYC system processing 95% of 100k+ user applications without manual intervention.',
    longDescription: 'Built and launched a fully automated e-KYC onboarding system that processes over 100,000 user applications with 95% automation rate. The system leverages Google OCR for document processing and reduced onboarding time by 72 hours, dramatically improving user experience and operational efficiency.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'Google OCR', 'PostgreSQL', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'AI', 'Cloud'],
    featured: true
  },
  {
    id: '5',
    title: 'Secure E-Wallet System',
    description: 'Orchestrated secure e-wallet system routing 60% of repayments through multi-step, state-driven workflow.',
    longDescription: 'Designed and implemented a secure e-wallet system that handles 60% of all repayments through a sophisticated multi-step, state-driven workflow. The system leverages SQS queues for payment processing and AWS SNS for notifications, ensuring reliable and secure financial transactions.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'SQS', 'AWS SNS', 'PostgreSQL', 'Redis'],
    category: 'work',
    expertiseAreas: ['Software', 'Cloud', 'Project Management'],
    featured: false
  },
  {
    id: '6',
    title: 'FinePrint-AI',
    description: 'Open-source AI tool for automated Terms of Service risk assessment, reducing manual effort by 90%.',
    longDescription: 'Created FinePrint-AI, an innovative open-source AI tool that automates Terms of Service risk assessment. Using Python and OpenAI API, the tool analyzes and ranks legal documents, reducing manual review effort by 90% and helping businesses quickly identify potential risks in legal agreements.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'OpenAI API', 'LangChain', 'FastAPI'],
    category: 'personal',
    expertiseAreas: ['AI', 'Software'],
    githubUrl: 'https://github.com/prasath1196/FinePrint-AI',
    featured: true
  },
  {
    id: '7',
    title: 'Scalable Search Platform',
    description: 'Designed scalable search platform using Elasticsearch, cutting agreement search times by 60%.',
    longDescription: 'Built a high-performance search platform utilizing Elasticsearch, React, and Rails that dramatically improved search capabilities. The platform reduced agreement search times by 60% using Elastic Cloud and background job processing, significantly enhancing user productivity.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop&crop=center',
    technologies: ['Elasticsearch', 'React', 'Ruby on Rails', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'Data Analytics', 'Cloud'],
    featured: false
  },
  {
    id: '8',
    title: 'Automated Risk Scoring System',
    description: 'Developed Python microservice for automated risk scoring, eliminating 90% of manual analyst intervention.',
    longDescription: 'Created an intelligent risk scoring system using Python microservices that automates credit risk assessment. The system eliminated 90% of manual analyst intervention while maintaining high accuracy, significantly improving operational efficiency and reducing processing time.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
    technologies: ['Python', 'MySQL', 'Redis', 'AWS'],
    category: 'work',
    expertiseAreas: ['Software', 'AI', 'Data Analytics'],
    featured: false
  }
];
