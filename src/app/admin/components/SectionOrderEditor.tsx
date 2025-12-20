import { MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    type: string;
    visible?: boolean;
}

interface SectionOrderEditorProps {
    sections: any[];
    onChange: (newSections: any[]) => void;
}

export default function SectionOrderEditor({ sections, onChange }: SectionOrderEditorProps) {

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newSections = [...sections];
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        onChange(newSections);
    };

    const moveDown = (index: number) => {
        if (index === sections.length - 1) return;
        const newSections = [...sections];
        [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
        onChange(newSections);
    };

    const toggleVisibility = (index: number) => {
        const newSections = [...sections];
        const section = newSections[index];
        newSections[index] = { ...section, visible: section.visible === false ? true : false };
        onChange(newSections);
    };

    const updateTitle = (index: number, newTitle: string) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], title: newTitle };
        onChange(newSections);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Reorder Sections</h2>
            <p className="text-zinc-400 text-sm mb-6">
                Drag and drop or use the arrows to reorder how sections appear on your homepage.
                Use the eye icon to hide sections completely.
            </p>

            <div className="space-y-3">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className={`flex items-center justify-between p-4 border rounded-lg group transition-colors ${section.visible === false ? 'bg-zinc-900/50 border-zinc-800/50 opacity-60' : 'bg-zinc-900 border-zinc-800 hover:border-emerald-500/30'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-mono">
                                {index + 1}
                            </div>
                            <div>
                                <input
                                    className={`font-medium capitalize bg-transparent border-b border-transparent focus:border-emerald-500 outline-none w-32 ${section.visible === false ? 'text-zinc-500' : 'text-white'}`}
                                    value={section.title || section.id}
                                    onChange={(e) => updateTitle(index, e.target.value)}
                                />
                                <p className="text-xs text-zinc-500 uppercase tracking-wider">{section.type}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleVisibility(index)}
                                className={`p-2 rounded hover:bg-zinc-800 transition-colors ${section.visible !== false ? 'text-emerald-500 hover:text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                title={section.visible !== false ? "Hide Section" : "Show Section"}
                            >
                                {section.visible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <div className="w-px bg-zinc-800 mx-1"></div>
                            <button
                                onClick={() => moveUp(index)}
                                disabled={index === 0}
                                className="p-2 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                title="Move Up"
                            >
                                <MoveUp size={18} />
                            </button>
                            <button
                                onClick={() => moveDown(index)}
                                disabled={index === sections.length - 1}
                                className="p-2 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                title="Move Down"
                            >
                                <MoveDown size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
