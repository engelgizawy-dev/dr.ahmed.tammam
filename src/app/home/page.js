"use client";

import React, { useState } from "react";

export default function CoursesHome() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const studentName = "عبدالعزيز خالد"; // هيتم ربطه بالـ LocalStorage لاحقاً

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen bg-[#070B14] font-sans antialiased" dir="rtl">
      
      {/* 🚀 الجزء الأول: الهيدر العلوي */}
      <div className="w-full bg-[#0D1524] border border-[#1A263D] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        
        {/* 1. الترحيب والتاج */}
        <div className="flex items-center gap-4">
          <div className="bg-[#C8D749]/10 border border-[#C8D749]/20 px-3 py-1.5 rounded-lg text-[11px] font-black text-[#C8D749] tracking-wide">
            ثانوية عامة 2026
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-white">
              مرحباً يا دكتور، <span className="text-[#C8D749]">{studentName}</span> 👋
            </h1>
            <p className="text-gray-400 text-xs mt-1 font-bold">جاهز لتقفيل الأحياء؟ اختر الكورس الخاص بك.</p>
          </div>
        </div>

        {/* 2. أدوات الطالب (محفظة، إضاءة، إشعارات، بروفايل) */}
        <div className="flex items-center gap-3" dir="ltr">
          
          {/* البروفايل */}
          <div className="w-10 h-10 rounded-xl bg-[#1A263D] border border-[#2A3B5C] flex items-center justify-center text-lg cursor-pointer hover:bg-[#2A3B5C] transition-colors">
            👨‍⚕️
          </div>

          {/* الإشعارات */}
          <button className="w-10 h-10 rounded-xl bg-[#070B14] border border-[#1A263D] text-gray-400 flex items-center justify-center text-lg relative hover:text-white transition-colors">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#070B14]"></span>
          </button>

          {/* زر تبديل الإضاءة (تصميم نظيف بدون أنيميشن معقد) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center p-1 rounded-xl bg-[#070B14] border border-[#1A263D] cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isDarkMode ? "bg-[#1A263D] text-white" : "text-gray-500"}`}>🌙</div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${!isDarkMode ? "bg-[#C8D749] text-[#070B14]" : "text-gray-500"}`}>☀️</div>
          </button>

          {/* المحفظة */}
          <div className="bg-[#070B14] border border-[#1A263D] pl-3 pr-2 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-xs text-gray-300 font-black">0.00 ج.م</span>
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs">💰</div>
          </div>

        </div>
      </div>

      {/* منطقة الكروت (هنبنيها في الخطوة الجاية) */}
      <div className="w-full h-64 border-2 border-dashed border-[#1A263D] rounded-2xl flex items-center justify-center text-gray-500 font-bold text-sm">
        مكان كروت الكورسات (في انتظار اعتماد الهيدر)
      </div>

    </div>
  );
}
