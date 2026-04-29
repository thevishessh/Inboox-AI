"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Search, Calendar, Tag, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface EmailDraft {
  id: number;
  subject: string;
  content: string;
  tone: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<EmailDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/emails/history");
        setHistory(response.data);
      } catch (err) {
        setError("Failed to load history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => 
    (item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tone?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">History</h1>
          <p className="text-foreground/50">Your past AI-generated email drafts.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-surface-light border border-border rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
          />
        </div>
      </div>


      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-foreground/40">Loading your history...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="border-2 border-dashed border-border p-20 rounded-2xl text-center">
          <HistoryIcon className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">No drafts found</h3>
          <p className="text-foreground/40">You haven't generated any drafts yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="bg-surface border border-border p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between hover:border-primary/30 transition-all cursor-pointer group space-y-4 sm:space-y-0"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="font-bold text-lg">{item.subject || "Generated Draft"}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-xs text-foreground/40 space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="bg-surface-light px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-primary flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{item.tone}</span>
                    </span>
                  </div>
                </div>
                <p className="text-foreground/50 text-sm line-clamp-2 sm:line-clamp-1">{item.content}</p>
              </div>

              <div className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-surface-light p-2 rounded-lg hover:bg-border transition-colors">
                  <HistoryIcon className="w-4 h-4 text-primary" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
