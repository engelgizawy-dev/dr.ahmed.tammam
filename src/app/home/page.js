"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 🎨 ألوان المنصة المستوحاة من الصورة بالملي
  const theme = {
    bg: isDarkMode ? "bg-[#0A111E]" : "bg-[#F8FAFC]",
    headerBg: isDarkMode ? "bg-[#0A111E]" : "bg-white",
    borderColor: isDarkMode ? "border-[#1E293B]" : "border-gray-200",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    iconColor: isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900",
    walletBg: "bg-white text-gray-900", // المحفظة دايماً بيضا زي الصورة
    walletIconBg: "bg-[#1E293B] text-white", // الأيقونة جوه المحفظة دايماً غامقة
  };

  const sidebarItems = [
    { id: "home", label: "الصفحة الرئيسية", icon: <HomeIcon />, path: "/home" },
    { id: "profile", label: "حسابي", icon: <UserIcon />, path: "/dashboard" },
    { id: "subscriptions", label: "اشتراكاتي", icon: <PlayIcon />, path: "/subscriptions" },
    { id: "wallet", label: "رصيدي", icon: <WalletIcon />, path: "/wallet" },
  ];

  return (
    <div dir="rtl" className={`min-h-screen transition-colors duration-300 ${theme.bg} font-sans antialiased`}>
      
      {/* ========================================= */}
      {/* 🚀 الهيدر الاحترافي (نسخة طبق الأصل من الصورة) */}
      {/* ========================================= */}
      <header className={`w-full h-[72px] flex items-center justify-between px-6 lg:px-8 ${theme.headerBg} border-b ${theme.borderColor} sticky top-0 z-30`}>
        
        {/* 🟢 القسم الأيمن (توزيع العناصر من اليمين لليسار زي الصورة) */}
        <div className="flex items-center gap-5 md:gap-6">
          
          {/* 1. زرار الهامبرجر ☰ */}
          <button onClick={() => setIsSidebarOpen(true)} className={`${theme.iconColor} transition-colors`}>
            <MenuIcon />
          </button>

          {/* 2. البروفايل */}
          <button className={`w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden`}>
            <UserSolidIcon />
          </button>

          {/* 3. الإشعارات (مع النقطة الحمراء) */}
          <button className={`relative ${theme.iconColor} transition-colors`}>
            <BellIcon />
            <span className="absolute top-0.5 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 4. الرصيد والمحفظة (الكبسولة البيضاء) */}
          <div className={`hidden md:flex items-center rounded-full ${theme.walletBg} h-9 pl-1 pr-4 shadow-sm`}>
            <div className={`w-7 h-7 rounded-full ${theme.walletIconBg} flex items-center justify-center ml-2`}>
              <WalletIconSmall />
            </div>
            <span className="text-[13px] font-black tracking-wide">
              0 <span className="text-[11px] font-bold text-gray-600">جنيه</span>
            </span>
          </div>

          {/* 5. زر البحث */}
          <button className={`${theme.iconColor} transition-colors hidden sm:block`}>
            <SearchIcon />
          </button>

        </div>

        {/* 🔵 القسم الأيسر (اللوجو وزرار الإضاءة) */}
        <div className="flex items-center gap-6" dir="ltr">
          
          {/* Toggle Button (الليل/النهار زي الصورة بالظبط) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${isDarkMode ? "bg-[#334155]" : "bg-gray-300"}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}>
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </div>
          </button>

          {/* اللوجو (Tammam BIOLOGY) */}
          <div className="flex flex-col items-start leading-tight mt-1">
            <h1 className={`text-xl font-black ${theme.textMain} tracking-wide`}>
              Tammam
            </h1>
            <span className="text-[#C8D749] text-[9px] font-black tracking-[0.15em] uppercase">
              BIOLOGY
            </span>
          </div>

        </div>
      </header>

      {/* ========================================= */}
      {/* 🌑 السايد بار (القائمة الجانبية) */}
      {/* ========================================= */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside 
        className={`fixed top-0 right-0 h-screen w-[280px] ${theme.headerBg} border-l ${theme.borderColor} flex flex-col p-6 z-50 transform transition-transform duration-300 shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className={`flex items-center justify-between border-b ${theme.borderColor} pb-6 mb-6`}>
          <h2 className={`text-xl font-black ${theme.textMain}`}>القائمة الرئيسية</h2>
          <button onClick={() => setIsSidebarOpen(false)} className={`${theme.iconColor}`}>
            <CloseIcon />
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
                    ? "bg-[#C8D749] text-[#0A111E]"
                    : `text-gray-400 hover:${theme.textMain} hover:bg-white/5`
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ========================================= */}
      {/* 🖥️ منطقة المحتوى */}
      {/* ========================================= */}
      <main className="relative z-10 p-6 lg:p-10 flex-1">
        {children}
      </main>

    </div>
  );
}

// ==========================================
// 🎨 SVG Icons Components (أيقونات احترافية)
// ==========================================

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const UserSolidIcon = () => (
  <svg className="w-5 h-5 mt-1" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.75a6 6 0 00-6-6v-.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const WalletIconSmall = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h3.75A2.25 2.25 0 0121 6v6zM21 15v-3m0 3a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V9a2.25 2.25 0 012.25-2.25H15a3 3 0 110 6h3.75A2.25 2.25 0 0121 15z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4 text-[#0A111E]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// أيقونات السايد بار
const HomeIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
const UserIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const PlayIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>;
const WalletIcon = () => <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h3.75A2.25 2.25 0 0121 6v6zM21 15v-3m0 3a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V9a2.25 2.25 0 012.25-2.25H15a3 3 0 110 6h3.75A2.25 2.25 0 0121 15z" /></svg>;
