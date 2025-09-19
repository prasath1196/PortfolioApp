import React, { useState, useEffect } from 'react';
import { projects } from '../../data/projects';
import type { Project, ExpertiseArea } from '../../data/projects';
import { ProjectCard } from '../common/ProjectCard';
import { ExpertiseFilter } from '../common/ExpertiseFilter';
import { ProjectDetailModal } from '../common/ProjectDetailModal';

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ExpertiseArea | 'All'>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const expertiseAreas: (ExpertiseArea | 'All')[] = [
    'All',
    'Software',
    'Data Analytics',
    'AI',
    'Cloud',
    'Project Management'
  ];

  // Filter projects when selectedFilter changes
  useEffect(() => {
    setIsAnimating(true);
    
    // Short delay to allow animation to start before changing data
    const timer = setTimeout(() => {
      const newFilteredProjects = selectedFilter === 'All' 
        ? projects 
        : projects.filter(project => project.expertiseAreas.includes(selectedFilter as ExpertiseArea));
      
      setFilteredProjects(newFilteredProjects);
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedFilter]);

  const handleFilterChange = (filter: ExpertiseArea | 'All') => {
    setSelectedFilter(filter);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear selected project after modal close animation completes
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my work across different domains, from software development to AI and cloud solutions.
          </p>
        </div>

        {/* Expertise Filter Component */}
        <ExpertiseFilter 
          expertiseAreas={expertiseAreas}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Projects Grid with Animation */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="transform transition-all duration-500 hover:translate-y-0"
              style={{
                animationDelay: `${parseInt(project.id) * 100}ms`
              }}
            >
              <ProjectCard
                project={project}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && !isAnimating && (
          <div className="text-center py-16 glass-frosted p-8 max-w-lg mx-auto">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No projects match the selected expertise area. Try selecting a different filter.
            </p>
            <button 
              onClick={() => setSelectedFilter('All')}
              className="mt-4 px-4 py-2 glass-button text-white hover:glass-hover rounded-full"
            >
              Show all projects
            </button>
          </div>
        )}

        {/* Featured Projects Count */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
            {selectedFilter !== 'All' && ` in ${selectedFilter}`}
          </p>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};
export
 default Projects;