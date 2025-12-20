
'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Save, Loader2 } from 'lucide-react';

import Login from './components/Login';
import ProjectsEditor from './components/ProjectsEditor';
import ProfileEditor from './components/ProfileEditor';
import ExperienceEditor from './components/ExperienceEditor';
import EducationEditor from './components/EducationEditor';
import SkillsEditor from './components/SkillsEditor';
import NowLearningEditor from './components/NowLearningEditor';
import CertificationsEditor from './components/CertificationsEditor';
import RecommendationsEditor from './components/RecommendationsEditor';
import SectionOrderEditor from './components/SectionOrderEditor';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'sections' | 'profile' | 'projects' | 'experience' | 'education' | 'skills' | 'learning' | 'certifications' | 'recommendations' | 'json'>('projects');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/check');
            if (res.ok) {
                const json = await res.json();
                if (json.authenticated) {
                    setIsAuthenticated(true);
                    loadContent();
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (e) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    async function loadContent() {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                const jsonData = await res.json();

                if (!jsonData.sections?.find((s: any) => s.id === 'learning')) {
                    if (!jsonData.sections) jsonData.sections = [];
                    jsonData.sections.push({
                        id: 'learning',
                        type: 'list',
                        title: 'Now Learning',
                        visible: true,
                        data: { items: [] }
                    });
                }

                if (!jsonData.sections?.find((s: any) => s.id === 'certifications')) {
                    if (!jsonData.sections) jsonData.sections = [];
                    jsonData.sections.push({
                        id: 'certifications',
                        type: 'list',
                        title: 'Certifications',
                        visible: true,
                        data: { items: [] }
                    });
                }

                if (!jsonData.sections?.find((s: any) => s.id === 'recommendations')) {
                    if (!jsonData.sections) jsonData.sections = [];
                    jsonData.sections.push({
                        id: 'recommendations',
                        type: 'list',
                        title: 'Recommendations',
                        visible: true,
                        data: { items: [] }
                    });
                }

                if (jsonData.sections) {
                    const projectsSection = jsonData.sections.find((s: any) => s.id === 'projects');
                    if (projectsSection) {
                        if (!projectsSection.data) projectsSection.data = {};
                        if (!projectsSection.data.categories) {
                            projectsSection.data.categories = ['work', 'personal', 'freelance', 'open source'];
                        }
                    }
                }

                setData(jsonData);
                setContent(JSON.stringify(jsonData, null, 2));
            }
        } catch (e) {
            console.error("Failed to load content", e);
        }
    }

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.reload();
    }

    // Helper functions
    function stripSystemFields(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(stripSystemFields);
        } else if (typeof obj === 'object' && obj !== null) {
            const newObj: any = {};
            for (const key in obj) {
                if (['_id', 'createdAt', 'updatedAt', '__v'].includes(key)) continue;
                newObj[key] = stripSystemFields(obj[key]);
            }
            return newObj;
        }
        return obj;
    }

    async function handleSave() {
        setSaving(true);
        try {
            let payload = data;
            if (activeTab === 'json') {
                try {
                    payload = JSON.parse(content);
                    setData(payload);
                } catch (e) {
                    alert("Invalid JSON");
                    setSaving(false);
                    return;
                }
            }

            const cleaned = stripSystemFields(payload);
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleaned),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save');
            }

            loadContent();
            alert('Saved Successfully!');
        } catch (e: any) {
            console.error(e);
            alert(`Error: ${e.message}`);
        } finally {
            setSaving(false);
        }
    }

    // Handlers
    const updateSectionData = (sectionId: string, newItems: any[]) => {
        const newData = {
            ...data,
            sections: data.sections.map((s: any) =>
                s.id === sectionId ? { ...s, data: { items: newItems } } : s
            )
        };
        setData(newData);
        setContent(JSON.stringify(newData, null, 2));
    };

    const updateSectionCategories = (sectionId: string, newCategories: string[]) => {
        const newData = {
            ...data,
            sections: data.sections.map((s: any) =>
                s.id === sectionId ? { ...s, data: { ...s.data, categories: newCategories } } : s
            )
        };
        setData(newData);
        setContent(JSON.stringify(newData, null, 2));
    };

    const updateSectionField = (sectionId: string, field: string, value: any) => {
        const newData = {
            ...data,
            sections: data.sections.map((s: any) =>
                s.id === sectionId ? { ...s, data: { ...s.data, [field]: value } } : s
            )
        };
        setData(newData);
        setContent(JSON.stringify(newData, null, 2));
    };

    const handleSectionsOrderChange = (newSections: any[]) => {
        const newData = { ...data, sections: newSections };
        setData(newData);
        setContent(JSON.stringify(newData, null, 2));
    };

    const handleDataChange = (newData: any) => {
        setData(newData);
        setContent(JSON.stringify(newData, null, 2));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLogin={() => { setIsAuthenticated(true); loadContent(); }} />;
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-500" />
                    <p className="text-zinc-400">Loading editor...</p>
                </div>
            </div>
        );
    }

    // Derived state
    const getItems = (id: string) => data?.sections?.find((s: any) => s.id === id)?.data?.items || [];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#050505]">
                <div className="flex items-center gap-8">
                    <h1 className="text-lg font-bold tracking-tight">Portfolio Admin</h1>
                    <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                        {['sections', 'projects', 'experience', 'education', 'learning', 'certifications', 'recommendations', 'skills', 'profile', 'json'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${activeTab === tab ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleLogout} className="text-zinc-500 hover:text-white text-xs font-medium">Sign Out</button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 p-6 overflow-y-auto">
                    {activeTab === 'sections' && <SectionOrderEditor sections={data.sections} onChange={handleSectionsOrderChange} />}
                    {activeTab === 'projects' && (
                        <ProjectsEditor
                            projects={getItems('projects')}
                            categories={data.sections.find((s: any) => s.id === 'projects')?.data?.categories || []}
                            sectionTitle={data.sections.find((s: any) => s.id === 'projects')?.data?.sectionTitle ?? 'AI & Engineering'}
                            sectionSubtitle={data.sections.find((s: any) => s.id === 'projects')?.data?.sectionSubtitle ?? "A collection of AI-native applications, full-stack systems, and experiments I've built."}
                            onChange={(items) => updateSectionData('projects', items)}
                            onCategoriesChange={(cats) => updateSectionCategories('projects', cats)}
                            onSectionTitleChange={(t) => updateSectionField('projects', 'sectionTitle', t)}
                            onSectionSubtitleChange={(t) => updateSectionField('projects', 'sectionSubtitle', t)}
                        />
                    )}
                    {activeTab === 'profile' && <ProfileEditor data={data} onChange={handleDataChange} />}
                    {activeTab === 'experience' && <ExperienceEditor experience={getItems('experience')} onChange={(items) => updateSectionData('experience', items)} />}
                    {activeTab === 'skills' && (
                        <SkillsEditor
                            skills={getItems('skills')}
                            snapshotTitle={data.sections.find((s: any) => s.id === 'skills')?.data?.snapshotTitle ?? 'Skills Snapshot'}
                            onChange={(items) => updateSectionData('skills', items)}
                            onSnapshotTitleChange={(t) => updateSectionField('skills', 'snapshotTitle', t)}
                        />
                    )}
                    {activeTab === 'learning' && <NowLearningEditor items={getItems('learning')} onChange={(items) => updateSectionData('learning', items)} />}
                    {activeTab === 'certifications' && (
                        <CertificationsEditor
                            items={getItems('certifications')}
                            snapshotTitle={data.sections.find((s: any) => s.id === 'certifications')?.data?.snapshotTitle ?? 'Latest Certs'}
                            onChange={(items) => updateSectionData('certifications', items)}
                            onSnapshotTitleChange={(t) => updateSectionField('certifications', 'snapshotTitle', t)}
                        />
                    )}
                    {activeTab === 'recommendations' && <RecommendationsEditor items={getItems('recommendations')} onChange={(items) => updateSectionData('recommendations', items)} />}
                    {activeTab === 'education' && <EducationEditor education={getItems('education')} onChange={(items) => updateSectionData('education', items)} />}

                    {activeTab === 'json' && (
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={content}
                            onChange={(val) => setContent(val || '')}
                            options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on', padding: { top: 20 } }}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
