'use client';

import { useState } from 'react';

export default function AudioAgentPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: newMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let responseText = '';
    const systemMessage = { role: 'model', text: '' };
    setMessages((prev) => [...prev, systemMessage]);

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      responseText += chunk;
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, text: responseText } : m
        )
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🎧 Audio Agent</h1>

      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded text-black ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Agent'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <textarea
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !input}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}
