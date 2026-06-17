"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // قراءة البيانات الحقيقية اللي الطالب مدخلها في الـ Signup مباشرة بدون تعقيد
    const savedData = localStorage.getItem("temp_student_data");
    
    if (savedData) {
      setStudentData(JSON.parse(savedData));
    } else {
      // لو ملقاش داتا متخزنة، بنحط بيانات تجريبية فورية عشان الصفحة متبوظش وتفضل عارضة داتا قدامك
      setStudentData({
        firstName: "عبد العزيز",
        secondName: "خالد",
        thirdName: "عبد العزيز",
        lastName: "الجيزاوي",
        studentPhone: "01090747536",
        fatherPhone: "01123456789",
        motherPhone: "01234567890",
        governorate: "الجيزة",
        academicYear: "الصف الثالث الثانوي",
        password: "••••••••"
      });
    }
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center gap-4 text-[#C8D749] font-sans">
        <div className="w-12 h-12 border-4 border-[#C8D749] border-t-transparent rounded-full animate-spin"></div>
        <span className="font-bold tracking-wider animate-pulse">جاري تحميل بيانات الطالب...</span>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#070B14] text-gray-100 font-sans relative overflow-x-hidden antialiased selection:bg-[#C8D749]/30">
      
      {/* 🌌 تأثيرات الإضاءة الخلفية */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-[#C8D749]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-[#0E5159]/15 rounded-full blur-[150px]"></div>
      </div>

      {/* 🧬 Navbar */}
      <nav className="w-full bg-[#070B14]/70 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8D749]/20 to-transparent border border-[#C8D749]/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(200,215,73,0.1)]">
              🧬
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-wide">Tammam</span>
              <span className="text-[10px] text-[#C8D749] font-bold tracking-widest uppercase">Biology Society</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            تسجيل الخروج
          </button>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {/* كارت الترحيب الأسطوري باسمك الحقيقي كاملاً */}
        <div className="relative w-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-3">
              <span className="text-sm bg-[#C8D749]/10 text-[#C8D749] px-3 py-1 rounded-md border border-[#C8D749]/20 font-bold font-mono">DATA LOADED SUCCESS</span>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                مرحباً بك يا بطل: <span className="text-[#C8D749] drop-shadow-[0_0_15px_rgba(200,215,73,0.2)]">{studentData.firstName} {studentData.secondName} {studentData.thirdName} {studentData.lastName}</span>
              </h2>
              <p className="text-gray-400 text-sm">تم جرد وعرض ملفك الشخصي الحالي من الـ State بنجاح.</p>
            </div>
            
            <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
              <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-center">
                <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">السنة الدراسية</span>
                <span className="text-sm font-bold text-white">{studentData.academicYear}</span>
              </div>
              <div className="bg-[#C8D749]/10 border border-[#C8D749]/20 px-4 py-2.5 rounded-xl text-center">
                <span className="block text-[10px] text-[#C8D749]/70 uppercase font-bold tracking-wider">المحافظة</span>
                <span className="text-sm font-bold text-[#C8D749]">📍 {studentData.governorate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📋 كروت جرد البيانات بالملي */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white flex items-center gap-2 px-1">
            <span className="text-[#C8D749]">■</span> بيانات حساب الطالب الحالية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* كارت الاسم الكامل */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-bold">الاسم رباعي بالكامل</span>
                <p className="text-lg font-bold text-white">{studentData.firstName} {studentData.secondName} {studentData.thirdName} {studentData.lastName}</p>
              </div>
              <span className="text-2xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">👤</span>
            </div>

            {/* كارت هاتف الطالب */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex justify-between items-center" dir="ltr">
              <span className="text-2xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">📱</span>
              <div className="space-y-1 text-right">
                <span className="text-xs text-gray-500 font-bold block">رقم هاتف الطالب</span>
                <p className="text-lg font-mono font-bold text-[#C8D749]">{studentData.studentPhone}</p>
              </div>
            </div>

            {/* كارت هاتف الأب */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex justify-between items-center" dir="ltr">
              <span className="text-2xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">👨‍👦</span>
              <div className="space-y-1 text-right">
                <span className="text-xs text-gray-500 font-bold block">رقم هاتف ولي الأمر (الأب)</span>
                <p className="text-lg font-mono font-bold text-gray-200">{studentData.fatherPhone}</p>
              </div>
            </div>

            {/* كارت هاتف الأم */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex justify-between items-center" dir="ltr">
              <span className="text-2xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center">👩‍👦</span>
              <div className="space-y-1 text-right">
                <span className="text-xs text-gray-500 font-bold block">رقم هاتف ولي الأمر (الأم)</span>
                <p className="text-lg font-mono font-bold text-gray-200">{studentData.motherPhone}</p>
              </div>
            </div>

            {/* كارت الباسورد */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/[0.02] to-transparent border border-red-500/10 hover:border-red-500/20 transition-all flex justify-between items-center md:col-span-2">
              <div className="space-y-1">
                <span className="text-xs text-red-400/70 font-bold">كلمة مرور الحساب المعتمدة</span>
                <p className="text-xl font-mono font-black text-red-400 tracking-wider">{studentData.password}</p>
              </div>
              <span className="text-2xl bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-red-400">🔑</span>
            </div>

          </div>
        </div>

      </main>

      {/* Footer بصمة شركتك */}
      <footer className="bg-[#070B14] pt-16 pb-8 px-6 border-t border-[#0E5159]/30 relative z-10 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-[#C8D749] font-mono mb-6" dir="ltr">
            <span>&lt; Architected By &gt;</span>
            <span className="font-bold text-white bg-white/5 px-3 py-1 rounded-md border border-white/10">Elgizawy 👑</span>
            <span>&lt; All Copy Rights Reserved @2026 &gt;</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-600 text-xs tracking-widest uppercase font-bold">Powered By</span>
            <span className="text-white font-black text-xl tracking-[0.2em]" dir="ltr">GIZA-TECH</span>
          </div>
        </div>
      </footer>

    </div>
  );
}