
import dbConnect from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Code2, Terminal, User, Book, Globe, Award } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

// Force dynamic rendering to ensure fresh content on every request (or use revalidate)
export const dynamic = 'force-dynamic';

async function getData() {
  await dbConnect();
  const content = await SiteContent.findOne().sort({ createdAt: -1 });
  if (!content) return null;
  // Convert Mongoose doc to plain object
  return JSON.parse(JSON.stringify(content));
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  return dateStr;
};

export default async function Home() {
  const data = await getData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
        <p className="animate-pulse">Initializing system...</p>
      </div>
    );
  }

  const { profile, sections } = data;

  const getSection = (id: string) => sections.find((s: any) => s.id?.toLowerCase() === id.toLowerCase())?.data || {};
  const getSectionTitle = (id: string) => sections.find((s: any) => s.id?.toLowerCase() === id.toLowerCase())?.title || id.toUpperCase();

  const experience = getSection('experience')?.items || [];
  const projects = getSection('projects')?.items || [];
  const skills = getSection('skills')?.items || [];
  const education = getSection('education')?.items || [];
  const about = getSection('about')?.content;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30 lg:flex lg:h-screen lg:overflow-hidden">

      {/* LEFT PANEL (FIXED) */}
      <aside className="lg:w-2/5 xl:w-1/3 p-8 lg:p-12 lg:h-full lg:flex lg:flex-col lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-zinc-900 bg-[#050505]">
        <StaggerContainer className="flex-1 flex flex-col justify-between h-full" delay={0.2}>
          <div className="flex-1">
            <StaggerItem className="mb-8">
              {/* Terminal-like header */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                {profile.name}
              </h1>
              <h2 className="text-xl text-emerald-400 font-mono mb-6">
                {profile.tagline}
              </h2>
              <div
                className="max-w-md text-zinc-400 leading-relaxed mb-8 text-sm"
                dangerouslySetInnerHTML={{ __html: about || '' }}
              />
            </StaggerItem>

            <StaggerItem>
              <a
                href={profile.resumeLink}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-emerald-900/20 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 px-6 py-3 rounded-md transition-all group font-mono text-sm w-full lg:w-auto mb-10"
              >
                <FileText size={16} />
                <span>Download Resume</span>
                <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </StaggerItem>

            <StaggerItem>
              <nav className="hidden lg:block space-y-2 mb-12">
                {sections?.filter((s: any) => {
                  const id = s.id?.toLowerCase();
                  const title = s.title?.toLowerCase();
                  return id !== 'statistics' && id !== 'stats' && title !== 'about me' && s.visible !== false;
                }).map((section: any) => (
                  <a key={section.id} href={`#${section.id}`} className="group flex items-center py-2 text-sm font-medium hover:text-white transition-colors">
                    <span className="w-8 h-[1px] bg-zinc-700 mr-4 group-hover:w-16 group-hover:bg-emerald-500 transition-all"></span>
                    <span className="uppercase tracking-widest text-xs">{section.title}</span>
                  </a>
                ))}
              </nav>
            </StaggerItem>
          </div>

          <StaggerItem className="mt-8 lg:mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
              {profile?.socials?.github && (
                <a href={profile.socials.github} target="_blank" className="flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors text-xs font-medium text-zinc-400 hover:text-white">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              )}
              {profile?.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" className="flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors text-xs font-medium text-zinc-400 hover:text-white">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile?.socials?.blog && (
                <a href={profile.socials.blog} target="_blank" className="flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors text-xs font-medium text-zinc-400 hover:text-white" title="Read my Blog">
                  <Book size={16} />
                  <span>Blog</span>
                </a>
              )}
              {profile?.socials?.email && (
                <a href={`mailto:${profile.socials.email}`} className="flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors text-xs font-medium text-zinc-400 hover:text-white">
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              )}
              {profile?.resumeLink && (
                <a href={profile.resumeLink} target="_blank" className="flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors text-xs font-medium text-zinc-400 hover:text-white" title="View Resume">
                  <FileText size={16} />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </aside>

      {/* RIGHT PANEL (SCROLLABLE) */}
      < main className="lg:w-3/5 xl:w-2/3 lg:h-full lg:overflow-y-auto scroll-smooth" >
        <div className="p-8 lg:p-20 space-y-24 max-w-4xl mx-auto">

          {sections?.filter((s: any) => !['statistics', 'stats'].includes(s.id?.toLowerCase()) && s.title?.toLowerCase() !== 'about me' && s.visible !== false).map((section: any) => {
            const items = section.data?.items || [];
            const title = section.title || section.id.toUpperCase();
            const id = section.id?.toLowerCase();

            // SKILLS
            if (id === 'skills') {
              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="skills" className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {items.map((skillGroup: any, idx: number) => (
                        <div key={idx}>
                          <h4 className="text-zinc-200 font-medium mb-2 text-sm">{skillGroup.category}</h4>
                          <p className="text-zinc-400 text-sm leading-relaxed">
                            {skillGroup.skills.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            // PROJECTS (Bento Split)
            if (id === 'projects') {
              const caseStudies = items.filter((p: any) => p.visible !== false && p.category === 'work');
              const nowBuilding = items.filter((p: any) => p.visible !== false && p.category !== 'work');

              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="projects" className="space-y-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>

                    {/* Case Studies (Bento Grid) */}
                    {caseStudies.length > 0 && (
                      <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500/80">Case Studies</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {caseStudies.map((proj: any, idx: number) => (
                            <div key={proj.id} className={`group relative flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all hover:bg-zinc-900/60 ${idx === 0 && caseStudies.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
                              <Link href={`/projects/${proj.id}`} className="absolute inset-0 z-0" />
                              {proj.imageUrl && (
                                <div className={`w-full overflow-hidden border-b border-zinc-800/50 relative ${idx === 0 && caseStudies.length % 2 !== 0 ? 'h-64 md:h-80' : 'h-48'}`}>
                                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
                                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                </div>
                              )}
                              <div className="p-5 flex-1 flex flex-col pointer-events-none">
                                <div className="flex justify-between items-start mb-3 relative z-10">
                                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{proj.title}</h4>
                                  <div className="flex items-center gap-2 pointer-events-auto">
                                    {proj.github && (
                                      <a href={proj.github} target="_blank" className="p-1 text-zinc-500 hover:text-white transition-colors hover:bg-zinc-800 rounded" title="View Source">
                                        <Github size={16} />
                                      </a>
                                    )}
                                    {proj.link && (
                                      <a href={proj.link} target="_blank" className="p-1 text-zinc-500 hover:text-white transition-colors hover:bg-zinc-800 rounded" title="Visit Site">
                                        <Globe size={16} />
                                      </a>
                                    )}
                                    <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-emerald-500 transition-colors ml-1" />
                                  </div>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{proj.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                  {proj.technologies?.slice(0, 4).map((tech: string) => (
                                    <span key={tech} className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700/50">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Now Building (Compact Grid) */}
                    {nowBuilding.length > 0 && (
                      <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500/80">Now Building</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {nowBuilding.map((proj: any) => (
                            <Link key={proj.id} href={proj.link || `/projects/${proj.id}`} target={proj.link ? "_blank" : "_self"} className="group block bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 hover:border-emerald-500/30 transition-all hover:bg-zinc-900/50">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-zinc-200 text-sm group-hover:text-emerald-400 transition-colors truncate">{proj.title}</h4>
                                <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100" />
                              </div>
                              <p className="text-zinc-500 text-[11px] leading-relaxed mb-3 line-clamp-2">{proj.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.technologies?.slice(0, 2).map((tech: string) => (
                                  <span key={tech} className="text-[9px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                </FadeIn>
              );
            }

            // EXPERIENCE
            if (id === 'experience') {
              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="experience" className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="space-y-8">
                      {items.filter((job: any) => job.visible !== false).map((job: any) => (
                        <div key={job.id} className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 transition-all hover:bg-zinc-900/30 p-3 -mx-3 rounded-lg">
                          <div className="md:col-span-1 text-xs font-mono text-zinc-500 mt-0.5 uppercase">
                            {formatDate(job.startDate)}{job.startDate ? ' — ' : ''}{job.endDate ? formatDate(job.endDate) : 'Present'}
                          </div>
                          <div className="md:col-span-3 space-y-1.5">
                            <h4 className="text-zinc-200 font-medium group-hover:text-emerald-400 transition-colors text-sm">
                              {job.title} · <span className="text-zinc-400">{job.company}</span>
                            </h4>
                            <ul className="space-y-1">
                              {job.description?.map((bullet: any, i: number) => {
                                const text = typeof bullet === 'string' ? bullet : bullet.text;
                                const isVisible = typeof bullet === 'string' || bullet.visible !== false;
                                if (!isVisible) return null;
                                return (
                                  <li key={i} className="text-xs leading-relaxed text-zinc-400 pl-2 border-l border-zinc-800">{text}</li>
                                );
                              })}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {job.technologies?.slice(0, 5).map((tech: string) => (
                                <span key={tech} className="text-[10px] font-mono bg-emerald-500/5 text-emerald-400/80 px-1.5 py-0.5 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            // EDUCATION
            if (id === 'education') {
              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="education" className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="space-y-6">
                      {items?.filter((edu: any) => edu.visible !== false).map((edu: any) => (
                        <div key={edu.id} className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 p-3 -mx-3 rounded-lg hover:bg-zinc-900/30 transition-all">
                          <div className="md:col-span-1 text-xs font-mono text-zinc-500 mt-0.5 uppercase">
                            {formatDate(edu.startDate)}{edu.startDate ? ' — ' : ''}{edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </div>
                          <div className="md:col-span-3">
                            <h4 className="text-zinc-200 font-medium group-hover:text-emerald-400 transition-colors text-sm mb-1">
                              {edu.institution}
                            </h4>
                            <div className="text-xs text-zinc-400 mb-2">{edu.degree}</div>
                            <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                              {edu.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            // NOW LEARNING
            if (id === 'learning') {
              const learningItems = items.filter((item: any) => item.visible !== false && item.progress < 100);
              if (learningItems.length === 0) return null;

              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="learning" className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {learningItems.map((item: any) => (
                        item.link ? (
                          <Link
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            className="block bg-zinc-900/30 border border-zinc-800/60 p-5 rounded-lg flex flex-col gap-4 transition-all text-left h-full hover:border-emerald-500/30 hover:bg-zinc-900/50 cursor-pointer group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                                  <ArrowUpRight size={12} className="text-zinc-600 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                                <div className="text-xs text-zinc-500 mt-0.5">{item.platform}</div>
                              </div>
                              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{item.progress}%</div>
                            </div>

                            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                            </div>

                            {item.description && (
                              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                                {item.description}
                              </p>
                            )}

                            {item.skills && item.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/50 mt-auto">
                                {item.skills?.map((skill: string) => (
                                  <span key={skill} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </Link>
                        ) : (
                          <div
                            key={item.id}
                            className="block bg-zinc-900/30 border border-zinc-800/60 p-5 rounded-lg flex flex-col gap-4 transition-all text-left h-full cursor-default"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-bold text-zinc-200">{item.title}</h4>
                                <div className="text-xs text-zinc-500 mt-0.5">{item.platform}</div>
                              </div>
                              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{item.progress}%</div>
                            </div>

                            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                            </div>

                            {item.description && (
                              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                                {item.description}
                              </p>
                            )}

                            {item.skills && item.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/50 mt-auto">
                                {item.skills?.map((skill: string) => (
                                  <span key={skill} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            // CERTIFICATIONS
            if (id === 'certifications') {
              const certs = items.filter((c: any) => c.visible !== false);
              if (certs.length === 0) return null;

              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="certifications" className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certs.map((cert: any) => (
                        <div key={cert.id} className="group flex items-center gap-4 bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-lg hover:border-emerald-500/30 transition-all hover:bg-zinc-900/50">
                          {/* Badge */}
                          <div className="w-12 h-12 flex-shrink-0 bg-black/50 rounded-md border border-zinc-800 flex items-center justify-center p-2 group-hover:border-emerald-500/30 transition-colors">
                            {cert.badgeUrl ? (
                              <img src={cert.badgeUrl} alt={cert.title} className="w-full h-full object-contain" />
                            ) : (
                              <Award className="text-zinc-600 group-hover:text-emerald-500 transition-colors" size={20} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">{cert.title}</h4>
                            <div className="text-xs text-zinc-500 mt-0.5">{cert.issuer}</div>
                          </div>

                          {/* Action */}
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              className="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors"
                              title="View Certificate"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            // RECOMMENDATIONS
            if (id === 'recommendations') {
              const recs = items.filter((r: any) => r.visible !== false);
              if (recs.length === 0) return null;

              return (
                <FadeIn key={section.id} fullWidth>
                  <section id="recommendations" className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-4 z-10 lg:hidden">{title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recs.map((rec: any) => (
                        <div key={rec.id} className="bg-zinc-900/30 border border-zinc-800/60 p-6 rounded-lg hover:border-emerald-500/30 transition-all hover:bg-zinc-900/50 flex flex-col gap-4">
                          <div className="text-emerald-500/50">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                            </svg>
                          </div>
                          <p className="text-zinc-400 text-sm italic leading-relaxed">"{rec.quote}"</p>

                          <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50 mt-auto">
                            {rec.image ? (
                              <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-full object-cover bg-zinc-800" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xs border border-zinc-700">
                                {rec.name?.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-zinc-200 truncate">{rec.name}</h4>
                                {rec.linkedin && (
                                  <a href={rec.linkedin} target="_blank" className="text-zinc-600 hover:text-[#0077b5] transition-colors">
                                    <Linkedin size={12} />
                                  </a>
                                )}
                              </div>
                              <div className="text-xs text-zinc-500 truncate">{rec.role}, {rec.company}</div>
                              <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{formatDate(rec.date)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              );
            }

            return null;
          })}

          <FadeIn delay={0.5}>
            <footer className="pt-24 pb-8 text-sm text-zinc-600 font-mono">
              <p>
                Built with Next.js, MongoDB & Tailwind. <br />
                Deployed on Vercel.
              </p>
            </footer>
          </FadeIn>

        </div>
      </main >
    </div >
  );
}

