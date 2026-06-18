"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // 🎛️ States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 🎨 متغيرات الألوان التفاعلية (الليل/النهار)
  const theme = {
    bg: isDarkMode ? "bg-[#030712]" : "bg-[#F3F5F9]", 
    cardBg: isDarkMode ? "bg-[#0B1329]" : "bg-white", 
    borderColor: isDarkMode ? "border-white/5" : "border-gray-200",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-400" : "text-gray-500",
    iconHover: isDarkMode ? "hover:text-white hover:bg-white/5" : "hover:text-gray-900 hover:bg-gray-100",
    shadow: isDarkMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
  };

  // 📋 مصفوفة السايد بار
  const sidebarItems = [
    { id: "home", label: "الصفحة الرئيسية", icon: "📚", path: "/home" },
    { id: "profile", label: "الملف الشخصي", icon: "👤", path: "/dashboard" },
    { id: "homework-results", label: "نتائج الواجبات", icon: "📝", path: "/homework-results" },
    { id: "exam-results", label: "نتائج الامتحانات", icon: "📊", path: "/exam-results" },
    { id: "academic-support", label: "الدعم العلمي", icon: "🧪", path: "/academic-support" },
    { id: "tech-support", label: "الدعم الفني", icon: "🛠️", path: "/tech-support" },
  ];

  const handleLogout = () => {
    document.cookie = "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div 
      dir="rtl" 
      className={`min-h-screen transition-colors duration-500 ease-in-out ${theme.bg} font-sans antialiased relative overflow-x-hidden`}
    >
      {/* ========================================= */}
      {/* 🚀 الهيدر العلوي */}
      {/* ========================================= */}
      <header className="w-full flex items-center justify-between p-6 md:px-10 md:py-8 relative z-20">
        
        {/* 🟢 القسم الأيمن: زرار الهامبرجر + البروفايل */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className={`w-14 h-14 rounded-2xl border ${theme.cardBg} ${theme.borderColor} flex items-center justify-center text-gray-500 ${theme.iconHover} transition-all shadow-sm`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div className="w-14 h-14 rounded-full border-[3px] border-[#C8D749] p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg relative">
            <div className={`w-full h-full ${isDarkMode ? 'bg-[#030712]' : 'bg-gray-100'} rounded-full flex items-center justify-center text-2xl overflow-hidden`}>
              👨‍🎓
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>

        {/* 🟣 القسم الأوسط: شريط الأدوات (Pill Shape) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className={`flex items-center rounded-full border ${theme.cardBg} ${theme.borderColor} ${theme.shadow} h-14`} dir="rtl">
            <div className={`flex items-center gap-3 pl-6 pr-6 h-full border-l ${theme.borderColor}`}>
              <span className={`text-base font-black tracking-wide ${theme.textMain}`}>
                0.00 <span className={`text-[11px] ${theme.textSub}`}>ج.م</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-[#C8D749]/15 text-[#C8D749] flex items-center justify-center text-sm shadow-inner">
                💰
              </div>
            </div>

            <button className={`w-16 h-full flex items-center justify-center border-l ${theme.borderColor} text-gray-400 ${theme.iconHover} transition-colors relative`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-3.5 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-transparent animate-pulse"></span>
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-16 h-full rounded-l-full flex items-center justify-center text-gray-400 ${theme.iconHover} transition-colors`}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-amber-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-indigo-600 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* 🔵 القسم الأيسر: اسم المستر */}
        <div className="flex-shrink-0 mr-auto text-left pl-2 flex flex-col justify-center items-start" dir="ltr">
          <h1 className={`text-4xl md:text-5xl font-black italic font-serif tracking-tighter ${theme.textMain} drop-shadow-sm`}>
            Dr. Tammam
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[#C8D749] text-xs font-bold tracking-[0.2em] uppercase">Biology Society</span>
            <span className="text-sm">🧬</span>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* 🌑 السايد بار (Drawer الجانبي) */}
      {/* ========================================= */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      <aside 
        className={`fixed top-0 right-0 h-screen w-[320px] ${theme.cardBg} border-l ${theme.borderColor} flex flex-col justify-between p-6 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className={`flex items-center justify-between border-b ${theme.borderColor} pb-6`}>
            <div className="flex items-center gap-3" dir="ltr">
              <div className="w-12 h-12 rounded-xl bg-[#C8D749]/10 border border-[#C8D749]/20 flex items-center justify-center text-2xl">
                🧬
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black ${theme.textMain} tracking-wide font-serif italic`}>Tammam</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-10 h-10 rounded-xl border ${theme.borderColor} ${theme.textSub} ${theme.iconHover} flex items-center justify-center transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <nav className="space-y-2.5">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm transition-all duration-200 border ${
                    isActive
                      ? "bg-[#C8D749] text-[#030712] border-[#C8D749] font-black shadow-md scale-[1.02]"
                      : `border-transparent ${theme.textSub} ${theme.iconHover} font-bold`
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-4 px-5 py-4 mt-6 rounded-xl text-sm font-bold text-red-500 border ${theme.borderColor} hover:bg-red-500/10 hover:border-red-500/30 transition-colors`}
        >
          <span className="text-xl">🚪</span>
          <span className="tracking-wide">تسجيل الخروج</span>
        </button>
      </aside>

      {/* ========================================= */}
      {/* 🖥️ منطقة المحتوى */}
      {/* ========================================= */}
      <main className="relative z-10 px-6 md:px-10 pb-10 flex-1 font-sans tracking-wide leading-relaxed">
        {children}
      </main>

    </div>
  );
}
