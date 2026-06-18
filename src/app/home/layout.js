"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 🎛️ State للتحكم في فتح وقفل السايد بار
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 📋 مصفوفة أزرار السايد بار الكاملة
  const sidebarItems = [
    { id: "home", label: "الصفحة الرئيسية (الكورسات)", icon: "📚", path: "/home" },
    { id: "profile", label: "حسابي (الملف الشخصي)", icon: "👤", path: "/dashboard" },
    { id: "homework-results", label: "نتائج الواجبات", icon: "📝", path: "/homework-results" },
    { id: "exam-results", label: "نتائج الامتحانات", icon: "📊", path: "/exam-results" },
    { id: "academic-support", label: "الدعم العلمي (الأسئلة)", icon: "🧪", path: "/academic-support" },
    { id: "tech-support", label: "الدعم الفني والشكاوى", icon: "🛠️", path: "/tech-support" },
    { id: "wallet", label: "رصيدي المحفظة", icon: "💰", path: "/wallet" },
    { id: "subscriptions", label: "اشتراكاتي الفعالة", icon: "🔑", path: "/subscriptions" },
    { id: "center-id", label: "ربط ID السنتر", icon: "🪪", path: "/center-id" },
    { id: "forum", label: "منتدى الطلاب", icon: "💬", path: "/forum" },
  ];

  const handleLogout = () => {
    // 🗑️ مسح كوكيز الجلسة فوراً لضمان الحظر الأمني للمتسللين
    document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div 
      dir="rtl" 
      className="min-h-screen bg-[#050810] text-gray-100 font-sans flex antialiased selection:bg-[#C8D749]/30 relative overflow-x-hidden"
    >
      
      {/* 🍔 زرار الهامبرجر (الثلاث شرايط) لفتح السايد بار */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-6 right-6 z-30 w-12 h-12 rounded-xl bg-[#0B1221] border border-[#1A263D] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1A263D] shadow-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* 🌑 الخلفية المظلمة (Overlay) اللي بتظهر ورا السايد بار عشان تقفله لما تدوس بره */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer"
        />
      )}

      {/* 🧭 السايد بار (Drawer) المخفي اللي بيسحب من اليمين */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-80 bg-[#0B1221] border-l border-[#1A263D] flex flex-col justify-between p-6 z-50 transform transition-transform duration-300 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-8">
          
          {/* لوجو الهوية + زرار الإغلاق */}
          <div className="flex items-center justify-between border-b border-[#1A263D] pb-5">
            <div className="flex items-center gap-3" dir="ltr">
              <div className="w-10 h-10 rounded-xl bg-[#C8D749]/10 border border-[#C8D749]/20 flex items-center justify-center text-xl">
                🧬
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-wide">Tammam</span>
                <span className="text-[9px] text-[#C8D749] font-bold tracking-widest uppercase mt-0.5">Biology Society</span>
              </div>
            </div>
            
            {/* زرار الإغلاق X */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 rounded-lg bg-[#050810] border border-[#1A263D] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* القائمة والروابط الذكية */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    setIsSidebarOpen(false); // يقفل السايد بار تلقائي بعد ما يختار صفحة
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-[#C8D749] text-[#070B14] border-[#C8D749] shadow-sm font-black"
                      : "text-gray-400 border-transparent hover:bg-[#1A263D] hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* زر تسجيل الخروج في أسفل السايد بار */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 mt-6 rounded-xl text-xs font-bold text-red-400 bg-[#050810] border border-[#1A263D] hover:bg-red-500/10 hover:border-red-500/20 transition-colors"
        >
          <span className="text-base">🚪</span>
          <span className="tracking-wide">تسجيل الخروج من الحساب</span>
        </button>
      </aside>

      {/* 🖥️ المحتوى التفاعلي الديناميكي */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        <main className="relative z-10 flex-1 font-sans tracking-wide leading-relaxed">
          {/* هنسيب المساحة العلوية فاضية شوية عشان زرار الهامبرجر ميغطيش على محتوى الصفحات */}
          <div className="pt-24 md:pt-10">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
