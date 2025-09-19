import React from 'react';
import { resumeData } from '../../data/resume';
import type { WorkExperience, Education, Skill } from '../../data/resume';
import Card from '../ui/Card';

const Resume: React.FC = () => {
  const { personalInfo, experience, education, skills } = resumeData;

  const formatDate = (dateString: string): string => {
    // Handle special cases like "Expected 2025" or "July 2013 — May 2018"
    if (dateString.includes('Expected') || dateString.includes('—') || dateString.includes('-')) {
      return dateString;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return as-is if not a valid date
    }
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const ExperienceCard: React.FC<{ exp: WorkExperience }> = ({ exp }) => (
    <Card className="mb-6 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-1">
          {exp.title} • <span className="text-blue-300 font-medium">{exp.company}</span> • <span className="text-gray-300 text-lg">{exp.location}</span>
        </h3>
        <p className="text-gray-300 text-sm">
          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
        </p>
      </div>
      
      <ul className="space-y-3 mb-4 text-gray-200">
        {exp.description.map((item, index) => (
          <li key={index} className="flex items-start gap-3 leading-relaxed">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2.5"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      {exp.technologies && (
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Card>
  );

  const EducationCard: React.FC<{ edu: Education }> = ({ edu }) => (
    <Card className="mb-4 p-6">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-1">
          {edu.degree} • <span className="text-blue-300 font-medium">{edu.institution}</span> • <span className="text-gray-300">{edu.location}</span>
        </h3>
        <div className="text-gray-300 text-sm">
          <p>{edu.graduationDate}</p>
          {edu.gpa && <p>GPA: {edu.gpa}</p>}
        </div>
      </div>
      
      {edu.honors && edu.honors.length > 0 && (
        <div className="mt-3">
          <p className="text-gray-200 text-sm font-medium mb-2">Honors:</p>
          <ul className="space-y-2">
            {edu.honors.map((honor, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                <span>{honor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );

  const SkillsGrid: React.FC<{ skillCategories: Skill[] }> = ({ skillCategories }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <span 
                key={skillIndex}
                className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-400/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const handleDownloadOnlineCV = () => {
    // Open the CV in a new tab for download
    window.open('https://prasath-rajasekaran.tiiny.site/', '_blank');
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-left">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Resume
            </h2>
            <button
              onClick={handleDownloadOnlineCV}
              className="text-white/70 hover:text-white transition-colors duration-300"
              aria-label="Download Resume"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {personalInfo.summary}
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <div className="space-y-6">
            {experience.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-left">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu) => (
              <EducationCard key={edu.id} edu={edu} />
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-left">
            Technical Skills
          </h3>
          <SkillsGrid skillCategories={skills} />
        </div>
      </div>
    </section>
  );
};

export default Resume;