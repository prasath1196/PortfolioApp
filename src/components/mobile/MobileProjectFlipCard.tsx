'use client';

import { useState } from 'react';
import { Github, Globe, ArrowUpRight, ChevronRight, ChevronLeft, Info, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectFlipCardProps {
    project: any;
    labels?: {
        tapFlip?: string;
        overview?: string;
        techStack?: string;
        challenge?: string;
        solution?: string;
        impact?: string;
        visitWebsite?: string;
        viewSource?: string;
    };
}

// Full screen update and click-to-flip refinement
export default function MobileProjectFlipCard({ project, labels }: ProjectFlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="w-full h-full perspective-1000" style={{ perspective: '1000px' }}>
            <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={handleFlip}
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* FRONT SIDE */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-zinc-900 border-none shadow-none flex flex-col"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
                >
                    {/* Image Area */}
                    <div className="h-2/3 w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                        {project.imageUrl ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-zinc-900 dark:via-transparent dark:to-transparent z-10 opacity-90" />
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600">
                                <Code2 size={48} />
                            </div>
                        )}

                        {/* Title Overlay on Image */}
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full mb-4">
                            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight drop-shadow-md">{project.title}</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="text-xs font-mono bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-2.5 py-1 rounded backdrop-blur-sm border border-emerald-500/30">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Content Area - fills the rest */}
                    <div className="h-1/3 p-8 flex flex-col justify-between bg-white dark:bg-zinc-900">
                        <div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed line-clamp-3">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/50 mt-auto">
                            <span className="text-sm font-mono text-zinc-500 flex items-center gap-2 animate-pulse">
                                <Info size={14} />
                                {labels?.tapFlip || 'Tap anywhere to flip'}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/50">
                                <ChevronRight size={20} className="text-zinc-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-zinc-900 flex flex-col"
                    onClick={(e) => {
                        // Allow parent click to handle flip back unless stopped
                    }}
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                >
                    <div className="flex-none p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 sticky top-0 z-10 transition-colors">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white truncate pr-4">{project.title}</h3>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                        >
                            <X size={20} className="text-zinc-500 dark:text-zinc-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 scroll-smooth pb-32">
                        {/* Hero / About */}
                        <div className="mb-10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-4 opacity-80">{labels?.overview || 'Overview'}</h4>
                            <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
                                {project.longDescription || project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {project.technologies && (
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-4 opacity-80">{labels?.techStack || 'Tech Stack'}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech: string) => (
                                        <span key={tech} className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-700/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Challenge */}
                        {project.challenge && (
                            <div className="mb-10 relative pl-6 border-l-2 border-red-500/30">
                                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">{labels?.challenge || 'The Challenge'}</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">{project.challenge}</p>
                            </div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <div className="mb-10 relative pl-6 border-l-2 border-emerald-500/50">
                                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">{labels?.solution || 'The Solution'}</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">{project.solution}</p>
                            </div>
                        )}

                        {/* Impact */}
                        {project.impact && (
                            <div className="mb-10 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="text-emerald-500 dark:text-emerald-400">⚡</span> {labels?.impact || 'The Impact'}
                                </h4>
                                <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">{project.impact}</p>
                                <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">{project.impact}</p>
                            </div>
                        )}

                        <div className="mt-12 flex flex-col gap-4">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20"
                                >
                                    <Globe size={20} />
                                    {labels?.visitWebsite || 'Visit Website'}
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white py-4 rounded-xl font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
                                >
                                    <Github size={20} />
                                    {labels?.viewSource || 'View Source Code'}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
