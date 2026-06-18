"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // مصفوفة السايد بار
  const sidebarItems = [
    { id: "home", label: "الصفحة الرئيسية", path: "/home" },
    { id: "profile", label: "حسابي", path: "/dashboard" },
    { id: "subscriptions", label: "اشتراكاتي", path: "/subscriptions" },
    { id: "wallet", label: "رصيدي", path: "/wallet" },
  ];

  return (
    // خلفية الصفحة بالكامل لونها كحلي غامق جداً زي الصورة
    <div className="min-h-screen bg-[#0A0F1A] font-sans antialiased text-white">
      
      {/* ========================================= */}
      {/* 🚀 الهيدر (نسخة كربونية من الصورة image_faad64.png) */}
      {/* ========================================= */}
      <header className="w-full h-[72px] flex items-center justify-between px-6 lg:px-8 bg-[#0A0F1A] border-b border-white/5 sticky top-0 z-30" dir="ltr">
        
        {/* 🔵 القسم الأيسر: زرار الإضاءة + اللوجو */}
        <div className="flex items-center gap-5">
          
          {/* زر التبديل (Toggle Switch) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-12 h-[26px] bg-[#334155] rounded-full flex items-center relative transition-colors cursor-pointer"
          >
            <div className={`w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center absolute transition-all duration-300 ${isDarkMode ? "right-[2px]" : "left-[2px]"}`}>
              {isDarkMode ? (
                <MoonIcon className="w-3.5 h-3.5 text-[#0A0F1A]" />
              ) : (
                <SunIcon className="w-3.5 h-3.5 text-amber-500" />
              )}
            </div>
          </button>

          {/* اللوجو (Tammam BIOLOGY) */}
          <div className="flex flex-col cursor-pointer mt-0.5">
            <span className="text-xl font-bold text-white tracking-wide leading-none">Tammam</span>
            <span className="text-[#C8D749] text-[9px] font-black tracking-[0.2em] uppercase leading-tight mt-0.5">BIOLOGY</span>
          </div>

        </div>

        {/* 🟢 القسم الأيمن: أدوات المستخدم */}
        <div className="flex items-center gap-6">
          
          {/* 1. أيقونة البحث */}
          <button className="text-gray-400 hover:text-white transition-colors">
            <SearchIcon className="w-[18px] h-[18px]" />
          </button>

          {/* 2. المحفظة (الكبسولة البيضاء) */}
          <div className="flex items-center bg-white rounded-full h-[32px] pl-3 pr-1 gap-2 cursor-pointer shadow-sm" dir="rtl">
            <div className="w-[26px] h-[26px] bg-[#1E293B] rounded-full flex items-center justify-center shrink-0">
              <WalletIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-900 font-black text-[13px] ml-1 mt-0.5">
              0 <span className="text-[10px] font-bold text-gray-500">جنيه</span>
            </span>
          </div>

          {/* 3. الإشعارات (مع النقطة الحمراء) */}
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-[6px] h-[6px] bg-red-500 rounded-full border border-[#0A0F1A]"></span>
          </button>

          {/* 4. البروفايل */}
          <button className="w-8 h-8 bg-[#E2E8F0] rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors">
            <UserIcon className="w-[18px] h-[18px]" />
          </button>

          {/* 5. زر القائمة (الهامبرجر) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition-colors ml-1"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

        </div>

      </header>

      {/* ========================================= */}
      {/* 🌑 السايد بار (Drawer) */}
      {/* ========================================= */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside 
        dir="rtl"
        className={`fixed top-0 right-0 h-screen w-[280px] bg-[#0A0F1A] border-l border-white/5 flex flex-col p-6 z-50 transform transition-transform duration-300 shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
          <h2 className="text-xl font-bold text-white">القائمة الرئيسية</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#C8D749] text-[#0A0F1A]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ========================================= */}
      {/* 🖥️ منطقة المحتوى */}
      {/* ========================================= */}
      <main className="relative z-10 p-6 lg:p-8 flex-1" dir="rtl">
        {children}
      </main>

    </div>
  );
}

// ==========================================
// 🎨 SVG Icons (مطابقة للصورة بالملي)
// ==========================================

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const WalletIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h3.75A2.25 2.25 0 0121 6v6zM21 15v-3m0 3a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V9a2.25 2.25 0 012.25-2.25H15a3 3 0 110 6h3.75A2.25 2.25 0 0121 15z" />
  </svg>
);

const BellIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.75a6 6 0 00-6-6v-.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
