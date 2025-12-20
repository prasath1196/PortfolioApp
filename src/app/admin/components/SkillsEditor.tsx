
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface SkillGroup {
    category: string;
    skills: string[];
}

export default function SkillsEditor({ skills, snapshotTitle, onChange, onSnapshotTitleChange }: { skills: SkillGroup[], snapshotTitle: string, onChange: (s: SkillGroup[]) => void, onSnapshotTitleChange: (t: string) => void }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(skills.length > 0 ? 0 : null);

    const selectedGroup = selectedIndex !== null ? skills[selectedIndex] : null;

    const updateGroup = (index: number, field: keyof SkillGroup, value: any) => {
        const updated = skills.map((g, i) => i === index ? { ...g, [field]: value } : g);
        onChange(updated);
    };

    const addGroup = () => {
        const newGroup = { category: 'New Category', skills: [] };
        onChange([...skills, newGroup]);
        setSelectedIndex(skills.length);
    };

    const removeGroup = (index: number) => {
        if (confirm('Delete this category?')) {
            const newSkills = skills.filter((_, i) => i !== index);
            onChange(newSkills);
            if (selectedIndex === index) setSelectedIndex(0);
        }
    };

    return (
        <div className="flex h-full gap-6">
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 pr-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Skill Categories</h3>
                    <button onClick={addGroup} className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded"><Plus size={16} /></button>
                </div>

                <div className="mb-6">
                    <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase tracking-wider">Sidebar Title</label>
                    <input
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:border-emerald-500 outline-none"
                        value={snapshotTitle}
                        onChange={(e) => onSnapshotTitleChange(e.target.value)}
                        placeholder="Skills Snapshot"
                    />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {skills.map((group, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`p-3 rounded-lg cursor-pointer text-sm transition-colors ${selectedIndex === idx ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'hover:bg-zinc-900 text-zinc-400'}`}
                        >
                            <div className="font-medium truncate">{group.category}</div>
                            <div className="text-xs opacity-50">{group.skills.length} skills</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                {selectedGroup && selectedIndex !== null ? (
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Category</h2>
                            <button onClick={() => removeGroup(selectedIndex)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Category Name</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedGroup.category}
                                onChange={(e) => updateGroup(selectedIndex, 'category', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Skills (Comma separated)</label>
                            <textarea
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-32 leading-relaxed"
                                value={selectedGroup.skills.join(', ')}
                                onChange={(e) => updateGroup(selectedIndex, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                placeholder="React, TypeScript, AWS..."
                            />
                            <p className="text-zinc-600 text-xs mt-2">Separate skills with commas.</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {selectedGroup.skills.map((skill, i) => (
                                <span key={i} className="text-xs font-mono bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700/50">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Select a category</div>
                )}
            </div>
        </div>
    );
}
