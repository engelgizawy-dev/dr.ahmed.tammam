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
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">صباح الخير، <span className="text-[#C8D749]">{studentName}</span> 👋</h1>
          <p className="text-gray-400 text-sm mt-1">جاهز لتقفيل الأحياء اليوم؟ إليك المحاضرات والكورسات المتاحة لك.</p>
        </div>
        <div className="bg-[#C8D749]/10 border border-[#C8D749]/20 px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#C8D749]">
          🎯 ثانوية عامة 2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group relative bg-[#0D1524]/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-[#C8D749]/30 transition-all duration-300 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/5 font-bold">📂 {course.lecturesCount} محاضرات</span>
                <span className="text-[#C8D749] font-black text-sm">{course.price} ج.م</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-[#C8D749] transition-colors pt-2">{course.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{course.description}</p>
            </div>
            <button className={`w-full py-3 rounded-xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 ${course.isLocked ? "bg-white/5 text-gray-400" : "bg-gradient-to-r from-[#C8D749] to-[#b5c43d] text-[#070B14]"}`}>
              {course.isLocked ? <span>🔒 اشترك الآن</span> : <span>📖 دخول ومتابعة الشرح</span>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}