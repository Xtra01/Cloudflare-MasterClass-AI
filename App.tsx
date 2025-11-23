
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CLOUDFLARE_CURRICULUM, STATIC_TUTORIALS } from './constants';
import { Topic, ChatMessage, ContentCache, Language } from './types';
import { generateTutorialContent, chatWithContext } from './services/geminiService';
import { UI_TEXT } from './translations';
import MarkdownRenderer from './components/MarkdownRenderer';
import ChatBubble from './components/ChatBubble';
import { Logo, ChevronRight, BookOpen, Terminal, Shield, Zap, Database, Lock, Sparkles, Settings, RefreshCw, XCircle, Trash } from './components/Icons';

declare global {
  interface Window {
    html2pdf: any;
  }
}

// Maximum number of simultaneous API requests to prevent timeouts/limits
const MAX_CONCURRENT_REQUESTS = 2;

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('tr');
  const [activeCategory, setActiveCategory] = useState<string | null>(CLOUDFLARE_CURRICULUM[0].id);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Caching State: TopicID -> { tr: Content, en: Content }
  const [contentCache, setContentCache] = useState<ContentCache>(STATIC_TUTORIALS);
  
  // Queue System State
  const [processingQueue, setProcessingQueue] = useState<Topic[]>([]);
  const [activeRequests, setActiveRequests] = useState<string[]>([]); 
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Text Dictionary
  const T = UI_TEXT[language];

  useEffect(() => {
    const saved = localStorage.getItem('cf_masterclass_progress');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }
  }, []);

  // Process Queue
  useEffect(() => {
    const processQueue = async () => {
      if (processingQueue.length === 0 || activeRequests.length >= MAX_CONCURRENT_REQUESTS) {
        return;
      }

      const [nextTopic, ...remainingQueue] = processingQueue;
      
      setProcessingQueue(remainingQueue);
      setActiveRequests(prev => [...prev, nextTopic.id]);

      try {
        // Generate content for the CURRENT language
        const result = await generateTutorialContent(nextTopic.title[language], nextTopic.level, language);
        
        setContentCache(prev => ({
            ...prev,
            [nextTopic.id]: {
                ...prev[nextTopic.id],
                [language]: result
            }
        }));

        addToast(nextTopic.id, T.toastReady, `${nextTopic.title[language]} ${T.toastReadyDesc}`, 'success');

      } catch (e) {
        console.error(e);
        addToast(nextTopic.id, T.toastError, `${nextTopic.title[language]} ${T.toastErrorDesc}`, 'error');
      } finally {
        setActiveRequests(prev => prev.filter(id => id !== nextTopic.id));
      }
    };

    processQueue();
  }, [processingQueue, activeRequests, language]);

  const addToast = (id: string, title: string, message: string, type: 'success' | 'info' | 'error') => {
    const toastId = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id: toastId, title, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (topicId: string) => {
    let newCompleted;
    if (completedTopics.includes(topicId)) {
      newCompleted = completedTopics.filter(id => id !== topicId);
    } else {
      newCompleted = [...completedTopics, topicId];
    }
    setCompletedTopics(newCompleted);
    localStorage.setItem('cf_masterclass_progress', JSON.stringify(newCompleted));
  };

  const handleTopicClick = (topic: Topic) => {
    setActiveTopic(topic);
    
    // Check if content exists for current language
    const hasContent = contentCache[topic.id] && contentCache[topic.id][language];

    if (!hasContent && !isTopicProcessing(topic.id) && !isTopicQueued(topic.id)) {
        addToQueue(topic);
    }
  };

  const handleRegenerate = (topic: Topic) => {
    addToQueue(topic);
    addToast(topic.id, T.toastQueued, `${topic.title[language]} ${T.toastQueuedDesc}`, 'info');
  };

  const addToQueue = (topic: Topic) => {
    if (isTopicQueued(topic.id) || isTopicProcessing(topic.id)) return;
    setProcessingQueue(prev => [...prev, topic]);
  };

  const handleRegenerateCategory = () => {
    if (!activeCategory) return;
    const cat = CLOUDFLARE_CURRICULUM.find(c => c.id === activeCategory);
    if (!cat) return;

    let addedCount = 0;
    const newItems: Topic[] = [];
    cat.topics.forEach(t => {
       if (!isTopicQueued(t.id) && !isTopicProcessing(t.id)) {
         newItems.push(t);
         addedCount++;
       }
    });

    if (addedCount > 0) {
        setProcessingQueue(prev => [...prev, ...newItems]);
        addToast("bulk-cat", T.toastBulkCat, `${addedCount} ${T.toastBulkCatDesc}`, "info");
    }
    setIsSettingsOpen(false);
  };

  const handleRegenerateAll = () => {
    const allTopics: Topic[] = [];
    CLOUDFLARE_CURRICULUM.forEach(cat => {
        cat.topics.forEach(t => allTopics.push(t));
    });

    const newItems = allTopics.filter(t => !isTopicQueued(t.id) && !isTopicProcessing(t.id));

    if (newItems.length > 0) {
        setProcessingQueue(prev => [...prev, ...newItems]);
        addToast("bulk-all", T.toastBulkAll, `${newItems.length} ${T.toastBulkAllDesc}`, "info");
    }
    setIsSettingsOpen(false);
  };

  const handleResetCache = () => {
      setProcessingQueue([]);
      setContentCache(STATIC_TUTORIALS);
      addToast("reset", T.toastReset, T.toastResetDesc, "success");
      setIsSettingsOpen(false);
  };

  const handleResetProgress = () => {
      setCompletedTopics([]);
      localStorage.removeItem('cf_masterclass_progress');
      addToast("reset-prog", T.toastResetProg, T.resetProgressDesc, "success");
      setIsSettingsOpen(false);
  };

  const handleClearQueue = () => {
      setProcessingQueue([]);
      addToast("clear-queue", T.toastQueueCleared, "", "info");
  };

  const isTopicProcessing = (id: string) => activeRequests.includes(id);
  const isTopicQueued = (id: string) => processingQueue.some(t => t.id === id);

  const handleChat = async (text: string) => {
    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setChatMessages(prev => [...prev, newUserMsg]);
    setIsChatLoading(true);

    const currentContentText = activeTopic ? contentCache[activeTopic.id]?.[language]?.content : null;

    try {
        const responseText = await chatWithContext(text, currentContentText, [...chatMessages, newUserMsg], language);
        const newModelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setChatMessages(prev => [...prev, newModelMsg]);
    } finally {
        setIsChatLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!activeTopic || !contentCache[activeTopic.id]?.[language] || !window.html2pdf) return;
    setIsPdfGenerating(true);
    
    const element = document.getElementById('tutorial-content');
    const opt = {
      margin: 10,
      filename: `CF-MasterClass-${activeTopic?.id}-${language}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#1a1a1a' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsPdfGenerating(false);
    });
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'fundamentals': return <BookOpen />;
      case 'security': return <Shield />;
      case 'developer-platform': return <Terminal />;
      case 'data-storage': return <Database />;
      case 'zero-trust': return <Lock />;
      case 'ai-ml': return <Sparkles />;
      default: return <Zap />;
    }
  };

  const filteredCurriculum = useMemo(() => {
    if (!searchQuery) return CLOUDFLARE_CURRICULUM;
    const lowerQ = searchQuery.toLowerCase();
    
    return CLOUDFLARE_CURRICULUM.map(cat => ({
        ...cat,
        topics: cat.topics.filter(t => 
            t.title[language].toLowerCase().includes(lowerQ) || 
            t.description[language].toLowerCase().includes(lowerQ)
        )
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, language]);

  // Get active content safely
  const activeContent = activeTopic ? contentCache[activeTopic.id]?.[language] : null;

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-gray-100 overflow-hidden font-sans relative">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

      {/* Settings Modal */}
      {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsSettingsOpen(false)}>
              <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 w-[400px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Settings /> {T.settingsTitle}
                  </h3>
                  
                  <div className="space-y-3">
                      <button onClick={handleRegenerateCategory} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-[#2c2c2c] rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-cf-orange">{T.refreshCategory}</div>
                              <div className="text-xs text-gray-500">{T.refreshCategoryDesc}</div>
                          </div>
                          <RefreshCw className="text-gray-500 group-hover:text-cf-orange" />
                      </button>

                      <button onClick={handleRegenerateAll} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-[#2c2c2c] rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-cf-orange">{T.refreshAll}</div>
                              <div className="text-xs text-gray-500">{T.refreshAllDesc}</div>
                          </div>
                          <RefreshCw className="text-gray-500 group-hover:text-cf-orange" />
                      </button>

                      <hr className="border-[#333] my-2" />

                      <button onClick={handleResetProgress} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-red-900/20 rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-red-400">{T.resetProgress}</div>
                              <div className="text-xs text-gray-500">{T.resetProgressDesc}</div>
                          </div>
                          <Trash className="text-gray-500 group-hover:text-red-400" />
                      </button>

                      <button onClick={handleResetCache} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-red-900/20 rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-red-400">{T.factoryReset}</div>
                              <div className="text-xs text-gray-500">{T.factoryResetDesc}</div>
                          </div>
                          <XCircle className="text-gray-500 group-hover:text-red-400" />
                      </button>
                  </div>

                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="mt-6 w-full py-2 bg-[#333] hover:bg-[#404040] rounded text-sm font-semibold"
                  >
                      {T.settingsClose}
                  </button>
              </div>
          </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto min-w-[300px] bg-[#161616] border-l-4 p-4 rounded shadow-2xl animate-slideLeft relative overflow-hidden
              ${toast.type === 'success' ? 'border-green-500' : toast.type === 'error' ? 'border-red-500' : 'border-blue-500'}`}
          >
             <div className="flex justify-between items-start">
                <div>
                   <h4 className={`font-bold text-sm ${toast.type === 'success' ? 'text-green-500' : toast.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
                      {toast.title}
                   </h4>
                   <p className="text-gray-300 text-xs mt-1">{toast.message}</p>
                </div>
                <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 flex-shrink-0 bg-[#121212] border-r border-[#2c2c2c] flex flex-col z-10 relative shadow-2xl`}>
        <div className="p-6 border-b border-[#2c2c2c] flex items-center justify-between bg-[#121212]">
            <div className="flex items-center gap-3">
                <Logo />
                <div className={`${!sidebarOpen && 'hidden'}`}>
                    <h1 className="font-bold text-lg tracking-tight text-white">{T.sidebarTitle}</h1>
                    <span className="text-xs text-cf-orange font-bold tracking-widest uppercase">{T.sidebarSubtitle}</span>
                </div>
            </div>
        </div>

        {/* Language Switcher */}
        {sidebarOpen && (
            <div className="px-4 pt-4">
                <div className="flex bg-[#1f1f1f] p-1 rounded-lg border border-[#333]">
                    <button 
                        onClick={() => setLanguage('tr')}
                        className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${language === 'tr' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        TÜRKÇE
                    </button>
                    <button 
                         onClick={() => setLanguage('en')}
                         className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        ENGLISH
                    </button>
                </div>
            </div>
        )}

        {/* Search Box */}
        <div className={`p-4 ${!sidebarOpen && 'hidden'}`}>
            <div className="relative">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={T.searchPlaceholder}
                    className="w-full bg-[#1f1f1f] border border-[#333] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-cf-orange focus:ring-1 focus:ring-cf-orange focus:outline-none transition-all"
                />
                <svg className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
        </div>

        {/* Status Bar */}
        {(processingQueue.length > 0 || activeRequests.length > 0) && sidebarOpen && (
            <div className="px-4 py-2 bg-[#1a1a1a] border-y border-[#2c2c2c] flex items-center justify-between text-xs">
               <div className="flex items-center gap-2">
                   <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-cf-orange rounded-full animate-pulse"></div>
                   </div>
                   <span className="text-gray-400">{T.processing}: <span className="text-cf-orange font-bold">{activeRequests.length}</span> / {T.queued}: <span className="text-white font-bold">{processingQueue.length}</span></span>
               </div>
               <button 
                 onClick={handleClearQueue} 
                 className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded p-1"
               >
                   <XCircle />
               </button>
            </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredCurriculum.map((category) => (
            <div key={category.id} className="mb-2">
              <div 
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCategory === category.id ? 'text-white bg-[#2c2c2c]' : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <span className={`${activeCategory === category.id ? 'text-cf-orange' : 'text-gray-500'}`}>
                   {getCategoryIcon(category.id)}
                </span>
                <span className={`font-bold uppercase tracking-wide text-xs flex-1 ${!sidebarOpen && 'hidden'}`}>{category.title[language]}</span>
                {sidebarOpen && <ChevronRight />}
              </div>
              
              {activeCategory === category.id && sidebarOpen && (
                <div className="mt-2 space-y-1 ml-4 border-l border-[#2c2c2c] pl-2 animate-fadeIn">
                  {category.topics.map((topic) => {
                    const isCompleted = completedTopics.includes(topic.id);
                    const isActive = activeTopic?.id === topic.id;
                    const isProcessing = isTopicProcessing(topic.id);
                    const isQueued = isTopicQueued(topic.id);
                    
                    // Check cache for current language
                    const cachedItem = contentCache[topic.id]?.[language];
                    // If it exists and differs from default static (not really needed logic anymore as static is default, but good for "updated" check if we implemented versioning)
                    const isCached = !!cachedItem;

                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-200 group relative flex items-start gap-3
                          ${isActive 
                            ? 'bg-[#F38020]/10 text-[#F38020] border-r-2 border-[#F38020]' 
                            : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-white'}`}
                      >
                         {/* Status Icon */}
                        <div className="mt-1 flex-shrink-0">
                           {isProcessing ? (
                               <div className="w-2 h-2 rounded-full border border-cf-orange border-t-transparent animate-spin"></div>
                           ) : isQueued ? (
                               <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
                           ) : (
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300
                                    ${isCompleted ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 
                                    isCached ? 'bg-blue-500/50' : 'bg-[#363636]'}`}>
                                </div>
                           )}
                        </div>

                        <div className="flex-1 min-w-0 flex justify-between items-center">
                          <div className={`font-medium truncate ${isCompleted && !isActive ? 'line-through opacity-50' : ''}`}>{topic.title[language]}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
          {filteredCurriculum.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-4">{T.resultsNotFound}</div>
          )}
        </div>

        <div className="p-4 border-t border-[#2c2c2c] bg-[#121212]">
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors ${!sidebarOpen && 'justify-center'}`}
            >
                <Settings />
                {sidebarOpen && <span>{T.settingsTitle}</span>}
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* Top Bar */}
        <div className="h-16 border-b border-[#2c2c2c] flex items-center justify-between px-6 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#2c2c2c] rounded-md text-gray-400 transition-colors">
               <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
            {activeTopic && (
               <div className="flex flex-col animate-fadeIn">
                  <span className="text-xs text-gray-500 font-mono uppercase">{T.currentlyViewing}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate max-w-[300px]">{activeTopic.title[language]}</span>
                    {(isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id)) && (
                        <span className="text-xs text-cf-orange animate-pulse border border-cf-orange/50 px-1 rounded">
                            {isTopicProcessing(activeTopic.id) ? T.statusRegenerating : T.statusQueued}
                        </span>
                    )}
                  </div>
               </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             {activeContent && (
                <>
                   <button 
                    onClick={() => activeTopic && handleRegenerate(activeTopic)}
                    disabled={activeTopic && (isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id))}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-[#2c2c2c] rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className={`${activeTopic && isTopicProcessing(activeTopic.id) ? 'animate-spin' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    {activeTopic && isTopicProcessing(activeTopic.id) ? T.btnProcessing : T.btnRegenerate}
                  </button>
                  <button 
                    onClick={downloadPDF}
                    disabled={isPdfGenerating}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-300 bg-[#1f1f1f] border border-[#363636] rounded hover:bg-[#2c2c2c] transition-all"
                  >
                    {isPdfGenerating ? '...' : T.btnDownloadPdf}
                  </button>
                  <button 
                    onClick={() => activeTopic && toggleComplete(activeTopic.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded transition-all
                      ${activeTopic && completedTopics.includes(activeTopic.id) 
                        ? 'bg-green-900/20 text-green-400 border-green-800 hover:bg-green-900/30' 
                        : 'bg-cf-orange text-white border-transparent hover:bg-orange-600'}`}
                  >
                    {activeTopic && completedTopics.includes(activeTopic.id) ? T.btnCompleted : T.btnComplete}
                  </button>
                </>
             )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          
          {!activeTopic && (
             <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fadeIn">
                <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-8 border border-[#333] shadow-[0_0_30px_rgba(243,128,32,0.1)]">
                  <Logo />
                </div>
                <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">{T.welcomeTitle} <span className="text-cf-orange">{T.welcomeSubtitle}</span></h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
                  {T.welcomeDesc}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl">
                    {['Workers', 'WAF', 'DDoS', 'R2 Storage', 'Terraform', 'Zero Trust'].map(tag => (
                        <button 
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-xs bg-[#1f1f1f] border border-[#2c2c2c] text-gray-400 px-3 py-1 rounded-full hover:border-cf-orange hover:text-cf-orange transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
             </div>
          )}

          {/* Loading State */}
          {activeTopic && !activeContent && (isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id)) && (
            <div className="max-w-4xl mx-auto p-12 space-y-8 animate-fadeIn flex flex-col items-center justify-center h-full">
              <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-[#333] border-t-cf-orange animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-white">
                      {isTopicProcessing(activeTopic.id) ? 'AI' : 'Q'}
                  </div>
              </div>
              <div className="text-center">
                  <span className="text-xl font-mono text-cf-orange block mb-2">
                    {isTopicProcessing(activeTopic.id) ? T.loadingAI : T.loadingQueue}
                  </span>
                  <p className="text-gray-500 text-sm max-w-md">
                    {T.loadingDesc}
                  </p>
              </div>
            </div>
          )}

          {activeContent && (
            <div className="p-8 md:p-12 pb-32 animate-slideUp">
              {/* Background Process Warning */}
              {(isTopicProcessing(activeTopic!.id) || isTopicQueued(activeTopic!.id)) && (
                  <div className="bg-cf-orange/10 border border-cf-orange/20 text-cf-orange p-3 rounded-lg mb-6 text-sm flex items-center gap-3 animate-pulse">
                      <div className="w-2 h-2 bg-cf-orange rounded-full"></div>
                      {T.backgroundProcess}
                  </div>
              )}

              <div id="tutorial-content" className="max-w-4xl mx-auto bg-[#161616] p-10 rounded-2xl border border-[#2c2c2c] shadow-2xl relative pdf-content">
                 
                 <div className="absolute top-0 right-0 p-6 opacity-20">
                    <Logo />
                 </div>

                 <div className="mb-6 flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider
                      ${activeTopic?.level === 'Expert' ? 'bg-purple-900/30 text-purple-400 border border-purple-800' : 
                        activeTopic?.level === 'Advanced' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                        'bg-blue-900/30 text-blue-400 border border-blue-800'}`}>
                      {activeTopic?.level}
                    </span>
                 </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 pb-6 border-b border-[#2c2c2c] leading-tight">
                  {activeContent.title}
                </h1>
                
                <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-code:text-cf-orange max-w-none">
                   <MarkdownRenderer content={activeContent.content} />
                </div>

                <div className="mt-12 pt-8 border-t border-[#2c2c2c] flex justify-between items-end text-gray-500 text-xs font-mono">
                   <div>{T.generatedBy}</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      
      {/* AI Chat Bubble */}
      <ChatBubble 
        messages={chatMessages}
        onSendMessage={handleChat}
        isLoading={isChatLoading}
        labels={{ title: T.chatTitle, placeholder: T.chatPlaceholder, empty: T.chatEmpty, quote: T.quoteSelection }}
      />

    </div>
  );
};

export default App;
