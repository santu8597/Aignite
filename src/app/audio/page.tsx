"use client";
import { useState } from "react";

export default function AudioAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !question) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

    const res = await fetch("/api/analyze-audio", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAnswer(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎧 Audio Analyzer with Gemini</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <input
          type="text"
          placeholder="Ask a question about the audio..."
          className="w-full border p-2 rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-600">Analyzing audio...</p>}
      {answer && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-black">
          <h2 className="font-semibold mb-2">🧠 Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
