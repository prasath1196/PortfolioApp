'use client';

import { ArrowUpRight, Github, Linkedin, Mail, FileText, ChevronRight, Download, Award } from 'lucide-react';
import MobileProjectFlipCard from './MobileProjectFlipCard';
import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from '../ThemeToggle';

export default function MobileLayout({ data }: { data: any }) {
    if (!data) return null;

    const { profile, sections } = data;
    const getSection = (id: string) => sections.find((s: any) => s.id?.toLowerCase() === id.toLowerCase())?.data || {};

    const projects = getSection('projects')?.items || [];
    const skills = getSection('skills')?.items || [];
    const certs = getSection('certifications')?.items || [];

    const featuredProjects = projects.filter((p: any) => p.visible !== false); // Removed 'work' filter
    const about = getSection('about')?.content;

    const skillsTitle = sections.find((s: any) => s.id === 'skills')?.title || 'Skills';
    const certsTitle = sections.find((s: any) => s.id === 'certifications')?.title || 'Certifications';

    // Story Progress Logic
    const [activeSlide, setActiveSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const totalSlides = 3 + featuredProjects.length; // Intro + Skills + Projects + Outro

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollLeft = containerRef.current.scrollLeft;
            const width = containerRef.current.clientWidth;
            const index = Math.round(scrollLeft / width);
            setActiveSlide(index);
        }
    };

    return (
        <div className="block lg:hidden relative h-[100dvh] w-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">

            {/* Story Progress Bar */}
            <div className="absolute top-4 left-0 w-full z-50 flex flex-col gap-2 px-4 safe-area-top pointer-events-none">
                <div className="flex gap-1 w-full bg-black/20 dark:bg-black/40 p-1 rounded-full backdrop-blur-sm">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= activeSlide ? 'bg-zinc-900 dark:bg-white shadow-sm' : 'bg-zinc-300/50 dark:bg-zinc-700/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Theme Toggle - Fixed top right */}
            <div className="absolute top-12 right-4 z-50">
                <ThemeToggle />
            </div>

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex flex-nowrap scroll-smooth no-scrollbar touch-pan-x"
            >
                {/* SLIDE 1: INTRO (Profile + Skills) */}
                <section className="h-full min-w-[100vw] snap-center overflow-y-auto relative bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-[#050505]">
                    <div className="min-h-full flex flex-col items-center justify-center p-6 py-24">
                        <div className="text-center space-y-6 max-w-sm w-full">
                            <div>
                                <h1 className="text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 leading-tight">
                                    {profile.name}
                                </h1>
                                <h2 className="text-xl text-emerald-600 dark:text-emerald-400 font-mono">
                                    {profile.tagline}
                                </h2>
                            </div>

                            <div className="bg-white/50 dark:bg-zinc-900/40 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
                                <div
                                    className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 font-sans"
                                    dangerouslySetInnerHTML={{ __html: about || '' }}
                                />
                            </div>

                            {/* Skills Ticker or Grid - simplified for mobile intro */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {skills.slice(0, 5).flatMap((g: any) => g.skills).slice(0, 10).map((skill: string) => (
                                    <span key={skill} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 animate-pulse opacity-50 mt-12 pb-8">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{profile.swipeText || 'Swipe to start'}</span>
                            <div className="flex gap-1">
                                <ChevronRight size={20} className="text-zinc-500" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SLIDE 2: CERTIFICATIONS & SKILLS (More Details) */}
                <section className="h-full min-w-[100vw] snap-center flex flex-col p-6 pt-24 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 border-l-4 border-emerald-500 pl-4 bg-zinc-50 dark:bg-zinc-950 py-2 block">
                        {skillsTitle} & {certsTitle}
                    </h3>

                    <div className="space-y-8 pb-24">
                        {/* Skills */}
                        <div className="space-y-4">
                            {skills.map((group: any, idx: number) => (
                                <div key={idx}>
                                    <h4 className="text-emerald-600 dark:text-emerald-400 text-sm font-mono mb-2">{group.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill: string) => (
                                            <span key={skill} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 shadow-sm dark:shadow-none">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certs */}
                        {/* Certs */}
                        {certs.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-900">
                                <h4 className="text-zinc-900 dark:text-white font-bold text-lg">{certsTitle}</h4>
                                <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar snap-x">
                                    {certs.map((cert: any) => (
                                        <div key={cert.id} className="snap-center flex-shrink-0 w-64 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex flex-col gap-2 shadow-sm dark:shadow-none">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 bg-zinc-100 dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                                                    {cert.badgeUrl ? <img src={cert.badgeUrl} className="w-6 h-6 object-contain" /> : <Award size={16} className="text-zinc-500" />}
                                                </div>
                                                {cert.link && <a href={cert.link} target="_blank"><ArrowUpRight size={14} className="text-zinc-600" /></a>}
                                            </div>
                                            <div className="font-bold text-zinc-800 dark:text-zinc-200 text-sm truncate">{cert.title}</div>
                                            <div className="text-xs text-zinc-500">{cert.issuer}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* PROJECT SLIDES */}
                {featuredProjects.map((project: any, index: number) => (
                    <section key={project.id} className="h-full min-w-[100vw] snap-center flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden">
                        {/* Background subtle number */}
                        <div className="absolute top-8 right-8 text-[120px] font-bold text-zinc-200 dark:text-zinc-900/50 z-0 pointer-events-none select-none">
                            {index + 1}
                        </div>

                        <div className="relative z-10 w-full h-full">
                            <MobileProjectFlipCard
                                project={project}
                                labels={{
                                    tapFlip: profile.tapFlipText,
                                    overview: profile.overviewTitle,
                                    techStack: profile.techStackTitle,
                                    challenge: profile.challengeTitle,
                                    solution: profile.solutionTitle,
                                    impact: profile.impactTitle,
                                    visitWebsite: profile.visitWebsiteBtn,
                                    viewSource: profile.viewSourceBtn
                                }}
                            />
                        </div>
                    </section>
                ))}

                {/* LAST SLIDE: OUTRO */}
                <section className="h-full min-w-[100vw] snap-center overflow-y-auto bg-gradient-to-l from-emerald-100/50 to-zinc-50 dark:from-emerald-950/20 dark:to-zinc-950">
                    <div className="min-h-full flex flex-col items-center justify-center p-6 py-24 text-center">
                        <div className="space-y-8 max-w-xs w-full">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-emerald-500/50">
                                <FileText size={40} className="text-emerald-500 dark:text-emerald-400" />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{profile.outroTitle || 'Want to know more?'}</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{profile.outroDesc || 'Download my resume to see the full picture.'}</p>
                            </div>

                            <a
                                href={profile.resumeLink}
                                target="_blank"
                                className="flex items-center justify-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                <Download size={20} />
                                <span>{profile.resumeButtonText || 'Download Resume'}</span>
                            </a>

                            <div className="flex justify-center gap-6 pt-8">
                                {profile.socials?.github && (
                                    <a href={profile.socials.github} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        <Github size={24} />
                                    </a>
                                )}
                                {profile.socials?.linkedin && (
                                    <a href={profile.socials.linkedin} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        <Linkedin size={24} />
                                    </a>
                                )}
                                {profile.socials?.email && (
                                    <a href={`mailto:${profile.socials.email}`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </a>
                                )}
                            </div>

                            <p className="text-[10px] text-zinc-500 pt-12">
                                © {new Date().getFullYear()} {profile.name}
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
