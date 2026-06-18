"use client";

import React, { useState } from "react";

export default function TopHeader() {
  // 🌓 State للتحكم في الوضع الليلي والنهاري (الافتراضي ليلي)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 🎨 متغيرات الألوان الديناميكية بناءً على الوضع
  const theme = {
    bg: isDarkMode ? "bg-[#050810]" : "bg-[#F3F4F6]", // خلفية الصفحة
    headerBg: isDarkMode ? "bg-[#0B1221]" : "bg-white", // خلفية العناصر
    borderColor: isDarkMode ? "border-[#1A263D]" : "border-gray-200",
    textMain: isDarkMode ? "text-white" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-400" : "text-gray-500",
    iconHover: isDarkMode ? "hover:text-white hover:bg-[#1A263D]" : "hover:text-gray-900 hover:bg-gray-100",
  };

  return (
    // حاوية الصفحة بالكامل (بتتأثر بالوضع الليلي والنهاري بنعومة)
    <div 
      dir="rtl" 
      className={`min-h-screen p-4 md:p-6 transition-colors duration-500 ease-in-out ${theme.bg} font-sans antialiased`}
    >
      
      {/* 🚀 الهيدر العلوي */}
      <div className="w-full flex justify-between items-center">
        
        {/* 🟢 القسم الأيمن: (الهامبرجر + البروفايل + اسم المستر) */}
        <div className="flex items-center gap-3">
          
          {/* 1. زرار الهامبرجر ☰ (أقصى اليمين) */}
          <button 
            className={`w-11 h-11 rounded-xl border ${theme.headerBg} ${theme.borderColor} flex items-center justify-center text-gray-500 ${theme.iconHover} transition-all shadow-sm`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* 2. أيقونة بروفايل الطالب */}
          <div className={`w-11 h-11 rounded-full border-2 border-[#C8D749] p-[2px] cursor-pointer hover:scale-105 transition-transform`}>
            <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-xl overflow-hidden">
              👨‍🎓
            </div>
          </div>

          {/* 3. اسم المستر وأيقونة الأحياء */}
          <div className="flex flex-col justify-center mr-1">
            <div className="flex items-center gap-1.5">
              <h1 className={`text-lg font-black tracking-wide ${theme.textMain}`}>
                د. أحمد تمام
              </h1>
              <span className="text-xl drop-shadow-md">🧬</span>
            </div>
            <p className={`text-[10px] font-bold tracking-widest ${theme.textSub}`}>
              BIOLOGY SOCIETY
            </p>
          </div>

        </div>

        {/* 🟣 القسم الأيسر: شريط الأدوات المدمج (Pill Shape) */}
        <div className={`flex items-center rounded-full border ${theme.headerBg} ${theme.borderColor} shadow-sm h-11`} dir="rtl">
          
          {/* 1. الرصيد والمحفظة */}
          <div className={`flex items-center gap-2 pl-4 pr-5 h-full border-l ${theme.borderColor}`}>
            <span className={`text-sm font-black tracking-wide ${theme.textMain}`}>
              0.00 <span className={`text-[10px] ${theme.textSub}`}>ج.م</span>
            </span>
            <div className="w-6 h-6 rounded-full bg-[#C8D749]/10 text-[#C8D749] flex items-center justify-center text-xs">
              💰
            </div>
          </div>

          {/* 2. الإشعارات */}
          <button className={`w-12 h-full flex items-center justify-center border-l ${theme.borderColor} text-gray-400 ${theme.iconHover} transition-colors relative`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-transparent"></span>
          </button>

          {/* 3. زر تبديل الوضع الليلي والنهاري (بيغير الـ State) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-full rounded-l-full flex items-center justify-center text-gray-400 ${theme.iconHover} transition-colors`}
          >
            {isDarkMode ? (
              // أيقونة الشمس (تظهر في الوضع الليلي عشان تقلب للنهاري)
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              // أيقونة القمر (تظهر في الوضع النهاري عشان تقلب لليلي)
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>

        </div>
      </div>

    </div>
  );
}
