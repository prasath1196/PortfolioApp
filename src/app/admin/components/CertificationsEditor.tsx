
import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Award, ExternalLink } from 'lucide-react';

interface CertificationItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    badgeUrl: string;
    link: string;
    visible?: boolean;
}

export default function CertificationsEditor({ items, onChange }: { items: CertificationItem[], onChange: (items: CertificationItem[]) => void }) {
    const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id || null);

    const selectedItem = items.find(i => i.id === selectedId);

    const updateItem = (id: string, field: string, value: any) => {
        const updated = items.map(i => i.id === id ? { ...i, [field]: value } : i);
        onChange(updated);
    };

    const addItem = () => {
        const newId = (Math.max(...items.map((i: any) => parseInt(i.id) || 0), 0) + 1).toString();
        const newItem: CertificationItem = {
            id: newId,
            title: 'New Certification',
            issuer: 'AWS / Google / etc',
            date: '2024',
            badgeUrl: '',
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
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Certifications</h3>
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
                            <div className="text-xs opacity-50 truncate">{i.issuer}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Form */}
            <div className="flex-1 overflow-y-auto pr-2">
                {selectedItem ? (
                    <div className="space-y-6 max-w-xl">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-white">Edit Certification</h2>
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
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Certification Name</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={selectedItem.title}
                                onChange={(e) => updateItem(selectedItem.id, 'title', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Issuer</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedItem.issuer}
                                    onChange={(e) => updateItem(selectedItem.id, 'issuer', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Date / Year</label>
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                    value={selectedItem.date}
                                    onChange={(e) => updateItem(selectedItem.id, 'date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Badge Image URL (Optional)</label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none font-mono"
                                        placeholder="https://..."
                                        value={selectedItem.badgeUrl || ''}
                                        onChange={(e) => updateItem(selectedItem.id, 'badgeUrl', e.target.value)}
                                    />
                                </div>
                                <div className="w-12 h-12 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {selectedItem.badgeUrl ? (
                                        <img src={selectedItem.badgeUrl} alt="Badge" className="w-full h-full object-contain p-1" />
                                    ) : (
                                        <Award size={20} className="text-zinc-600" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Verification Link</label>
                            <div className="relative">
                                <input
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none pl-8"
                                    placeholder="https://"
                                    value={selectedItem.link || ''}
                                    onChange={(e) => updateItem(selectedItem.id, 'link', e.target.value)}
                                />
                                <ExternalLink size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Select a certification</div>
                )}
            </div>
        </div>
    );
}
