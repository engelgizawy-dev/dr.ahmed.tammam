"use client";

import React, { useState } from "react";

export default function CoursesHome() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State للتحكم في السايد بار
  const studentName = "عبدالعزيز خالد"; 

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen bg-[#050810] font-sans antialiased" dir="rtl">
      
      {/* 🚀 الجزء الأول: الهيدر العلوي (تصميم انسيابي حديث) */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* 1. البروفايل (زرار السايد بار) + الترحيب */}
        <div className="flex items-center gap-4">
          
          {/* زر البروفايل اللي بيفتح السايد بار */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#C8D749] to-emerald-600 p-[2px] cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            <div className="w-full h-full bg-[#050810] rounded-full flex items-center justify-center text-2xl group-hover:bg-opacity-90 transition-all">
              👨‍⚕️
            </div>
            {/* أيقونة همبرجر صغيرة توضح إنه بيفتح قايمة */}
            <div className="absolute -bottom-1 -left-1 bg-[#050810] border border-[#1A263D] rounded-full p-1.5 shadow-sm">
              <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
          </button>

          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-wide">
              مرحباً، <span className="text-[#C8D749]">{studentName}</span> 👋
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-gray-400 text-xs font-bold">ثانوية عامة 2026 • مستعد للتفوق</p>
            </div>
          </div>
        </div>

        {/* 2. شريط الأدوات المدمج (Pill Shape) */}
        <div className="flex items-center bg-[#0B1221] rounded-full p-1.5 border border-[#1A263D] shadow-sm" dir="ltr">
          
          {/* المحفظة */}
          <div className="flex items-center gap-2.5 pl-5 pr-4 py-2 border-r border-[#1A263D]">
            <span className="text-sm text-white font-black tracking-wide">0.00 <span className="text-[10px] text-gray-500">ج.م</span></span>
            <div className="w-7 h-7 rounded-full bg-[#C8D749]/10 text-[#C8D749] flex items-center justify-center text-sm">💰</div>
          </div>

          {/* الإشعارات */}
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute top-1.5 right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1221]"></span>
          </button>

          {/* الإضاءة */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 text-gray-400 hover:text-[#C8D749] transition-colors border-l border-[#1A263D]"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>

        </div>
      </div>

      {/* منطقة إثبات فكرة السايد بار (للتوضيح فقط) */}
      {isSidebarOpen && (
        <div className="w-full p-4 bg-[#C8D749]/10 border border-[#C8D749]/30 text-[#C8D749] rounded-xl text-sm font-bold text-center">
          ✅ السايد بار مفتوح دلوقتي! (هنبني محتواه بعدين)
        </div>
      )}

      {/* منطقة الكروت */}
      <div className="w-full h-48 border border-dashed border-[#1A263D] rounded-3xl flex items-center justify-center text-gray-600 font-bold text-sm">
        مكان كروت الكورسات
      </div>

    </div>
  );
}
