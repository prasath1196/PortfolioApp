import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function EducationEditor({ education, onChange }: { education: any[], onChange: (e: any[]) => void }) {
    const [selectedId, setSelectedId] = useState<string | null>(education[0]?.id || null);

    const selectedItem = education.find(e => e.id === selectedId);

    const updateItem = (id: string, field: string, value: any) => {
        const updated = education.map(e => e.id === id ? { ...e, [field]: value } : e);
        onChange(updated);
    };

    const addItem = () => {
        const newId = (Math.max(...education.map((e: any) => parseInt(e.id) || 0)) + 1).toString();
        const newItem = {
            id: newId,
            institution: 'University Name',
            degree: 'Degree Name',
            startDate: '2020',
            endDate: '2024',
            description: 'Major, GPA, etc.',
            visible: true
        };
        onChange([...education, newItem]);
        setSelectedId(newId);
    };

    const removeItem = (id: string) => {
        if (confirm('Are you sure?')) {
            onChange(education.filter(e => e.id !== id));
            if (selectedId === id) setSelectedId(education[0]?.id || null);
        }
    };

    return (
        <div className="flex h-full gap-6">
            {/* Sidebar List */}
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 pr-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Education</h3>
                    <button onClick={addItem} className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded"><Plus size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {education.map(e => (
                        <div
                            key={e.id}
                            onClick={() => setSelectedId(e.id)}
                            className={`p-3 rounded-lg cursor-pointer text-sm transition-colors ${selectedId === e.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'hover:bg-zinc-900 text-zinc-400'} ${e.visible === false ? 'opacity-50' : ''}`}
                        >
                            <div className="font-medium truncate">{e.institution}</div>
                            <div className="text-xs opacity-50 truncate">{e.degree}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Form */}
            <div className="flex-1 overflow-y-auto pr-2">
                {selectedItem ? (
                    <div className="space-y-6 max-w-xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Education</h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateItem(selectedItem.id, 'visible', !selectedItem.visible)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 font-medium ${selectedItem.visible !== false ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-zinc-300'}`}
                                >
                                    {selectedItem.visible !== false ? (
                                        <>
                                            <Eye size={14} /> Visible
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={14} /> Hidden
                                        </>
                                    )}
                                </button>
                                <button onClick={() => removeItem(selectedItem.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Institution</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.institution}
                                onChange={(e) => updateItem(selectedItem.id, 'institution', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Degree</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.degree}
                                onChange={(e) => updateItem(selectedItem.id, 'degree', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Start Date</label>
                                <input
                                    type="month"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedItem.startDate || ''}
                                    onChange={(e) => updateItem(selectedItem.id, 'startDate', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">End Date</label>
                                <input
                                    type="month"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedItem.endDate || ''}
                                    onChange={(e) => updateItem(selectedItem.id, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Description (Markdown supported)</label>
                            <textarea
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none h-32"
                                value={selectedItem.description}
                                onChange={(e) => updateItem(selectedItem.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Select an item</div>
                )}
            </div>
        </div>
    );
}
