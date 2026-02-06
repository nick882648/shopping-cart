'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatRole = 'user' | 'bot';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
};

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function getBotReply(inputRaw: string) {
  const input = normalize(inputRaw);

  if (!input) return `Tell me what you need help with — products, sizing, shipping, returns, or your order.`;

  // Greetings
  if (/\b(hi|hello|hey|hii|hola)\b/.test(input)) {
    return `Hi! I’m Kavya Assist. How can I help today?`;
  }

  // Shipping
  if (/\b(shipping|deliver|delivery|ship)\b/.test(input)) {
    return `Shipping is typically 3–5 business days (standard). Express options may be available at checkout.`;
  }

  // Returns
  if (/\b(return|refund|exchange)\b/.test(input)) {
    return `Returns/exchanges are supported on eligible items. Keep the product in original condition and start a return from your Account page.`;
  }

  // Sizing
  if (/\b(size|sizing|fit)\b/.test(input)) {
    return `For sizing: pick your usual size, then adjust based on comfort. If you tell me the product and your usual size, I can suggest a fit.`;
  }

  // Order status
  if (/\b(order|tracking|track|status)\b/.test(input)) {
    return `Order tracking will appear under Account → Order History once your order is placed. If you share your order number, I can guide you where to find updates.`;
  }

  // Contact/support
  if (/\b(contact|support|email|help)\b/.test(input)) {
    return `You can reach support at support@kavya.com. I can also help with common questions right here.`;
  }

  // Default
  return `Got it. I can help with shipping, returns, sizing, and order status. Which one do you want?`;
}

const SUGGESTIONS = [
  'Shipping info',
  'Return policy',
  'Sizing help',
  'How to track my order?',
];

const WHATSAPP_NUMBER = '919315449081';
const WHATSAPP_DISPLAY = '+91 93154 49081';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: nowId(),
      role: 'bot',
      text: `Hi! I’m Kavya Assist. Ask me about shipping, returns, sizing, or your order.`,
      ts: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastBotMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i]?.role === 'bot') return messages[i];
    }
    return null;
  }, [messages]);

  // Auto-open once per browser (per localStorage) so it appears automatically on any page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const seen = window.localStorage.getItem('kavyaChatSeen');
      if (!seen) {
        setOpen(true);
        window.localStorage.setItem('kavyaChatSeen', '1');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Scroll to bottom when new messages arrive
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Open WhatsApp chat with the query text
    if (typeof window !== 'undefined') {
      const base = `https://wa.me/${WHATSAPP_NUMBER}`;
      const message = `Hi, I have a question from the Kavya website:\n\n${trimmed}`;
      const url = `${base}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    const userMsg: ChatMessage = {
      id: nowId(),
      role: 'user',
      text: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Panel */}
      {open && (
        <div
          className="mb-3 w-[320px] sm:w-[360px] rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden"
          role="dialog"
          aria-label="Chatbot"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-coral-600 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div className="leading-tight">
                <div className="font-semibold">Kavya Assist</div>
                <div className="text-xs text-white/90">We’ll reply to your query on WhatsApp.</div>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md p-1 hover:bg-white/15"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="max-h-[360px] overflow-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={[
                    'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm',
                    m.role === 'user'
                      ? 'bg-coral-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md ring-1 ring-gray-200',
                  ].join(' ')}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Suggestions (show after last bot message, when input empty) */}
            {input.trim() === '' && lastBotMessage && (
              <div className="pt-1">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="text-xs rounded-full bg-white text-gray-700 ring-1 ring-gray-200 px-3 py-1 hover:bg-coral-50 hover:ring-coral-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-200"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              placeholder="Type a message…"
              aria-label="Message"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-coral-600 text-white px-3 py-2 hover:bg-coral-700 transition-colors"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        className="rounded-full shadow-lg ring-1 ring-gray-200 bg-coral-600 hover:bg-coral-700 text-white p-4 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}

