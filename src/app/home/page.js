"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesHome() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("يا بطل");

  useEffect(() => {
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(parsed.firstName || "يا بطل");
    }

    const globalCourses = localStorage.getItem("tammam_courses_list");
    if (globalCourses) {
      setCourses(JSON.parse(globalCourses));
    } else {
      // ضفنا روابط صور افتراضية فخمة ومناسبة للأحياء عشان تظهر زي التصميم بالظبط
      const defaultCourses = [
        {
          id: "c1",
          title: "الباب الأول: الدعامة والحركة في الكائنات الحية",
          description: "شرح تفصيلي ومكثف لجميع أجزاء الهيكل العظمي، العضلات، وآليات الانقباض العضلي مع حل أفكار الوزارة وتريكات امتحانات السنين السابقة.",
          lecturesCount: 8,
          price: 150,
          isLocked: false,
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop" // صورة كعينة فخمة للأحياء
        },
        {
          id: "c2",
          title: "الباب الثاني: التنسيق الهرموني (الغدد الصماء)",
          description: "دراسة شاملة لجميع هرمونات الجسم في النبات والإنسان، وحل عقدة أسئلة العلاقات البيانية والتحليلات الطبية.",
          lecturesCount: 6,
          price: 120,
          isLocked: true,
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop"
        }
      ];
      localStorage.setItem("tammam_courses_list", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  return (
    <div className="space-y-12 animate-fadeIn relative">
      
      {/* 👑 الهيدر العلوي المضاء 👑 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/[0.05] pb-6 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-wide">
            صباح الخير، <span className="text-[#C8D749] drop-shadow-[0_0_15px_rgba(200,215,73,0.3)]">{studentName}</span> 👋
          </h1>
          <p className="text-gray-400 text-xs mt-2 font-medium">جاهز لتقفيل الأحياء اليوم؟ إليك المحاضرات والكورسات المتاحة لك.</p>
        </div>
        <div className="bg-[#C8D749]/5 border border-[#C8D749]/15 px-4 py-2.5 rounded-xl text-xs font-mono font-black text-[#C8D749] shadow-[0_0_15px_rgba(200,215,73,0.1)] tracking-wider">
          🎯 ثانوية عامة 2026
        </div>
      </div>

      {/* 📚 شبكة الكورسات الكبيرة العريضة المستوحاة من بسطتهالك 📚 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group flex flex-col bg-[#0b1329]/90 border border-white/[0.05] backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#C8D749]/30 transition-all duration-300"
          >
            {/* 🖼️ غلاف الكورس العلوي (البوستر الكبير وعريض) */}
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/40 border-b border-white/[0.05]">
              <img 
                src={course.image || "https://via.placeholder.com/600x400/0d1524/C8D749?text=Tammam+Biology"} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* التعتيم الخفيف فوق الصورة لإبراز الـ Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-black/30" />
              
              {/* بادج عدد المحاضرات في الزاوية */}
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/[0.08] shadow-md tracking-wide">
                📂 {course.lecturesCount} محاضرات
              </span>

              {/* بادج حالة الكورس (مجاني أو مدفوع) */}
              {course.price === 0 && (
                <span className="absolute bottom-4 right-4 bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg animate-pulse">
                  كورس مجاني !
                </span>
              )}
            </div>

            {/* 📝 علبة تفاصيل ومحتوى الكورس السفلي */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white group-hover:text-[#C8D749] transition-colors leading-snug">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-medium line-clamp-3">
                  {course.description}
                </p>
              </div>

              {/* 🛠️ منطقة التفاعل والأزرار المصممة بالملي مثل الصورة */}
              <div className="pt-2 border-t border-white/[0.04] flex flex-col gap-3">
                
                {/* السعر والـ Action الكبيرة */}
                <div className="flex items-center justify-between gap-4">
                  
                  {/* زر الدخول الرئيسي للكورس */}
                  <button 
                    className={`flex-1 py-3 px-4 rounded-xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] ${
                      course.isLocked 
                        ? "bg-[#030712] border border-white/[0.06] text-gray-500 hover:text-white hover:bg-white/[0.03]" 
                        : "bg-gradient-to-r from-[#C8D749] to-[#b5c43d] text-[#070B14] shadow-[0_4px_20px_rgba(200,215,73,0.2)] hover:opacity-95"
                    }`}
                  >
                    {course.isLocked ? (
                      <><span>🔒</span><span>اشترك الآن !</span></>
                    ) : (
                      <><span>📖</span><span>الدخول للكورس</span></>
                    )}
                  </button>

                  {/* زر السعر الفخم الدائري المقفول المصمم زي بسطتهالك */}
                  <div className="bg-[#030712] border border-white/[0.05] px-4 py-2.5 rounded-xl flex items-center justify-center shadow-inner">
                    <span className="text-[#C8D749] font-mono font-black text-xs tracking-wide">
                      {course.price.toFixed(2)} <span className="font-sans text-[10px] text-gray-400 font-bold mr-0.5">جنيهاً</span>
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
