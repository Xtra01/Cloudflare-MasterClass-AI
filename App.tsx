import React, { useState, useEffect } from 'react';
import { CLOUDFLARE_CURRICULUM } from './constants';
import { Category, GeneratedContent, Topic } from './types';
import { generateTutorialContent, generateDeepDive } from './services/geminiService';
import MarkdownRenderer from './components/MarkdownRenderer';
import { Logo, ChevronRight, BookOpen, Terminal, Shield, Zap, Database, Lock, Sparkles } from './components/Icons';

// Extend window for html2pdf
declare global {
  interface Window {
    html2pdf: any;
  }
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(CLOUDFLARE_CURRICULUM[0].id);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deepDiveQuery, setDeepDiveQuery] = useState('');
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // Load completed topics from local storage
  useEffect(() => {
    const saved = localStorage.getItem('cf_masterclass_progress');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }
  }, []);

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

  const handleTopicClick = async (topic: Topic) => {
    setActiveTopic(topic);
    setLoading(true);
    setContent(null);
    setDeepDiveQuery('');
    
    try {
      const result = await generateTutorialContent(topic.title, topic.level);
      setContent(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeepDive = async () => {
    if (!content || !deepDiveQuery) return;
    setLoading(true);
    try {
      const result = await generateDeepDive(content.title, deepDiveQuery);
      setContent({
        ...result,
        title: `Derin Analiz: ${result.title}`,
        relatedTopics: result.relatedTopics
      });
      setDeepDiveQuery('');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!content || !window.html2pdf) return;
    setIsPdfGenerating(true);
    
    const element = document.getElementById('tutorial-content');
    const opt = {
      margin: 10,
      filename: `CF-MasterClass-${activeTopic?.id}.pdf`,
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

  // Calculate Progress
  const totalTopics = CLOUDFLARE_CURRICULUM.reduce((acc, cat) => acc + cat.topics.length, 0);
  const progressPercentage = Math.round((completedTopics.length / totalTopics) * 100);

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-gray-100 overflow-hidden font-sans relative">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 flex-shrink-0 bg-[#121212] border-r border-[#2c2c2c] flex flex-col z-10 relative`}>
        <div className="p-6 border-b border-[#2c2c2c] flex items-center gap-3 bg-[#121212]">
          <Logo />
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">Cloudflare</h1>
            <span className="text-xs text-cf-orange font-bold tracking-widest uppercase">MasterClass</span>
          </div>
        </div>

        {/* Global Progress */}
        <div className="px-6 py-4 border-b border-[#2c2c2c] bg-[#161616]">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Genel İlerleme</span>
            <span className="text-cf-orange font-bold">%{progressPercentage}</span>
          </div>
          <div className="h-1.5 bg-[#2c2c2c] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cf-orange to-orange-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {CLOUDFLARE_CURRICULUM.map((category) => (
            <div key={category.id} className="mb-2">
              <div 
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCategory === category.id ? 'text-white bg-[#2c2c2c]' : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <span className={`${activeCategory === category.id ? 'text-cf-orange' : 'text-gray-500'}`}>
                   {getCategoryIcon(category.id)}
                </span>
                <span className="font-bold uppercase tracking-wide text-xs flex-1">{category.title}</span>
                <ChevronRight />
              </div>
              
              {activeCategory === category.id && (
                <div className="mt-2 space-y-1 ml-4 border-l border-[#2c2c2c] pl-2">
                  {category.topics.map((topic) => {
                    const isCompleted = completedTopics.includes(topic.id);
                    const isActive = activeTopic?.id === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-200 group relative flex items-start gap-3
                          ${isActive 
                            ? 'bg-[#F38020]/10 text-[#F38020] border-r-2 border-[#F38020]' 
                            : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-white'}`}
                      >
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${isCompleted ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-[#363636]'}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium truncate ${isCompleted && !isActive ? 'line-through opacity-50' : ''}`}>{topic.title}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
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
               <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-mono uppercase">Şu an inceleniyor</span>
                  <span className="text-sm font-bold text-white truncate max-w-[300px]">{activeTopic.title}</span>
               </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             {content && !loading && (
                <>
                  <button 
                    onClick={downloadPDF}
                    disabled={isPdfGenerating}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-300 bg-[#1f1f1f] border border-[#363636] rounded hover:bg-[#2c2c2c] transition-all"
                  >
                    {isPdfGenerating ? 'Hazırlanıyor...' : (
                        <>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                           PDF İNDİR
                        </>
                    )}
                  </button>
                  <button 
                    onClick={() => activeTopic && toggleComplete(activeTopic.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded transition-all
                      ${activeTopic && completedTopics.includes(activeTopic.id) 
                        ? 'bg-green-900/20 text-green-400 border-green-800 hover:bg-green-900/30' 
                        : 'bg-cf-orange text-white border-transparent hover:bg-orange-600'}`}
                  >
                    {activeTopic && completedTopics.includes(activeTopic.id) ? 'TAMAMLANDI' : 'TAMAMLA'}
                  </button>
                </>
             )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          
          {!activeTopic && !loading && (
             <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-8 border border-[#333] shadow-[0_0_30px_rgba(243,128,32,0.1)]">
                  <Logo />
                </div>
                <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Cloudflare <span className="text-cf-orange">MasterClass</span></h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
                  İnternet altyapısının geleceğini şekillendiren teknolojileri öğrenin. 
                  Zero Trust'tan Serverless mimarilere kadar eksiksiz ve derinlemesine bir yolculuk.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-left">
                  {[
                    { title: "Network & Security", desc: "DNS, DDoS, WAF ve tünelleme.", icon: <Shield /> },
                    { title: "Serverless Compute", desc: "Workers, Pages ve Durable Objects.", icon: <Terminal /> },
                    { title: "Data & AI", desc: "R2, D1 SQL ve Workers AI.", icon: <Database /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#161616] p-6 rounded-xl border border-[#2c2c2c] hover:border-cf-orange/50 transition-colors group">
                       <div className="text-cf-orange mb-4 p-3 bg-cf-orange/10 w-fit rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                       <h3 className="text-white font-bold mb-2">{item.title}</h3>
                       <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {loading && (
            <div className="max-w-4xl mx-auto p-12 space-y-8">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full border-2 border-cf-orange border-t-transparent animate-spin"></div>
                 <span className="text-xl font-mono text-cf-orange animate-pulse">Eğitim İçeriği Oluşturuluyor...</span>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-[#1f1f1f] rounded w-full animate-pulse"></div>
                <div className="h-4 bg-[#1f1f1f] rounded w-11/12 animate-pulse"></div>
                <div className="h-4 bg-[#1f1f1f] rounded w-4/5 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-40 bg-[#1f1f1f] rounded border border-[#2c2c2c] animate-pulse"></div>
                  <div className="h-40 bg-[#1f1f1f] rounded border border-[#2c2c2c] animate-pulse"></div>
              </div>
            </div>
          )}

          {!loading && content && (
            <div className="p-8 md:p-12 pb-32">
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
                    <span className="text-gray-500 text-sm">/</span>
                    <span className="text-gray-400 text-sm font-medium">{activeCategory?.toUpperCase()}</span>
                 </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 pb-6 border-b border-[#2c2c2c] leading-tight">
                  {content.title}
                </h1>
                
                <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-code:text-cf-orange max-w-none">
                   <MarkdownRenderer content={content.content} />
                </div>

                <div className="mt-12 pt-8 border-t border-[#2c2c2c] flex justify-between items-end text-gray-500 text-xs font-mono">
                   <div>Generated by Cloudflare MasterClass AI</div>
                   <div>{new Date().toLocaleDateString('tr-TR')}</div>
                </div>
              </div>

              {/* Research / Deep Dive Section */}
              <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-[#1D1D1D] to-[#161616] border border-cf-orange/20 rounded-xl p-8 relative overflow-hidden group hover:border-cf-orange/40 transition-colors">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-cf-orange/10 rounded-full blur-3xl group-hover:bg-cf-orange/20 transition-all"></div>
                
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                  <Sparkles className="text-cf-orange" />
                  Uzmanına Sor
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl">
                  Bu konu hakkında spesifik bir senaryonuz mu var? Veya "Edge Case" bir durumu merak mı ediyorsunuz? 
                  Yapay zeka asistanı sizin için teknik analiz yapsın.
                </p>
                
                <div className="flex gap-3 mb-6">
                  <input 
                    type="text" 
                    value={deepDiveQuery}
                    onChange={(e) => setDeepDiveQuery(e.target.value)}
                    placeholder="Örn: Bu yapıyı 10 milyon istek alan bir e-ticaret sitesi için nasıl ölçeklerim?"
                    className="flex-1 bg-black/40 border border-[#363636] rounded-lg px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cf-orange focus:ring-1 focus:ring-cf-orange transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleDeepDive()}
                  />
                  <button 
                    onClick={handleDeepDive}
                    disabled={!deepDiveQuery}
                    className="bg-cf-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-lg transition-transform active:scale-95 shadow-lg shadow-orange-900/20"
                  >
                    ANALİZ ET
                  </button>
                </div>

                {content.relatedTopics && content.relatedTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {content.relatedTopics.map((tag, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setDeepDiveQuery(tag);
                          handleDeepDive(); // Optional: Auto trigger or just fill
                        }}
                        className="text-xs font-mono bg-[#2c2c2c] hover:bg-[#363636] hover:text-cf-orange text-gray-400 px-3 py-1.5 rounded border border-[#363636] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;