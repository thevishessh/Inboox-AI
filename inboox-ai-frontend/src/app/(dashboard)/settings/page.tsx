"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User as UserIcon, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Zap, 
  CreditCard,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Download,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const tabs = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "preferences", label: "AI Preferences", icon: Zap },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // User State
  const [userData, setUserData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    role: "",
    company: "",
    avatarUrl: "",
    defaultTone: "Professional",
    aiModel: "Gemini 1.5 Pro (Recommended)",
    responseLength: "Medium",
    twoFactorEnabled: false,
    notifications: {
      weeklyUsage: true,
      writingTips: false,
      activity: true,
      announcements: true
    }
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/users/me");
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeTab === "profile") {
        await api.put("/users/profile", userData);
      } else {
        await api.put("/users/settings", userData);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNotificationToggle = (key: string) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [key]: !userData.notifications[key]
      }
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-foreground/50 font-medium">Loading your settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <input 
        type="file" 
        id="avatar-upload" 
        className="hidden" 
        accept="image/*" 
        onChange={handleAvatarChange} 
      />
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-foreground/50">Manage your account settings and AI preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground/50 hover:bg-surface-light hover:text-foreground"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surface border border-border rounded-2xl p-8 shadow-sm">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-6 pb-6 border-b border-border">
                <div className="w-24 h-24 rounded-full bg-ai-gradient p-1">
                  <div className="w-full h-full rounded-full bg-surface-light flex items-center justify-center border-4 border-surface overflow-hidden text-2xl font-bold text-primary">
                    {userData.avatarUrl ? (
                      <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex">
                        <span>{userData.firstName?.[0]}</span>
                        <span>{userData.lastName?.[0]}</span>
                        {(!userData.firstName && !userData.lastName) && <UserIcon className="w-10 h-10" />}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label 
                    htmlFor="avatar-upload"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all cursor-pointer inline-block"
                  >
                    Change Avatar
                  </label>
                  <p className="text-xs text-foreground/40 mt-2">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60">Professional Role</label>
                  <input
                    type="text"
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Product Manager"
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={userData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Inboox AI"
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/60">Bio</label>
                <textarea
                  rows={4}
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold">AI Generation Preferences</h3>
              <div className="space-y-4">
                {[
                  { 
                    id: "defaultTone", 
                    label: "Default Tone", 
                    value: userData.defaultTone, 
                    options: ["Professional", "Friendly", "Urgent", "Concise", "Empathetic", "Direct", "Sales-focused", "Academic"] 
                  },
                  { 
                    id: "aiModel", 
                    label: "AI Model", 
                    value: userData.aiModel, 
                    options: ["Gemini 1.5 Pro (Recommended)", "Gemini 1.5 Flash (Fastest)", "GPT-4o (Advanced)", "GPT-3.5 Turbo", "Claude 3.5 Sonnet"] 
                  },
                  { 
                    id: "responseLength", 
                    label: "Response Length", 
                    value: userData.responseLength, 
                    options: ["Super Short", "Short", "Medium", "Long", "Detailed (Step-by-Step)"] 
                  },
                ].map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-border bg-surface-light flex items-center justify-between">
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-xs text-foreground/40">Baseline for your responses.</div>
                    </div>
                    <select 
                      name={item.id}
                      value={item.value}
                      onChange={handleInputChange}
                      className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm outline-none"
                    >
                      {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Power User Tip</h4>
                  <p className="text-sm text-foreground/60 mt-1">
                    Your settings here will be used as the default starting point for all new email drafts.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { id: "weeklyUsage", label: "Weekly Usage Report", description: "Get a summary of your AI activity." },
                  { id: "writingTips", label: "AI Writing Tips", description: "Tips to improve your email prompts." },
                  { id: "activity", label: "Account Activity", description: "Security alerts and account updates." },
                  { id: "announcements", label: "New Feature Announcements", description: "Be the first to know about updates." },
                ].map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-border bg-surface-light flex items-center justify-between">
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-xs text-foreground/40">{item.description}</div>
                    </div>
                    <div 
                      onClick={() => handleNotificationToggle(item.id)}
                      className={cn(
                        "w-12 h-6 rounded-full relative transition-all cursor-pointer",
                        userData.notifications?.[item.id] ? "bg-primary" : "bg-foreground/20"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                        userData.notifications?.[item.id] ? "right-1" : "left-1"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold">Password & Security</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-12"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-bold mb-4">Two-Factor Authentication</h4>
                <div className="p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold">Protect your account</div>
                      <p className="text-xs text-foreground/40">Add an extra layer of security using your mobile device.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUserData({...userData, twoFactorEnabled: !userData.twoFactorEnabled})}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                      userData.twoFactorEnabled 
                        ? "bg-red-500 text-white hover:bg-red-600" 
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    {userData.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-ai-gradient p-[1px] rounded-2xl overflow-hidden shadow-lg shadow-primary/10">
                <div className="bg-surface p-6 rounded-[15px]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">Current Plan</span>
                      <h3 className="text-2xl font-bold">{userData.currentPlan}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {userData.currentPlan === "Free Tier" ? "$0" : userData.currentPlan === "Pro Professional" ? "$29" : "$99"}
                        <span className="text-sm font-normal text-foreground/40">/mo</span>
                      </div>
                      <div className={cn(
                        "text-xs font-bold",
                        userData.subscriptionStatus === "Active" ? "text-green-500" : "text-red-500"
                      )}>
                        {userData.subscriptionStatus}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-surface-light rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${(userData.usedCredits / userData.totalCredits) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold">{userData.usedCredits} / {userData.totalCredits} credits</span>
                  </div>
                  <p className="text-xs text-foreground/40 mt-2">Next billing date: {userData.nextBillingDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={async () => {
                    const res = await api.post("/users/billing/upgrade", { plan: "Pro Professional" });
                    setUserData(res.data);
                  }}
                  className="p-4 rounded-xl border border-border bg-surface-light hover:border-primary/50 transition-all text-left"
                >
                  <div className="font-bold text-primary">Upgrade to Pro</div>
                  <p className="text-xs text-foreground/40 mt-1">Get 1,000 credits/mo and advanced models.</p>
                </button>
                <button 
                  onClick={async () => {
                    const res = await api.post("/users/billing/upgrade", { plan: "Enterprise" });
                    setUserData(res.data);
                  }}
                  className="p-4 rounded-xl border border-border bg-surface-light hover:border-primary/50 transition-all text-left"
                >
                  <div className="font-bold text-primary">Go Enterprise</div>
                  <p className="text-xs text-foreground/40 mt-1">Unlimited credits and custom team support.</p>
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold">Payment Methods</h4>
                {userData.paymentMethod && (
                  <div className="p-4 rounded-xl border border-border bg-surface-light flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-surface border border-border rounded flex items-center justify-center">
                        <span className="text-[10px] font-bold">{userData.paymentMethod.type}</span>
                      </div>
                      <div>
                        <div className="font-bold">•••• •••• •••• {userData.paymentMethod.last4}</div>
                        <div className="text-xs text-foreground/40">Expires {userData.paymentMethod.expiry}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-foreground/30 hover:text-foreground transition-colors">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-foreground/30 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                <button className="w-full py-3 rounded-xl border border-dashed border-border text-foreground/40 hover:text-foreground hover:border-primary/50 transition-all flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-bold">Add Payment Method</span>
                </button>
              </div>

              <div>
                <h4 className="font-bold mb-4">Billing History</h4>
                <div className="space-y-2">
                  {[
                    { id: "#INV-2026-001", date: "Apr 25, 2026", amount: "$29.00", status: "Paid" },
                    { id: "#INV-2026-002", date: "Mar 25, 2026", amount: "$29.00", status: "Paid" },
                  ].map((inv) => (
                    <div key={inv.id} className="p-4 rounded-xl bg-surface-light flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-surface border border-border">
                          <Download className="w-4 h-4 text-foreground/40" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{inv.id}</div>
                          <div className="text-xs text-foreground/40">{inv.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-sm font-bold">{inv.amount}</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-500 text-sm font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Changes saved successfully!</span>
                </motion.div>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
