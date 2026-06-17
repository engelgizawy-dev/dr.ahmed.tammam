"use client";

import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div 
      dir="rtl" 
      className="min-h-screen bg-[#070B14] text-gray-100 font-sans relative overflow-x-hidden antialiased selection:bg-[#C8D749]/30 selection:text-white"
    >
      
      {/* 🧬 Navbar 🧬 */}
      <nav className="w-full bg-[#070B14]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center" dir="ltr">
          
          {/* الأزرار السريعة للدخول في النوفبار */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-xl text-xs font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] transition-all"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Register
            </Link>
          </div>

          {/* اللوجو والبراندينج */}
          <div className="flex items-center gap-2 cursor-pointer" dir="rtl">
            <div className="flex flex-col text-right">
              <span className="text-xl font-black text-white leading-none tracking-wide">Tammam</span>
              <span className="text-[9px] text-[#C8D749] font-bold tracking-widest uppercase mt-0.5">Biology Society</span>
            </div>
            <svg className="w-7 h-7 text-[#C8D749]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div> 

        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-6 overflow-hidden">
        
        {/* الدوائر الزجاجية المشعة في الخلفية */}
        <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-[#C8D749]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full border border-[#C8D749]"></div>
          <div className="absolute top-[30%] right-[15%] w-1 h-1 rounded-full bg-[#C8D749]"></div>
          <div className="absolute bottom-[20%] left-[20%] w-3 h-3 rounded-full border border-gray-500"></div>
          <div className="absolute top-[50%] right-[30%] w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#C8D749_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.02]"></div>
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight" dir="ltr">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Biology </span>
            <span className="text-[#C8D749] drop-shadow-[0_0_20px_rgba(200,215,73,0.2)]">Society</span>
          </h1>
          
          <div className="w-full max-w-sm flex items-center justify-center gap-4 my-2">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <div className="w-2 h-2 rotate-45 bg-[#C8D749]"></div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>

          <h2 className="text-xl md:text-3xl font-black text-white mb-1">
            منصة هتحببك وتميزك في الأحياء
          </h2>
          <p className="text-lg md:text-xl font-bold text-[#C8D749] mb-4">
            مع د/ أحمد تمام
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md justify-center">
            <Link 
              href="/login" 
              className="px-10 py-3.5 rounded-xl text-sm font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(200,215,73,0.2)] text-center"
            >
              تسجيل الدخول للمنصة 🔐
            </Link>
            <Link 
              href="/signup" 
              className="px-10 py-3.5 rounded-xl text-sm font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-center"
            >
              إنشاء حساب جديد ✨
            </Link>
          </div>
          
          <div className="mt-12 animate-bounce text-gray-600 opacity-40">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ================= WHY DOCTOR SECTION ================= */}
      <section className="relative bg-[#0A111F]/90 pt-20 pb-16 px-6 border-t border-white/5 overflow-hidden">
        
        <div className="absolute bottom-[-5%] left-[5%] text-[10rem] font-black text-white/[0.01] select-none pointer-events-none" dir="ltr">
          Society
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl md:text-6xl font-black text-white">
                ليه دكتور <span className="text-[#C8D749]">أحمد تمام</span>؟
              </h2>
            </div>

            <p className="text-sm md:text-lg text-gray-400 leading-relaxed font-medium">
              لأن طلبة كتير بتواجه صعوبة في فهم الأحياء وحل المسائل الاستنتاجية،
              وفرنا لك في منصة تمام كل الأدوات والأساليب الذكية لتبسيط المادة وجعلها 
              <span className="text-[#C8D749] font-bold"> بسيطة ومُمتعة</span> بنظام متابعة وامتحانات دورية يضمن لك التقفيل التام للدرجات.
            </p>

            <Link 
              href="/signup" 
              className="inline-block mt-2 px-8 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 text-red-400 hover:from-red-500 hover:text-[#070B14] transition-all duration-300 shadow-xl"
            >
              ابدأ رحلتك التعليمية الآن 🚀
            </Link>
          </div>

          {/* الصورة برستيج فخم داخل كارت زجاجي محمي */}
          <div className="relative h-full min-h-[350px] flex items-center justify-center z-10">
            <div className="p-4 rounded-3xl bg-[#0D1524]/40 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden flex items-center justify-center">
              <img 
                src="https://i.ibb.co/cKyCDSS2/dr-ahmed.jpg" 
                alt="د. أحمد تمام" 
                className="w-full max-w-[320px] rounded-2xl object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                onError={(e) => { 
                  e.currentTarget.src = 'https://via.placeholder.com/400x500/0D1524/C8D749?text=Doctor+Ahmed'; 
                }}
                crossOrigin="anonymous"
              />
            </div>
            
            <div className="absolute top-[15%] right-[10%] text-[#C8D749]/10 text-4xl animate-pulse z-0">🧬</div>
            <div className="absolute bottom-[15%] left-[10%] text-white/[0.03] text-5xl z-0 -rotate-12">🔬</div>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-[#070B14] py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-3">ليه تختار <span className="text-[#C8D749]">نظامنا الذكي؟</span></h2>
            <div className="w-16 h-1 bg-[#C8D749] mx-auto rounded-full"></div>
          </div>

          {/* الكروت الزجاجية الشفافة الفخمة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "الفهم العميق", desc: "ربط المعلومات بأفكار استنتاجية لتسهيل وتثبيت الحل." },
              { title: "الحفظ المتقن", desc: "تكرار منظم ومربوط بالخرائط الذهنية لعدم النسيان أبداً." },
              { title: "مراجعة دورية", desc: "امتحانات مستمرة وتقارير فورية لتحديد نقاط الضعف وعلاجها." },
              { title: "حل مكثف", desc: "تغطية كاملة وحل آلاف الأسئلة والأفكار المتنوعة من كتاب المايسترو." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-sm hover:border-[#C8D749]/30 transition-all group shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#C8D749]/10 flex items-center justify-center text-[#C8D749] font-mono font-black text-xs mb-5 group-hover:bg-[#C8D749] group-hover:text-[#070B14] transition-colors">
                  0{i+1}
                </div>
                <h3 className="text-base font-black text-white mb-2 group-hover:text-[#C8D749] transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLEAN MINIMAL FOOTER ================= */}
      <footer className="bg-[#070B14] pt-16 pb-8 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <div className="mb-8 flex flex-col items-center">
             <div className="flex items-center gap-2 opacity-90">
                <span className="text-2xl font-black text-white tracking-wider" dir="ltr">
                  Tammam <span className="text-[#C8D749] text-sm font-bold">SOCIETY</span>
                </span>
                <svg className="w-6 h-6 text-[#C8D749]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
             </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8"></div>

          {/* البصمة الإمبراطورية الخاصة بـ Elgizawy و GIZA-TECH */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm text-gray-500 font-mono mb-6" dir="ltr">
            <span>&lt; Developed By</span>
            <span className="font-bold text-white bg-white/5 px-2.5 py-0.5 rounded border border-white/10 text-[#C8D749]">Elgizawy 👑</span>
            <span>/&gt;</span>
            <span className="mx-2 text-gray-700">|</span>
            <span>All Rights Reserved @2026</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-600 text-[10px] tracking-widest uppercase font-bold">Powered By</span>
            <span className="text-white/40 font-black text-sm tracking-[0.25em]" dir="ltr">GIZA-TECH</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
