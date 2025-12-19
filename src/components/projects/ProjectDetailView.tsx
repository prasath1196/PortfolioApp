'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ProjectDetailViewProps {
    project: any;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-emerald-500/30"
        >
            <div className="max-w-3xl mx-auto px-6 py-12 lg:py-24">

                {/* Back Link */}
                <motion.div variants={itemVariants}>
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Back to Console</span>
                    </Link>
                </motion.div>

                <motion.header variants={itemVariants} className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-emerald-500/50 w-12"></div>
                        <span className="text-emerald-500 font-mono text-sm uppercase tracking-wider">{project.category || 'Case Study'}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-6">
                        {project.description}
                    </p>
                </motion.header>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-y border-zinc-900 py-8">
                    <div className="space-y-2">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-1">Stack</div>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string) => (
                                <span key={tech} className="text-sm text-zinc-300 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-1">Links</div>
                        <div className="flex flex-col gap-2">
                            {project.github && (
                                <a href={project.github} target="_blank" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors">
                                    <Github size={16} /> <span>Source Code</span>
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors">
                                    <ExternalLink size={16} /> <span>Live Deployment</span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.article variants={itemVariants} className="prose prose-invert prose-emerald max-w-none space-y-12">
                    {/* Hero Description */}
                    <div className="text-zinc-300 leading-relaxed text-lg">
                        {project.longDescription || project.description}
                    </div>

                    {/* Challenge Section */}
                    {project.challenge && (
                        <div className="relative pl-8 border-l-2 border-red-500/30">
                            <h3 className="text-xl font-bold text-white mb-3">The Challenge</h3>
                            <p className="text-zinc-400">{project.challenge}</p>
                        </div>
                    )}

                    {/* Solution Section */}
                    {project.solution && (
                        <div className="relative pl-8 border-l-2 border-emerald-500/50">
                            <h3 className="text-xl font-bold text-white mb-3">The Solution</h3>
                            <p className="text-zinc-400">{project.solution}</p>
                        </div>
                    )}

                    {/* Impact Section */}
                    {project.impact && (
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-emerald-400">⚡</span> The Impact
                            </h3>
                            <p className="text-zinc-300 text-lg">{project.impact}</p>
                        </div>
                    )}

                    <div className="text-zinc-600 font-mono text-xs text-center pt-12 uppercase tracking-widest opacity-50">
                        System Log End
                    </div>
                </motion.article>

            </div>
        </motion.div>
    );
}
