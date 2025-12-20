
import Editor from '@monaco-editor/react';

export default function ProfileEditor({ data, onChange }: { data: any, onChange: (d: any) => void }) {
    const { profile, sections } = data;
    const aboutSection = sections.find((s: any) => s.id === 'about');

    const updateProfile = (field: string, value: any) => {
        onChange({
            ...data,
            profile: { ...profile, [field]: value }
        });
    };

    const updateAbout = (value: string) => {
        const updatedSections = sections.map((s: any) =>
            s.id === 'about' ? { ...s, data: { content: value } } : s
        );
        onChange({ ...data, sections: updatedSections });
    };

    return (
        <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
                <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">Identity</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Name</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.name}
                            onChange={(e) => updateProfile('name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Tagline</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.tagline}
                            onChange={(e) => updateProfile('tagline', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">Social Links</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['github', 'linkedin', 'email', 'blog', 'twitter'].map(platform => (
                        <div key={platform}>
                            <label className="block text-xs font-medium text-zinc-500 mb-1 capitalize">{platform}</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.socials?.[platform] || ''}
                                onChange={(e) => updateProfile('socials', { ...profile.socials, [platform]: e.target.value })}
                                placeholder={`https://${platform}...`}
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Resume Link</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.resumeLink || ''}
                            onChange={(e) => updateProfile('resumeLink', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">UI Text & Labels</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Swipe Hint (Mobile)</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.swipeText || ''}
                            onChange={(e) => updateProfile('swipeText', e.target.value)}
                            placeholder="Swipe to start"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Outro Title (Mobile)</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.outroTitle || ''}
                            onChange={(e) => updateProfile('outroTitle', e.target.value)}
                            placeholder="Want to know more?"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Outro Description (Mobile)</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.outroDesc || ''}
                            onChange={(e) => updateProfile('outroDesc', e.target.value)}
                            placeholder="Download my resume..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Resume Button Text</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.resumeButtonText || ''}
                            onChange={(e) => updateProfile('resumeButtonText', e.target.value)}
                            placeholder="Download Resume"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Tap Flip Text (Mobile)</label>
                        <input
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                            value={profile.tapFlipText || ''}
                            onChange={(e) => updateProfile('tapFlipText', e.target.value)}
                            placeholder="Tap anywhere to flip"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">Project Details Labels (Mobile)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Overview Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.overviewTitle || ''}
                                onChange={(e) => updateProfile('overviewTitle', e.target.value)}
                                placeholder="Overview"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Tech Stack Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.techStackTitle || ''}
                                onChange={(e) => updateProfile('techStackTitle', e.target.value)}
                                placeholder="Tech Stack"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Challenge Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.challengeTitle || ''}
                                onChange={(e) => updateProfile('challengeTitle', e.target.value)}
                                placeholder="The Challenge"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Solution Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.solutionTitle || ''}
                                onChange={(e) => updateProfile('solutionTitle', e.target.value)}
                                placeholder="The Solution"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Impact Title</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.impactTitle || ''}
                                onChange={(e) => updateProfile('impactTitle', e.target.value)}
                                placeholder="The Impact"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Visit Website Button</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.visitWebsiteBtn || ''}
                                onChange={(e) => updateProfile('visitWebsiteBtn', e.target.value)}
                                placeholder="Visit Website"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">View Code Button</label>
                            <input
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white focus:border-emerald-500 outline-none"
                                value={profile.viewSourceBtn || ''}
                                onChange={(e) => updateProfile('viewSourceBtn', e.target.value)}
                                placeholder="View Source Code"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">Project Me (Sidebar)</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-medium text-zinc-500">
                                    Bio / Mission (HTML & CSS Supported)
                                    <span className="block text-[10px] text-zinc-600 font-normal mt-0.5">
                                        Full control. Inline styles or Tailwind.
                                    </span>
                                </label>
                                <button
                                    onClick={() => {
                                        if (confirm('This will replace current content. Continue?')) {
                                            updateAbout(`<p class="text-lg text-zinc-300 font-light leading-relaxed mb-6">
  I craft <span class="text-emerald-400 font-medium">high-performance digital experiences</span> that sit at the intersection of design and engineering.
</p>

<div class="grid grid-cols-1 gap-4 my-8">
  <div class="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/60 hover:border-emerald-500/30 transition-colors">
      <h4 class="text-emerald-500 font-mono text-xs uppercase tracking-wider mb-2">Current Focus</h4>
      <p class="text-zinc-400 text-sm">Architecting scalable agentic workflows and exploring the limits of React Server Components.</p>
  </div>
  <div class="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/60 hover:border-emerald-500/30 transition-colors">
      <h4 class="text-emerald-500 font-mono text-xs uppercase tracking-wider mb-2">Core Philosophy</h4>
      <p class="text-zinc-400 text-sm">Simplicity is the ultimate sophistication. Code should be as clean as the UI it powers.</p>
  </div>
</div>

<p class="text-zinc-500 text-xs font-mono border-l-2 border-emerald-500/30 pl-4 py-1">
  "Building software is not just about writing code; it's about solving the right problems."
</p>`)
                                        }
                                    }}
                                    className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                                >
                                    ✨ Use Template
                                </button>
                            </div>
                            <div className="border border-zinc-800 rounded overflow-hidden h-[400px]">
                                <Editor
                                    height="100%"
                                    defaultLanguage="html"
                                    theme="vs-dark"
                                    value={aboutSection?.data?.content || ''}
                                    onChange={(val) => updateAbout(val || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: 'on',
                                        padding: { top: 16, bottom: 16 },
                                        lineNumbers: 'off',
                                        glyphMargin: false,
                                        folding: false,
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col h-full">
                            <label className="block text-xs font-medium text-zinc-500 mb-2">Live Preview</label>
                            <div className="border border-zinc-800 rounded bg-[#050505] p-6 overflow-y-auto h-[400px] text-sm text-zinc-400 leading-relaxed font-sans">
                                {/* Mocking the sidebar context */}
                                <div dangerouslySetInnerHTML={{ __html: aboutSection?.data?.content || '' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
