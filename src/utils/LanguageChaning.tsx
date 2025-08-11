import React, { useState } from "react";
import { Save, Search, Globe, FileText, Folder, } from "lucide-react";
import Navbar from "../components/HomePage/header/NavBar";

interface TranslationData {
    [key: string]: any;
}

interface FileData {
    [language: string]: TranslationData;
}

export default function ModernTranslationEditor() {
    const [filesData, setFilesData] = useState<FileData>({});
    const [activeLang, setActiveLang] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [fileHandles, setFileHandles] = useState<Record<string, FileSystemFileHandle>>({});

    // Language display names
    const languageNames: Record<string, string> = {
        en: "English",
        fr: "Français",
        sw: "Kiswahili",
        kn: "Kinyarwanda"
    };

    // Load files using the File System Access API
    const loadFiles = async () => {
        try {
            // @ts-ignore - File System Access API is experimental
            const directoryHandle = await window.showDirectoryPicker();
            const files = ['en.json', 'fr.json', 'sw.json', 'kn.json'];
            const loadedData: FileData = {};
            const handles: Record<string, FileSystemFileHandle> = {};

            for (const filename of files) {
                try {
                    // @ts-ignore
                    const fileHandle = await directoryHandle.getFileHandle(filename);
                    const file = await fileHandle.getFile();
                    const contents = await file.text();
                    const langCode = filename.replace('.json', '');
                    loadedData[langCode] = JSON.parse(contents);
                    handles[langCode] = fileHandle;
                } catch (error) {
                    console.warn(`Could not load ${filename}:`, error);
                }
            }

            setFilesData(loadedData);
            setFileHandles(handles);
            if (Object.keys(loadedData).length > 0) {
                setActiveLang(Object.keys(loadedData)[0]);
            }
        } catch (error) {
            console.error('Error loading files:', error);
            alert('Could not load files. Please try again.');
        }
    };

    // Save changes back to the original file
    const saveFile = async (lang: string) => {
        if (!fileHandles[lang] || !filesData[lang]) return;

        try {
            // @ts-ignore - File System Access API is experimental
            const writable = await fileHandles[lang].createWritable();
            await writable.write(JSON.stringify(filesData[lang], null, 2));
            await writable.close();
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Failed to save file. Please try again.');
        }
    };

    // Save all modified files
    const saveAll = async () => {
        for (const lang of Object.keys(filesData)) {
            await saveFile(lang);
        }
    };

    // Handle value changes
    const handleValueChange = (keyPath: string[], newValue: string) => {
        setFilesData(prev => {
            const updated = structuredClone(prev);
            let target = updated[activeLang];

            // Navigate to the parent object
            for (let i = 0; i < keyPath.length - 1; i++) {
                if (!target[keyPath[i]]) target[keyPath[i]] = {};
                target = target[keyPath[i]];
            }

            // Set the final value
            target[keyPath[keyPath.length - 1]] = newValue;
            return updated;
        });
        setHasUnsavedChanges(true);
    };

    // Toggle section expansion
    const toggleSection = (path: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    };

    // Filter function for search
    const matchesSearch = (path: string[], value: any): boolean => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        const pathStr = path.join(' ').toLowerCase();
        const valueStr = String(value).toLowerCase();
        return pathStr.includes(searchLower) || valueStr.includes(searchLower);
    };

    // Recursive component to render translation fields
    const renderTranslationFields = (
        data: any,
        path: string[] = [],
        level: number = 0
    ): React.ReactNode[] => {
        if (!data || typeof data !== 'object') return [];

        return Object.entries(data).reduce<React.ReactNode[]>((acc, [key, value]) => {
            const currentPath = [...path, key];
            const pathString = currentPath.join('.');
            const isExpanded = expandedSections.has(pathString);

            if (typeof value === 'object' && value !== null) {
                // Render nested object
                const hasMatchingChildren = Object.entries(value).some(([childKey, childValue]) =>
                    matchesSearch([...currentPath, childKey], childValue)
                );

                if (!searchTerm || hasMatchingChildren) {
                    acc.push(
                        <div key={pathString} className={`mb-4 ${level > 0 ? 'ml-4' : ''}`}>
                            <div
                                className="flex items-center justify-between p-3 bg-surface rounded-lg cursor-pointer hover:bg-accent-hover transition-colors"
                                onClick={() => toggleSection(pathString)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-transform duration-200 ${isExpanded ? 'rotate-90 bg-primary' : 'bg-secondary'
                                        }`} />
                                    <h3 className="font-semibold text-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                                </div>
                                <span className="text-xs text-secondary">
                                    {Object.keys(value).length} items
                                </span>
                            </div>

                            {isExpanded && (
                                <div className="mt-2 border-l-2 border-accent pl-4">
                                    {renderTranslationFields(value, currentPath, level + 1)}
                                </div>
                            )}
                        </div>
                    );
                }
            } else {
                // Render input field
                if (matchesSearch(currentPath, value)) {
                    acc.push(
                        <div key={pathString} className={`mb-3 ${level > 0 ? 'ml-2' : ''}`}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-primary">
                                    {currentPath.join(' → ')}
                                </label>
                                <textarea
                                    value={String(value)}
                                    onChange={(e) => handleValueChange(currentPath, e.target.value)}
                                    className="w-full p-3 border border-color text-primary rounded-lg text-sm resize-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                    rows={String(value).length > 50 ? 3 : 1}
                                    placeholder="Enter translation..."
                                />
                            </div>
                        </div>
                    );
                }
            }

            return acc;
        }, []);
    };

    if (Object.keys(filesData).length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <div className="max-w-md text-center">
                    <Globe className="w-16 h-16 text-accent mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-primary mb-4">Translation Editor</h1>
                    <p className="text-secondary mb-8">
                        Select a folder containing your translation files (en.json, fr.json, etc.) to begin editing.
                    </p>
                    <button
                        onClick={loadFiles}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                    >
                        <Folder className="w-5 h-5" />
                        Select Translation Folder
                    </button>
                </div>
            </div>
        );
    }

    return (<>
        <div className="min-h-screen bg-background relative">
            <Navbar />
            {/* Header */}
            <div className="bg-surface border-b border-color">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="w-8 h-8 text-accent" />
                            <div>
                                <h1 className="text-2xl font-bold text-primary">Translation Editor</h1>
                                <p className="text-sm text-secondary">Manage your application translations</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasUnsavedChanges && (
                                <span className="px-3 py-1 bg-accent-hover text-primary text-sm rounded-full">
                                    Unsaved changes
                                </span>
                            )}
                            <button
                                onClick={() => saveFile(activeLang)}
                                disabled={!hasUnsavedChanges}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Save {activeLang.toUpperCase()}
                            </button>
                            <button
                                onClick={saveAll}
                                disabled={!hasUnsavedChanges}
                                className="flex items-center gap-2 px-4 py-2 border border-color text-primary rounded-lg hover:bg-surface transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Save All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-3">
                        <div className="bg-surface rounded-xl shadow-sm border border-color p-4 sticky top-24">
                            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Languages
                            </h2>

                            <div className="space-y-2">
                                {Object.keys(filesData).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveLang(lang)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeLang === lang
                                            ? 'bg-accent text-primary border-l-4 border-accent'
                                            : 'text-secondary hover:bg-surface'
                                            }`}
                                    >
                                        <div className="font-medium">{languageNames[lang] || lang.toUpperCase()}</div>
                                        <div className="text-sm text-secondary">
                                            {Object.keys(filesData[lang] || {}).length} keys
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                        <div className="bg-surface rounded-xl shadow-sm border border-color">
                            {/* Search Bar */}
                            <div className="p-6 border-b border-color">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search translations..."
                                        className="w-full pl-10 pr-4 py-3 border border-color rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {activeLang && filesData[activeLang] ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-semibold text-primary">
                                                Editing {languageNames[activeLang] || activeLang.toUpperCase()}
                                            </h2>
                                            <button
                                                onClick={() => {
                                                    setExpandedSections(new Set());
                                                    setSearchTerm('');
                                                }}
                                                className="text-sm text-secondary hover:text-primary transition-colors"
                                            >
                                                Reset View
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {renderTranslationFields(filesData[activeLang])}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 text-secondary mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-primary mb-2">No Translation Data</h3>
                                        <p className="text-secondary">Please select a language to edit.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}