
import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ExperienceEditor({ experience, onChange }: { experience: any[], onChange: (e: any[]) => void }) {
    const [selectedId, setSelectedId] = useState<string | null>(experience[0]?.id || null);
    const selectedJob = experience.find(e => e.id === selectedId);

    const updateJob = (id: string, field: string, value: any) => {
        const updated = experience.map(e => e.id === id ? { ...e, [field]: value } : e);
        onChange(updated);
    };

    const addJob = () => {
        const newId = (Math.max(...experience.map((e: any) => parseInt(e.id) || 0)) + 1).toString();
        const newJob = {
            id: newId,
            title: 'New Role',
            company: 'Company',
            location: 'Remote',
            startDate: '2025-01',
            endDate: '',
            description: ['Did cool stuff.'],
            technologies: []
        };
        onChange([newJob, ...experience]); // Add to top
        setSelectedId(newId);
    };

    const removeJob = (id: string) => {
        if (confirm('Are you sure?')) {
            onChange(experience.filter(e => e.id !== id));
            if (selectedId === id) setSelectedId(experience[0]?.id || null);
        }
    };

    // Description Handling
    // Since description is string[], we can edit it as a text area separated by newlines for simplicity
    // OR we can make it granular. User asked for granular.
    // Let's do granular list editing.

    const updateDescription = (index: number, val: string) => {
        if (!selectedJob) return;
        const newDesc = [...selectedJob.description];
        // Preserve object structure if it exists, else convert to object (or keep string if we prefer mixed? better to standardize on object once edited)
        const current = newDesc[index];
        if (typeof current === 'object') {
            newDesc[index] = { ...current, text: val };
        } else {
            newDesc[index] = val; // Keep as string for now to avoid accidental schema breaks unless user explicitly toggles visibility. 
            // actually, better to just set text. But wait, if I set it to a string, I lose the ability to add props later easily without "Visible" toggle handling logic.
            // Let's keep it simple: if editing text of a string, it stays a string. If editing text of an object, it stays object.
        }
        updateJob(selectedJob.id, 'description', newDesc);
    };

    const addBullet = () => {
        if (!selectedJob) return;
        updateJob(selectedJob.id, 'description', [...selectedJob.description, 'New bullet']);
    };

    const removeBullet = (index: number) => {
        if (!selectedJob) return;
        const newDesc = selectedJob.description.filter((_: any, i: number) => i !== index);
        updateJob(selectedJob.id, 'description', newDesc);
    };


    return (
        <div className="flex h-full gap-6">
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 pr-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Experience</h3>
                    <button onClick={addJob} className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded"><Plus size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {experience.map(job => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedId(job.id)}
                            className={`p-3 rounded-lg cursor-pointer text-sm transition-colors ${selectedId === job.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'hover:bg-zinc-900 text-zinc-400'} ${job.visible === false ? 'opacity-50' : ''}`}
                        >
                            <div className="font-medium truncate">{job.company}</div>
                            <div className="text-xs opacity-50 truncate">{job.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                {selectedJob ? (
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Role</h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateJob(selectedJob.id, 'visible', !selectedJob.visible)}
                                    className={`text-xs px-2 py-1 rounded border transition-colors ${selectedJob.visible !== false ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                                >
                                    {selectedJob.visible !== false ? 'Visible' : 'Hidden'}
                                </button>
                                <button onClick={() => removeJob(selectedJob.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Company</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedJob.company}
                                    onChange={(e) => updateJob(selectedJob.id, 'company', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Title</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedJob.title}
                                    onChange={(e) => updateJob(selectedJob.id, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Start Date</label>
                                <input
                                    type="month"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedJob.startDate || ''}
                                    onChange={(e) => updateJob(selectedJob.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">End Date</label>
                                <input
                                    type="month"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    placeholder="Present"
                                    value={selectedJob.endDate || ''}
                                    onChange={(e) => updateJob(selectedJob.id, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-medium text-zinc-500">Bullets (Granular Control)</label>
                                <button onClick={addBullet} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Plus size={12} /> Add Bullet</button>
                            </div>
                            <div className="space-y-2">
                                {selectedJob.description.map((desc: any, i: number) => {
                                    const isObj = typeof desc === 'object';
                                    const text = isObj ? desc.text : desc;
                                    const visible = isObj ? desc.visible !== false : true;

                                    return (
                                        <div key={i} className={`flex gap-2 ${visible ? '' : 'opacity-50'}`}>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <textarea
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-16"
                                                    value={text}
                                                    onChange={(e) => updateDescription(i, e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center">
                                                <button
                                                    onClick={() => !isObj ? updateJob(selectedJob.id, 'description', selectedJob.description.map((d: any, idx: number) => idx === i ? { text: d, visible: false } : d)) : updateJob(selectedJob.id, 'description', selectedJob.description.map((d: any, idx: number) => idx === i ? { ...d, visible: !d.visible } : d))}
                                                    className={`p-1 rounded ${visible ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-zinc-600 hover:text-zinc-400'}`}
                                                    title={visible ? "Visible" : "Hidden"}
                                                >
                                                    {visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                                </button>
                                                <button onClick={() => removeBullet(i)} className="p-1 text-zinc-600 hover:text-red-400 rounded hover:bg-red-500/10"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Technologies</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedJob.technologies?.join(', ')}
                                onChange={(e) => updateJob(selectedJob.id, 'technologies', e.target.value.split(',').map((t: string) => t.trim()))}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Select a role</div>
                )}
            </div>
        </div>
    );
}
