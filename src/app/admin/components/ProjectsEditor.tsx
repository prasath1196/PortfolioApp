
import { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';

export default function ProjectsEditor({ projects, categories, sectionTitle, sectionSubtitle, onChange, onCategoriesChange, onSectionTitleChange, onSectionSubtitleChange }: { projects: any[], categories: string[], sectionTitle: string, sectionSubtitle: string, onChange: (p: any[]) => void, onCategoriesChange: (c: string[]) => void, onSectionTitleChange: (t: string) => void, onSectionSubtitleChange: (t: string) => void }) {
    const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id || null);

    const selectedProject = projects.find(p => p.id === selectedId);

    const updateProject = (id: string, field: string, value: any) => {
        const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
        onChange(updated);
    };

    const addProject = () => {
        const newId = (Math.max(...projects.map((p: any) => parseInt(p.id) || 0)) + 1).toString();
        const newProject = {
            id: newId,
            title: 'New Project',
            description: 'Short description...',
            technologies: [],
            category: 'personal',
            featured: false
        };
        onChange([...projects, newProject]);
        setSelectedId(newId);
    };

    const removeProject = (id: string) => {
        if (confirm('Are you sure?')) {
            onChange(projects.filter(p => p.id !== id));
            if (selectedId === id) setSelectedId(projects[0]?.id || null);
        }
    };

    const moveUp = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (index === 0) return;
        const newProjects = [...projects];
        [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
        onChange(newProjects);
    };

    const moveDown = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (index === projects.length - 1) return;
        const newProjects = [...projects];
        [newProjects[index + 1], newProjects[index]] = [newProjects[index], newProjects[index + 1]];
        onChange(newProjects);
    };

    return (
        <div className="flex h-full gap-6">
            {/* Sidebar List */}
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 pr-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Projects</h3>
                    <button onClick={addProject} className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded"><Plus size={16} /></button>
                </div>

                <div className="mb-6 pb-6 border-b border-zinc-800">
                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Main Heading</label>
                    <input
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:border-emerald-500 outline-none mb-4"
                        value={sectionTitle}
                        onChange={(e) => onSectionTitleChange(e.target.value)}
                        placeholder="AI & Engineering"
                    />

                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Subheading</label>
                    <textarea
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:border-emerald-500 outline-none h-16"
                        value={sectionSubtitle}
                        onChange={(e) => onSectionSubtitleChange(e.target.value)}
                        placeholder="A collection of..."
                    />
                </div>

                {/* Category Management - Simple Inline for now */}
                <div className="mb-6 pb-6 border-b border-zinc-800">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {categories.map(cat => (
                            <span key={cat} className="group inline-flex items-center gap-1 text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-400">
                                {cat}
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete category "${cat}"? Projects will keep the tag but it won't be selectable.`)) {
                                            onCategoriesChange(categories.filter(c => c !== cat));
                                        }
                                    }}
                                    className="hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={10} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            id="new-category"
                            placeholder="New Cat..."
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-emerald-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = e.currentTarget.value.trim();
                                    if (val && !categories.includes(val)) {
                                        onCategoriesChange([...categories, val]);
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                const input = document.getElementById('new-category') as HTMLInputElement;
                                const val = input.value.trim();
                                if (val && !categories.includes(val)) {
                                    onCategoriesChange([...categories, val]);
                                    input.value = '';
                                }
                            }}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 p-1 rounded"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    {projects.map((p, index) => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedId(p.id)}
                            className={`group relative p-3 rounded-lg cursor-pointer text-sm transition-colors ${selectedId === p.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'hover:bg-zinc-900 text-zinc-400'} ${p.visible === false ? 'opacity-50' : ''}`}
                        >
                            <div className="font-medium truncate pr-14">{p.title}</div>
                            <div className="text-xs opacity-50 capitalize">{p.category}</div>

                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 backdrop-blur rounded p-1 shadow-sm border border-zinc-800">
                                <button
                                    onClick={(e) => moveUp(index, e)}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <MoveUp size={12} />
                                </button>
                                <button
                                    onClick={(e) => moveDown(index, e)}
                                    disabled={index === projects.length - 1}
                                    className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <MoveDown size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Form */}
            <div className="flex-1 overflow-y-auto pr-2">
                {selectedProject ? (
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Project</h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateProject(selectedProject.id, 'visible', !selectedProject.visible)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 font-medium ${selectedProject.visible !== false ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-zinc-300'}`}
                                >
                                    {selectedProject.visible !== false ? (
                                        <>
                                            <Eye size={14} /> Visible
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={14} /> Hidden
                                        </>
                                    )}
                                </button>
                                <button onClick={() => removeProject(selectedProject.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Title</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedProject.title}
                                    onChange={(e) => updateProject(selectedProject.id, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Category</label>
                                <select
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedProject.category}
                                    onChange={(e) => updateProject(selectedProject.id, 'category', e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Live URL (Optional)</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none placeholder:text-zinc-700"
                                    placeholder="https://..."
                                    value={selectedProject.link || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'link', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">GitHub URL (Optional)</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none placeholder:text-zinc-700"
                                    placeholder="https://github.com/..."
                                    value={selectedProject.github || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'github', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Cover Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none font-mono"
                                    value={selectedProject.imageUrl || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'imageUrl', e.target.value)}
                                    placeholder="/projects/cover.png"
                                />
                                {selectedProject.imageUrl && (
                                    <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                                        <img src={selectedProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Short Description (Card)</label>
                            <textarea
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-20"
                                value={selectedProject.description}
                                onChange={(e) => updateProject(selectedProject.id, 'description', e.target.value)}
                            />
                        </div>

                        <div className="space-y-4 border-t border-zinc-800 pt-4">
                            <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Deep Dive Content</h3>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">The Challenge</label>
                                <textarea
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-24"
                                    placeholder="What was the hard problem?"
                                    value={selectedProject.challenge || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'challenge', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">The Solution</label>
                                <textarea
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-24"
                                    placeholder="How did you solve it?"
                                    value={selectedProject.solution || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'solution', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">The Impact (Metrics)</label>
                                <textarea
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-24"
                                    placeholder="Outcome?"
                                    value={selectedProject.impact || ''}
                                    onChange={(e) => updateProject(selectedProject.id, 'impact', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Technologies (Comma separated)</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedProject.technologies?.join(', ')}
                                onChange={(e) => updateProject(selectedProject.id, 'technologies', e.target.value.split(',').map((t: string) => t.trim()))}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Select a project</div>
                )}
            </div>
        </div>
    );
}
