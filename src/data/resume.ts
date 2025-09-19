export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string[];
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  summary: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: 'Prasath Rajasekaran',
    title: 'Senior Software Engineer',
    email: 'prasath1196@gmail.com',
    phone: '510-935-3771',
    location: 'Newark, California',
    photo: '/src/assets/images/professional-photo.svg',
    summary: '',
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer (Co-op) - Payments',
      company: 'Deall Inc',
      location: 'United States',
      startDate: '2025-05',
      description: [
        'Overhauled an overdue payment microservice using Python, SQL (PostgreSQL), and AWS RDS with granular row-level locks and atomic transactions, reducing fee miscalculations by 75% and improving system reliability for 100k+ users',
        'Developed a high-performance payment gateway utilizing Python API with Redis caching to slash median latency by 250ms, enabling faster transaction settlements',
        'Built a real-time dashboard with React tracking 15+ KPIs across 100+ vendors, enabling the ops team to monitor financial risk',
        'Engineered a secure AWS data pipeline, migrating RDS snapshots in S3 to Snowflake, that powered business intelligence dashboards, enabling leadership to track key financial and operational metrics'
      ],
      technologies: ['Python', 'SQL', 'PostgreSQL', 'AWS RDS', 'Redis', 'React', 'Snowflake', 'S3']
    },
    {
      id: '2',
      title: 'Senior Software Engineer - Software Services',
      company: 'Rootquotient',
      location: 'India',
      startDate: '2021-11',
      endDate: '2023-11',
      description: [
        'Implemented an automated e-KYC onboarding using Fast API and Google OCR, processing 95% of new user applications without manual intervention and slashing onboarding time by 72 hours',
        'Routed 60% of repayments through a secure e-wallet system orchestrated with a multi-step, state-driven workflow, and SQS queues for decoupling the repayment services',
        'Revamped the CI/CD pipeline utilizing Git, Docker, and CircleCI, decreasing deployment time by 50% and accelerating the software release cycle for critical payment features',
        'Reduced incident detection from 15 min to 3 min by deploying Datadog across 3 services and wiring real-time alerts',
        'Led a cross-functional team of 10, implemented delivery best practices, achieving 95% on-time production rollout across 5+ apps',
        'Developed and deployed a Shopify loyalty management application in Ruby on Rails, integrating Auth0 SSO with existing loyalty and customer systems, streamlining authentication flows, and driving a 20% increase in repeat purchases'
      ],
      technologies: ['Fast API', 'Google OCR', 'SQS', 'Docker', 'CircleCI', 'Datadog', 'Ruby on Rails', 'Auth0']
    },
    {
      id: '3',
      title: 'Software Engineer - Equity Research',
      company: 'Forensic Alpha',
      location: 'India',
      startDate: '2020-02',
      endDate: '2021-10',
      description: [
        'Optimized research report generation from a day to an hour by breaking a monolithic ETL pipeline into Rails microservices and on AWS Lambda, automating 50+ data processing tasks',
        'Built a dashboard with React & TypeScript surfacing 350+ research metrics in real time, reducing analyst reporting prep from several hours to under 30 minutes and enabling faster client deliverables',
        'Led infrastructure migration from GCP to AWS; optimized EC2, RDS, and Lambda usage; cut cloud costs by 30%'
      ],
      technologies: ['Ruby on Rails', 'AWS Lambda', 'React', 'TypeScript', 'EC2', 'RDS', 'GCP']
    },
    {
      id: '4',
      title: 'Software Engineer - Credit Monitoring',
      company: 'Crediwatch',
      location: 'India',
      startDate: '2019-06',
      endDate: '2020-01',
      description: [
        'Automated risk scoring for companies by developing a Ruby microservice that ingests 200+ news articles per day, reducing 90% of manual analyst intervention',
        'Deployed unified SSO across five internal microservices (OAuth, SAML, Cognito), reducing developer onboarding time by 20%'
      ],
      technologies: ['Ruby', 'OAuth', 'SAML', 'AWS Cognito']
    },
    {
      id: '5',
      title: 'Software Engineer - Software Services',
      company: 'Digiryte',
      location: 'India',
      startDate: '2018-01',
      endDate: '2019-05',
      description: [
        'Designed a scalable web application architecture utilizing Elasticsearch, React, and Rails, cutting agreement search times by 60% using Elastic Cloud and background jobs'
      ],
      technologies: ['Elasticsearch', 'React', 'Ruby on Rails', 'Elastic Cloud']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Masters, Information Systems',
      institution: 'University of Cincinnati',
      location: 'Cincinnati, United States',
      graduationDate: 'Expected 2025',
      gpa: '3.99',
      honors: ['Graduate Teaching Assistant: Digital Tech in Business - Instructed Python to 100+ business students']
    },
    {
      id: '2',
      degree: 'Integrated MSc, Information Technology',
      institution: 'Anna University',
      location: 'Chennai, India',
      graduationDate: 'July 2013 — May 2018'
    }
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Python', 'Ruby', 'SQL', 'JavaScript/TypeScript', 'Bash']
    },
    {
      category: 'Frameworks',
      skills: ['FastAPI', 'Rails', 'Django', 'React', 'GraphQL']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS (Lambda, S3, EC2, RDS)', 'Docker', 'Kubernetes', 'CircleCI', 'Git']
    },
    {
      category: 'Databases & Caching',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch']
    },
    {
      category: 'Messaging & Monitoring',
      skills: ['SQS', 'CloudWatch', 'Datadog']
    },
    {
      category: 'Certifications',
      skills: ['AWS Certified Solutions Architect']
    }
  ],
};
