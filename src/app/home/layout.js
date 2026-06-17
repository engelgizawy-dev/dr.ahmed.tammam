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
    <div dir="rtl" className="min-h-screen bg-[#070B14] text-gray-100 font-sans flex antialiased">
      
      {/* 🧭 السايد بار الثابت على اليمين بالشكل الزجاجي الاحترافي */}
      <aside className="w-80 bg-[#0D1524]/90 border-l border-white/5 backdrop-blur-xl flex flex-col justify-between p-6 sticky top-0 h-screen z-40 overflow-y-auto selection:bg-[#C8D749]/30">
        
        <div className="space-y-8">
          {/* لوجو الهوية التعليمية لمنصة الدكتور أحمد تمام */}
          <div className="flex items-center gap-3 px-2" dir="ltr">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8D749]/20 to-transparent border border-[#C8D749]/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(200,215,73,0.1)]">
              🧬
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-wide">Tammam</span>
              <span className="text-[10px] text-[#C8D749] font-bold tracking-widest uppercase">Biology Society</span>
            </div>
          </div>

          {/* القائمة والروابط الذكية */}
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black transition-all duration-300 border ${
                    isActive
                      ? "bg-[#C8D749] text-[#070B14] border-[#C8D749] shadow-[0_0_20px_rgba(200,215,73,0.15)] animate-none"
                      : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* زر تسجيل الخروج في أسفل السايد بار لتصفير الكوكيز */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 mt-6 rounded-xl text-xs font-black text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all duration-300"
        >
          <span className="text-base">🚪</span>
          <span>تسجيل الخروج من الحساب</span>
        </button>
      </aside>

      {/* 🖥️ المحتوى التفاعلي الديناميكي المضاء هيدروليكياً خلف السايد بار */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        
        {/* إضاءات نيون جرافيكية زجاجية فخمة */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#C8D749]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#0E5159]/15 rounded-full blur-[150px]"></div>
        </div>

        {/* عرض محتوى أي صفحة يتم الضغط عليها */}
        <div className="relative z-10 p-8 md:p-12 flex-1">
          {children}
        </div>
      </div>

    </div>
  );
}