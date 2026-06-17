"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DynamicCoursePage({ params }) {
  const router = useRouter();
  
  // 🎯 فك الـ params الديناميكية لقط رقم الكورس (مثلاً 12 أو 13)
  const resolvedParams = React.use(params);
  const courseId = resolvedParams.id;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💾 جلب مصفوفة الكورسات الكاملة من الـ localStorage اللي الأدمن بيضيف منها
    const savedCourses = localStorage.getItem("tammam_courses_list");
    
    if (savedCourses) {
      const allCourses = JSON.parse(savedCourses);
      
      // التفتيش عن الكورس اللي الطالب فتحه بناءً على الـ ID اللي في الرابط
      const currentCourse = allCourses.find(c => c.id === courseId || c.id === `c_${courseId}`);
      
      if (currentCourse) {
        setCourse(currentCourse);
      }
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <div className="text-[#C8D749] text-center p-10 font-bold">جاري تحميل محتويات الكورس الذكية...</div>;
  }

  // لو الطالب كتب رقم كورس مش موجود اصلاً في السيستم
  if (!course) {
    return (
      <div className="text-center p-12 space-y-4">
        <h2 className="text-xl font-bold text-red-400">عذراً، هذا الكورس غير موجود أو تم نقله! ❌</h2>
        <button onClick={() => router.push("/home")} className="px-4 py-2 bg-white/5 rounded-xl text-xs">العودة للرئيسية</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 selection:bg-[#C8D749]/30">
      
      {/* 🖼️ هيدر الكورس الزجاجي الفخم - بيتغير حسب الكورس */}
      <div className="relative p-8 rounded-3xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#C8D749]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#C8D749] font-mono font-bold bg-[#C8D749]/10 px-2.5 py-1 rounded-md">
              كود المنهج: #{courseId}
            </span>
            <span className="text-gray-500 font-bold">⏱️ عدد المحاضرات: {course.lecturesCount} محاضرات</span>
          </div>

          {/* اسم الكورس الديناميكي */}
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            {course.title}
          </h1>

          {/* وصف الكورس الديناميكي */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            {course.description}
          </p>

          {/* السعر والاشتراك */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-gray-500 block font-bold mb-1">تكلفة الاشتراك بالباب:</span>
              <span className="text-3xl font-black text-[#C8D749] font-mono">{course.price} <span className="text-xs text-gray-400">ج.م</span></span>
            </div>
            
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-sm hover:bg-[#b5c43d] transition-all shadow-[0_0_25px_rgba(200,215,73,0.15)]">
              تفعيل واشتراك في الكورس الآن 💳
            </button>
          </div>
        </div>
      </div>

      {/* 📋 قائمة المحاضرات الداخلية الافتراضية الموحدة */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-400 px-1">📚 الدروس والمحاضرات المتاحة داخل هذا الباب:</h3>
        {[...Array(course.lecturesCount)].map((_, index) => (
          <div key={index} className="p-4 rounded-xl bg-[#0D1524]/40 border border-white/5 flex justify-between items-center text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center font-bold text-[#C8D749]">{index + 1}</span>
              <span className="font-bold">المحاضرة {index + 1} : شرح المنهج بالتفصيل + ملخص الـ PDF</span>
            </div>
            <span className="text-gray-500 font-bold">🔒 مغلق لحين الاشتراك</span>
          </div>
        ))}
      </div>

    </div>
  );
}