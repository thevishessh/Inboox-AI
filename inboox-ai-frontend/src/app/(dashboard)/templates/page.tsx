"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  FileText, 
  Clock, 
  Star, 
  MoreVertical,
  Mail,
  Calendar,
  Briefcase,
  UserCheck,
  X,
  Send,
  Trash2,
  Copy,
  Check,
  Heart,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const templateCategories = ["All", "Professional", "Personal", "Outreach", "Support"];

const initialTemplates = [
  {
    id: 1,
    title: "Project Update",
    description: "Keep your stakeholders informed about the latest project progress and milestones.",
    content: "Hi [Stakeholder Name],\n\nI wanted to provide a quick update on Project [Project Name]. We have successfully completed [Milestone] and are currently on track for [Next Deadline].\n\nKey achievements this week:\n- [Item 1]\n- [Item 2]\n\nPlease let me know if you have any questions.\n\nBest regards,\n[Your Name]",
    category: "Professional",
    icon: Briefcase,
    color: "text-blue-500",
    lastUsed: "2 hours ago",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Meeting Request",
    description: "A polished way to ask for someone's time for a quick sync or deep dive.",
    content: "Hi [Name],\n\nI'd like to schedule a brief meeting to discuss [Topic]. Would you have 15-20 minutes available sometime this week?\n\nI'm free during these times:\n- [Time 1]\n- [Time 2]\n\nLooking forward to connecting.\n\nBest,\n[Your Name]",
    category: "Professional",
    icon: Calendar,
    color: "text-purple-500",
    lastUsed: "1 day ago",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Cold Sales Outreach",
    description: "Connect with potential leads using a personalized and value-driven approach.",
    content: "Hi [Lead Name],\n\nI've been following [Company Name]'s progress in the [Industry] sector, and I was particularly impressed by [Recent Achievement].\n\nI'm reaching out because we help companies like yours solve [Specific Pain Point]. Would you be open to a 10-minute chat next week to see if we can do the same for you?\n\nBest,\n[Your Name]",
    category: "Outreach",
    icon: Mail,
    color: "text-orange-500",
    lastUsed: "5 hours ago",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Customer Support Reply",
    description: "A friendly and professional response to common customer inquiries.",
    content: "Hi [Customer Name],\n\nThank you for reaching out! I'm sorry to hear you're experiencing issues with [Problem].\n\nI've looked into your account and [Solution/Explanation]. You should be all set now!\n\nIf there's anything else I can help with, just let me know.\n\nBest regards,\n[Your Name]\nSupport Team",
    category: "Support",
    icon: UserCheck,
    color: "text-cyan-500",
    lastUsed: "Just now",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Birthday Invitation",
    description: "Invite friends and family to celebrate your special day with style.",
    content: "Hey [Friend Name]!\n\nI'm turning [Age] soon and I'd love for you to celebrate with me! 🎂\n\nWhen: [Date] at [Time]\nWhere: [Location]\nRSVP: By [Date]\n\nHope to see you there!\n\nBest,\n[Your Name]",
    category: "Personal",
    icon: Star,
    color: "text-pink-500",
    lastUsed: "2 days ago",
    isFavorite: true,
  },
  {
    id: 6,
    title: "Follow-up After Call",
    description: "Summarize the key takeaways and next steps after a productive conversation.",
    content: "Hi [Name],\n\nGreat speaking with you earlier today! As discussed, here are the key takeaways from our call:\n\n1. [Point 1]\n2. [Point 2]\n\nNext steps:\n- [Action Item 1]\n- [Action Item 2]\n\nI'll follow up again by [Date].\n\nCheers,\n[Your Name]",
    category: "Professional",
    icon: UserCheck,
    color: "text-green-500",
    lastUsed: "3 days ago",
    isFavorite: true,
  },
  {
    id: 7,
    title: "Collaboration Proposal",
    description: "Reach out to potential partners for exciting collaboration opportunities.",
    content: "Hi [Partner Name],\n\nI'm a big fan of your work at [Their Company/Blog]. I'm currently working on [Your Project] and I think there's a great opportunity for us to collaborate on [Specific Idea].\n\nAre you interested in a quick brainstorm session?\n\nBest,\n[Your Name]",
    category: "Outreach",
    icon: Sparkles,
    color: "text-indigo-500",
    lastUsed: "1 week ago",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Thank You Note",
    description: "Express your gratitude to someone for their help or support.",
    content: "Hi [Name],\n\nI just wanted to send a quick note to say thank you for [Reason for Thanking]. I really appreciate your time and effort!\n\nIt was a pleasure working with you.\n\nWarmly,\n[Your Name]",
    category: "Personal",
    icon: Heart,
    color: "text-red-400",
    lastUsed: "4 days ago",
    isFavorite: false,
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState(initialTemplates);
  const [viewingTemplate, setViewingTemplate] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // New Template State
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    description: "",
    content: "",
    category: "Professional"
  });

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.title || !newTemplate.content) return;

    const templateToAdd = {
      ...newTemplate,
      id: Date.now(),
      icon: FileText,
      color: "text-primary",
      lastUsed: "Just now",
      isFavorite: false
    };

    setTemplates([templateToAdd, ...templates]);
    setIsCreateModalOpen(false);
    setNewTemplate({ title: "", description: "", content: "", category: "Professional" });
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    setViewingTemplate(null);
  };

  const handleUseTemplate = (template: any) => {
    // In a real app, you might pass this via state management or URL params
    // For now, we'll simulate using it by navigating to dashboard
    const encodedContent = encodeURIComponent(template.content);
    router.push(`/dashboard?templateId=${template.id}`);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-ai-gradient">Email Templates</h1>
          <p className="text-foreground/50">Speed up your workflow with pre-built AI-powered templates.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex bg-surface border border-border p-1 rounded-xl overflow-x-auto no-scrollbar">
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                selectedCategory === category
                  ? "bg-surface-light text-primary shadow-sm"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setViewingTemplate(template)}
            className="group bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-xl bg-surface-light", template.color)}>
                <template.icon className="w-6 h-6" />
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle favorite logic
                  }}
                  className="p-2 text-foreground/20 hover:text-yellow-500 transition-colors"
                >
                  <Star className={cn("w-5 h-5", template.isFavorite && "fill-yellow-500 text-yellow-500")} />
                </button>
                <button className="p-2 text-foreground/20 hover:text-foreground transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{template.title}</h3>
            <p className="text-foreground/50 text-sm mb-6 line-clamp-2">
              {template.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center text-xs text-foreground/30 space-x-2">
                <Clock className="w-3 h-3" />
                <span>Used {template.lastUsed}</span>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-md bg-surface-light text-foreground/40">
                {template.category}
              </span>
            </div>
          </motion.div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl">
            <FileText className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No templates found</h3>
            <p className="text-foreground/40">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {(viewingTemplate || isCreateModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setViewingTemplate(null);
              setIsCreateModalOpen(false);
            }}
          >
            {/* Template Detail View */}
            {viewingTemplate && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-surface border border-border w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setViewingTemplate(null)}
                  className="absolute right-6 top-6 p-2 rounded-xl bg-surface-light hover:bg-border transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-4 mb-8">
                  <div className={cn("p-4 rounded-2xl bg-surface-light", viewingTemplate.color)}>
                    <viewingTemplate.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{viewingTemplate.title}</h2>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{viewingTemplate.category}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-foreground/40 uppercase mb-3">Template Description</h3>
                    <p className="text-foreground/70">{viewingTemplate.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-foreground/40 uppercase">Template Content</h3>
                      <button 
                        onClick={() => handleCopyContent(viewingTemplate.content)}
                        className="text-xs font-bold text-primary flex items-center space-x-1 hover:underline"
                      >
                        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? "Copied!" : "Copy Content"}</span>
                      </button>
                    </div>
                    <div className="bg-surface-light border border-border rounded-2xl p-6 font-sans leading-relaxed whitespace-pre-wrap text-sm text-foreground/90">
                      {viewingTemplate.content}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <button 
                      onClick={() => handleUseTemplate(viewingTemplate)}
                      className="flex-1 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Send className="w-5 h-5" />
                      <span>Use this Template</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteTemplate(viewingTemplate.id)}
                      className="p-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Create Template View */}
            {isCreateModalOpen && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-surface border border-border w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-6">Create New Template</h2>
                <form onSubmit={handleCreateTemplate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/60">Template Title</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g., Weekly Sync"
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                        className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/60">Category</label>
                      <select
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                        className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                      >
                        {templateCategories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60">Short Description</label>
                    <input
                      required
                      type="text"
                      placeholder="What is this template for?"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60">Email Content</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Write your email template content here... use [Name] for placeholders."
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                      className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="flex-1 py-4 rounded-xl font-bold border border-border hover:bg-surface-light transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-ai-gradient text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Save Template
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
