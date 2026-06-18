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
      const defaultCourses = [
        {
          id: "c1",
          title: "الباب الأول: الدعامة والحركة في الكائنات الحية",
          description: "شرح تفصيلي ومكثف لجميع أجزاء الهيكل العظمي، العضلات، وآليات الانقباض العضلي مع حل أفكار الوزارة.",
          lecturesCount: 8,
          price: 150,
          isLocked: false
        },
        {
          id: "c2",
          title: "الباب الثاني: التنسيق الهرموني (الغدد الصماء)",
          description: "دراسة شاملة لجميع هرمونات الجسم في النبات والإنسان، وحل عقدة أسئلة العلاقات البيانية.",
          lecturesCount: 6,
          price: 120,
          isLocked: true
        }
      ];
      localStorage.setItem("tammam_courses_list", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn relative">
      
      {/* 👑 الهيدر العلوي المطور بالكامل بالزجاج المضيء 👑 */}
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

      {/* 📚 شبكة الكروت الزجاجية الشفافة للكورسات 📚 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group relative bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-[#C8D749]/20 hover:translate-y-[-2px] transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            {/* إضاءة خلفية ناعمة تظهر عند الـ Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#C8D749]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="bg-white/[0.02] text-gray-300 px-3 py-1.5 rounded-lg border border-white/[0.06] font-bold tracking-wide">
                  📂 {course.lecturesCount} محاضرات
                </span>
                <span className="text-[#C8D749] font-black text-base bg-[#C8D749]/5 px-2.5 py-1 rounded-md border border-[#C8D749]/10 shadow-sm">
                  {course.price} ج.م
                </span>
              </div>
              
              <h3 className="text-lg font-black text-white group-hover:text-[#C8D749] transition-colors pt-2 leading-snug">
                {course.title}
              </h3>
              
              <p className="text-gray-400 text-xs leading-relaxed font-medium line-clamp-3">
                {course.description}
              </p>
            </div>

            {/* الأزرار التفاعلية الزجاجية والمضيئة */}
            <button 
              className={`w-full py-3.5 rounded-xl font-black text-xs transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] relative z-10 ${
                course.isLocked 
                  ? "bg-white/[0.02] border border-white/[0.06] text-gray-400 hover:bg-white/[0.05] hover:text-white" 
                  : "bg-gradient-to-r from-[#C8D749] to-[#b5c43d] text-[#070B14] shadow-[0_4px_15px_rgba(200,215,73,0.15)] hover:opacity-95"
              }`}
            >
              {course.isLocked ? (
                <>
                  <span className="text-sm">🔒</span>
                  <span>اشترك الآن</span>
                </>
              ) : (
                <>
                  <span className="text-sm">📖</span>
                  <span>دخول ومتابعة الشرح</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
