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
      <nav className="w-full bg-[#070B14] border-b border-white/5 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center" dir="ltr">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none tracking-wide">Tammam</span>
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Biology Society</span>
            </div>
          </div>
          <div></div> 
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-10 overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full border border-[#C8D749]"></div>
          <div className="absolute top-[30%] right-[15%] w-1 h-1 rounded-full bg-[#C8D749]"></div>
          <div className="absolute bottom-[20%] left-[20%] w-3 h-3 rounded-full border border-gray-500"></div>
          <div className="absolute top-[50%] right-[30%] w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#C8D749_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.03]"></div>
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight" dir="ltr">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Biology </span>
            <span className="text-[#C8D749] drop-shadow-[0_0_20px_rgba(200,215,73,0.2)]">Society</span>
          </h1>
          
          <div className="w-full max-w-lg flex items-center justify-center gap-4 my-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0E5159]"></div>
            <div className="w-3 h-3 rotate-45 bg-[#0E5159]"></div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0E5159]"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            منصة هتحببك وتميزك في الأحياء
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#C8D749] mb-8">
            مع د/ أحمد تمام
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <Link 
              href="/login" 
              className="px-12 py-4 rounded-xl text-xl font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(200,215,73,0.3)]"
            >
              تسجيل الدخول
            </Link>
            <Link 
              href="/signup" 
              className="px-12 py-4 rounded-xl text-xl font-bold bg-transparent border border-[#0E5159] text-white hover:bg-[#0E5159]/20 transition-all duration-300"
            >
              إنشاء حساب جديد
            </Link>
          </div>
          
          <div className="mt-16 animate-bounce text-[#0E5159] opacity-50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ================= WHY DOCTOR SECTION ================= */}
      <section className="relative bg-[#0D3B3F] pt-20 pb-0 px-6 border-t-[6px] border-[#0E5159] overflow-hidden">
        
        <div className="absolute bottom-[-5%] left-[5%] text-[10rem] font-black text-black/10 select-none pointer-events-none" dir="ltr">
          Society
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 z-10 pb-20">
            <div className="flex items-center gap-4">
              <h2 className="text-5xl md:text-7xl font-black text-[#C8D749]">
                ليه دكتور أحمد تمام
              </h2>
              <span className="text-5xl text-[#C8D749]">؟</span>
              <svg className="w-16 h-16 text-[#C8D749] -ml-6 mt-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 Q 40 10, 90 40 L 80 50 M 90 40 L 70 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              لأن طلبة كتير بتواجه صعوبة في فهم الأحياء وحل المسائل الاستنتاجية،
              وفرتلك في منصة تمام كل اللي نفسك فيه عشان 
              اخليلك المادة <span className="text-[#C8D749] font-bold">بسيطة ومُمتعة</span> 
              وبنظام متابعة صارم يوصلك للتقفيل.
            </p>

            <Link 
              href="/signup" 
              className="inline-block mt-4 px-10 py-3 rounded-xl text-xl font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
            >
              ابدأ رحلتك الآن
            </Link>
          </div>

          <div className="relative h-full min-h-[400px] flex items-end justify-center z-10 pb-10">
            
            <img 
              src="https://i.ibb.co/cKyCDSS2/dr-ahmed.jpg" 
              alt="د. أحمد تمام" 
              className="w-[85%] max-w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(200,215,73,0.3)] relative z-10 hover:scale-105 transition-transform duration-500"
              onError={(e) => { 
                e.currentTarget.src = 'https://via.placeholder.com/400x500/0D3B3F/C8D749?text=Doctor+Ahmed'; 
              }}
              crossOrigin="anonymous"
            />
            
            <div className="absolute top-[20%] right-[5%] text-[#C8D749]/20 text-5xl animate-pulse z-0">🧬</div>
            <div className="absolute top-[40%] left-[0%] text-white/10 text-6xl z-0 -rotate-12">🔬</div>
            <div className="absolute bottom-[20%] right-[-5%] text-[#C8D749]/10 text-7xl z-0 animate-[bounce_5s_infinite]">🦠</div>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-[#070B14] py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">ليه تختار <span className="text-[#C8D749]">نظامنا؟</span></h2>
            <div className="w-20 h-1 bg-[#C8D749] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "الفهم العميق", desc: "ربط المعلومات بأفكار استنتاجية لتسهيل الحل." },
              { title: "الحفظ المتقن", desc: "تكرار وربط بالخرائط الذهنية لعدم النسيان." },
              { title: "مراجعة دورية", desc: "امتحانات مستمرة لتحديد نقاط الضعف." },
              { title: "حل مكثف", desc: "حل آلاف الأسئلة من كتاب المايسترو." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0D1524] border border-[#1A263D] hover:border-[#C8D749]/50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#C8D749]/10 flex items-center justify-center text-[#C8D749] font-bold text-xl mb-6 group-hover:bg-[#C8D749] group-hover:text-black transition-colors">
                  0{i+1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLEAN MINIMAL FOOTER ================= */}
      <footer className="bg-[#070B14] pt-16 pb-8 px-6 border-t border-[#0E5159]/40 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <div className="mb-10 flex flex-col items-center">
             <div className="flex items-center gap-2 opacity-90">
                <svg className="w-8 h-8 text-[#C8D749]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <span className="text-3xl font-black text-white tracking-wider" dir="ltr">
                  Tammam <span className="text-[#C8D749] text-lg font-bold">SOCIETY</span>
                </span>
             </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

          <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base text-[#C8D749] font-mono tracking-wide mb-6" dir="ltr">
            <span className="opacity-80">&lt; Developed By &gt;</span>
            <span className="font-bold text-white bg-white/5 px-3 py-1 rounded-md border border-white/10">Elgizawy 👑</span>
            <span className="opacity-80">&lt; All Copy Rights Reserved @{new Date().getFullYear()} &gt;</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-500 text-xs tracking-widest uppercase">Powered By</span>
            <span className="text-white font-black text-lg tracking-[0.2em]" dir="ltr">GIZA-TECH</span>
          </div>

        </div>
      </footer>

    </div>
  );
}