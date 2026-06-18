"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // 📋 مصفوفة أزرار السايد بار الكاملة والشاملة بالمسارات المظبوطة
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
      className="min-h-screen bg-[#030712] bg-gradient-to-br from-[#030712] via-[#0b1329] to-[#030712] text-gray-100 font-sans flex antialiased selection:bg-[#C8D749]/30 relative overflow-x-hidden"
    >
      
      {/* 🧭 السايد بار الثابت على اليمين بالشكل الزجاجي الاحترافي المطور */}
      <aside className="w-80 bg-white/[0.01] border-l border-white/[0.05] backdrop-blur-2xl flex flex-col justify-between p-6 sticky top-0 h-screen z-40 overflow-y-auto shadow-[20px_0_50px_rgba(0,0,0,0.4)] custom-scrollbar">
        
        <div className="space-y-8">
          {/* لوجو الهوية التعليمية لمنصة الدكتور أحمد تمام */}
          <div className="flex items-center gap-3 px-2 border-b border-white/[0.04] pb-5" dir="ltr">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8D749]/10 to-transparent border border-[#C8D749]/20 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(200,215,73,0.15)] drop-shadow-[0_0_10px_rgba(200,215,73,0.3)]">
              🧬
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Tammam</span>
              <span className="text-[9px] text-[#C8D749] font-bold tracking-widest uppercase mt-0.5 drop-shadow-[0_0_8px_rgba(200,215,73,0.2)]">Biology Society</span>
            </div>
          </div>

          {/* القائمة والروابط الذكية المحدثة بالخطوط الفخمة */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 border backdrop-blur-md ${
                    isActive
                      ? "bg-gradient-to-r from-[#C8D749] to-[#b5c43d] text-[#070B14] border-[#C8D749] shadow-[0_4px_20px_rgba(200,215,73,0.25)] font-black scale-[1.02]"
                      : "text-gray-400 border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.08]"
                  }`}
                >
                  <span className={`text-base transition-transform duration-300 ${isActive ? "scale-110 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" : ""}`}>{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* زر تسجيل الخروج الزجاجي التحذيري الفخم في أسفل السايد بار */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 mt-6 rounded-xl text-xs font-bold text-red-400 bg-red-500/[0.02] hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 shadow-sm hover:scale-[1.01] transition-all duration-300"
        >
          <span className="text-base">🚪</span>
          <span className="tracking-wide">تسجيل الخروج من الحساب</span>
        </button>
      </aside>

      {/* 🖥️ المحتوى التفاعلي الديناميكي المضاء هيدروليكياً خلف السايد بار */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        
        {/* إضاءات نيون جرافيكية زجاجية فخمة ومحسنة لتفتيح درجات الـ Dark UI */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-5%] left-[25%] w-[600px] h-[600px] bg-[#C8D749]/4 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px]"></div>
        </div>

        {/* عرض محتوى أي صفحة يتم الضغط عليها بخطوط مريحة ومنسقة */}
        <main className="relative z-10 p-8 md:p-12 flex-1 font-sans tracking-wide leading-relaxed">
          {children}
        </main>
      </div>

    </div>
  );
}
