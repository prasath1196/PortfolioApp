
import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface LearningItem {
    id: string;
    title: string;
    platform: string;
    description: string;
    skills: string[];
    progress: number;
    link?: string;
    visible?: boolean;
}

export default function NowLearningEditor({ items, onChange }: { items: LearningItem[], onChange: (items: LearningItem[]) => void }) {
    const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id || null);

    const selectedItem = items.find(i => i.id === selectedId);

    const updateItem = (id: string, field: string, value: any) => {
        const updated = items.map(i => i.id === id ? { ...i, [field]: value } : i);
        onChange(updated);
    };

    const addItem = () => {
        const newId = (Math.max(...items.map((i: any) => parseInt(i.id) || 0), 0) + 1).toString();
        const newItem: LearningItem = {
            id: newId,
            title: 'New Course',
            platform: 'Udemy / Coursera',
            description: 'What I am learning...',
            skills: ['Skill 1'],
            progress: 0,
            link: '',
            visible: true
        };
        onChange([...items, newItem]);
        setSelectedId(newId);
    };

    const removeItem = (id: string) => {
        if (confirm('Are you sure?')) {
            onChange(items.filter(i => i.id !== id));
            if (selectedId === id) setSelectedId(items[0]?.id || null);
        }
    };

    return (
        <div className="flex h-full gap-6">
            {/* Sidebar List */}
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-zinc-800 pr-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Now Learning</h3>
                    <button onClick={addItem} className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded"><Plus size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {items.map(i => (
                        <div
                            key={i.id}
                            onClick={() => setSelectedId(i.id)}
                            className={`p-3 rounded-lg cursor-pointer text-sm transition-colors ${selectedId === i.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'hover:bg-zinc-900 text-zinc-400'} ${i.visible === false ? 'opacity-50' : ''}`}
                        >
                            <div className="font-medium truncate">{i.title}</div>
                            <div className="text-xs opacity-50 truncate">{i.progress}% - {i.platform}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Form */}
            <div className="flex-1 overflow-y-auto pr-2">
                {selectedItem ? (
                    <div className="space-y-6 max-w-xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Learning Item</h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateItem(selectedItem.id, 'visible', !selectedItem.visible)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 font-medium ${selectedItem.visible !== false ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-zinc-300'}`}
                                >
                                    {selectedItem.visible !== false ? <><Eye size={14} /> Visible</> : <><EyeOff size={14} /> Hidden</>}
                                </button>
                                <button onClick={() => removeItem(selectedItem.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Course / Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.title}
                                onChange={(e) => updateItem(selectedItem.id, 'title', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Platform / Source</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.platform}
                                onChange={(e) => updateItem(selectedItem.id, 'platform', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Course Link (Optional)</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                placeholder="https://..."
                                value={selectedItem.link || ''}
                                onChange={(e) => updateItem(selectedItem.id, 'link', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Progress ({selectedItem.progress}%)</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full accent-emerald-500 cursor-pointer"
                                value={selectedItem.progress}
                                onChange={(e) => updateItem(selectedItem.id, 'progress', parseInt(e.target.value))}
                            />
                            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                                <span>0% (Just Started)</span>
                                <span>50% (Halfway)</span>
                                <span>100% (Done - Will Hide)</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Skills Gained (Comma separated)</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.skills.join(', ')}
                                onChange={(e) => updateItem(selectedItem.id, 'skills', e.target.value.split(',').map(s => s.trim()))}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Description</label>
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
