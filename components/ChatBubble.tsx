import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { Logo, Sparkles } from './Icons';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatBubble: React.FC<Props> = ({ messages, onSendMessage, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handlePasteSelection = () => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      setInput((prev) => prev + (prev ? '\n\n' : '') + `> "${selection}"\n\nBu kısımla ilgili sorum şu: `);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`bg-[#161616] border border-[#333] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto flex flex-col mb-4
          ${isOpen ? 'w-[350px] h-[500px] opacity-100 scale-100' : 'w-[0px] h-[0px] opacity-0 scale-50'}`}
      >
        {/* Header */}
        <div className="bg-[#1f1f1f] p-4 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-white text-sm">Cloudflare Asistanı</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d0d0d]">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-10">
                    <Sparkles />
                    <p className="mt-2">İçerikle ilgili takıldığınız yerleri sorun.</p>
                </div>
            )}
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[85%] rounded-lg p-3 text-sm 
                        ${msg.role === 'user' 
                            ? 'bg-[#F38020] text-white' 
                            : 'bg-[#1f1f1f] text-gray-200 border border-[#333]'}`}
                    >
                        {msg.role === 'model' ? <MarkdownRenderer content={msg.text} /> : msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-[#1f1f1f] p-3 rounded-lg border border-[#333] flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#1f1f1f] border-t border-[#333]">
             {/* Utilities */}
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                 <button 
                    onClick={handlePasteSelection}
                    className="text-[10px] bg-[#2c2c2c] hover:bg-[#363636] text-gray-300 px-2 py-1 rounded border border-[#363636] whitespace-nowrap transition-colors"
                 >
                    + Seçimi Alıntıla
                 </button>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Bir soru sorun..."
                    className="flex-1 bg-[#0d0d0d] border border-[#333] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F38020]"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="bg-[#F38020] hover:bg-orange-600 disabled:opacity-50 text-white p-2 rounded-md transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </form>
        </div>
      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#F38020] hover:bg-orange-600 rounded-full shadow-[0_0_20px_rgba(243,128,32,0.4)] flex items-center justify-center text-white transition-all transform hover:scale-105 pointer-events-auto"
      >
        {isOpen ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default ChatBubble;