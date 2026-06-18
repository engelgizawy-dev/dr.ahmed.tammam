"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesHome() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("دكتور المستقبل");

  // 🕒 دالة لتنسيق تاريخ الإضافة الفعلي للكورس
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  useEffect(() => {
    // 1. جلب اسم الطالب
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(parsed.firstName || "دكتور المستقبل");
    }

    // 2. جلب أو تهيئة الكورسات بتواريخ إضافة ثابتة وفعلية
    const globalCourses = localStorage.getItem("tammam_courses_list");
    if (globalCourses) {
      setCourses(JSON.parse(globalCourses));
    } else {
      const defaultCourses = [
        {
          id: "c1",
          title: "الباب الأول: الدعامة والحركة في الكائنات الحية",
          description: "شرح تفصيلي ومكثف لجميع أجزاء الهيكل العظمي، العضلات، وآليات الانقباض العضلي.",
          lecturesCount: 8,
          price: 0,
          isLocked: false,
          addedDate: "2025-08-15T10:00:00Z", // تاريخ إضافة فعلي ثابت
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "c2",
          title: "الباب الثاني: التنسيق الهرموني والغدد الصماء",
          description: "دراسة شاملة لجميع هرمونات الجسم في النبات والإنسان، وحل عقدة أسئلة العلاقات البيانية.",
          lecturesCount: 6,
          price: 150,
          isLocked: true,
          addedDate: "2025-09-01T14:30:00Z", // تاريخ إضافة فعلي ثابت
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800"
        }
      ];
      localStorage.setItem("tammam_courses_list", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  return (
    <div className="space-y-8 relative font-sans antialiased pb-12">
      
      {/* 🌿 شريط الأدوات العلوي (نظيف، سريع، وبدون Blur تقيل) */}
      <div className="w-full bg-[#0D1524] border border-[#1A263D] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        
        {/* ترحيب واسم الطالب */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-white">
            مرحباً، <span className="text-[#C8D749]">{studentName}</span> 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">اختر الكورس وابدأ رحلة التفوق في الأحياء.</p>
        </div>

        {/* أدوات المستخدم السريعة */}
        <div className="flex items-center gap-4" dir="ltr">
          <div className="w-12 h-12 rounded-xl bg-[#1A263D] border border-[#2A3B5C] flex items-center justify-center text-xl cursor-pointer hover:bg-[#2A3B5C] transition-colors">
            👨‍⚕️
          </div>

          <button className="w-12 h-12 rounded-xl bg-[#1A263D] border border-[#2A3B5C] text-gray-300 flex items-center justify-center text-xl relative hover:bg-[#2A3B5C] hover:text-white transition-colors">
            🔔
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          <div className="bg-[#070B14] border border-[#1A263D] pl-4 pr-3 py-2.5 rounded-xl flex items-center gap-3">
            <span className="text-sm text-gray-300 font-bold tracking-wide">0.00 ج.م</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm">💰</div>
          </div>
        </div>
      </div>

      {/* 🧬 شبكة الكورسات (Lightweight & High Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="flex flex-col bg-[#0D1524] border border-[#1A263D] rounded-2xl overflow-hidden hover:border-[#C8D749]/50 transition-colors duration-200"
          >
            {/* 🖼️ صورة الكورس */}
            <div className="relative w-full h-56 bg-[#070B14]">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
              
              {/* بادج المحاضرات */}
              <div className="absolute top-4 right-4 bg-[#070B14]/80 text-white text-xs font-bold px-4 py-2 rounded-lg border border-[#1A263D]">
                📂 {course.lecturesCount} محاضرات
              </div>
            </div>

            {/* 📝 تفاصيل الكورس */}
            <div className="p-6 flex flex-col flex-1 space-y-6">
              
              <div className="space-y-3">
                {/* تاريخ إضافة الكورس */}
                <div className="flex items-center gap-2 text-[#C8D749] text-xs font-bold">
                  <span>📅</span>
                  <span>أُضيف في: {formatDate(course.addedDate)}</span>
                </div>
                
                <h3 className="text-xl font-black text-white leading-snug">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* 💳 الأزرار والأسعار */}
              <div className="pt-4 mt-auto border-t border-[#1A263D] flex items-center justify-between gap-4">
                
                <button 
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    course.isLocked 
                      ? "bg-[#1A263D] text-gray-300 hover:bg-[#2A3B5C]" 
                      : "bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d]"
                  }`}
                >
                  {course.isLocked ? (
                    <><span>🔒</span><span>اشترك الآن</span></>
                  ) : (
                    <><span>📖</span><span>دخول الكورس</span></>
                  )}
                </button>

                <div className="bg-[#070B14] border border-[#1A263D] px-5 py-3 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
                  {course.price === 0 ? (
                    <span className="text-emerald-400 font-bold text-base">مجاني</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-white font-black text-lg">{course.price}</span>
                      <span className="text-gray-500 text-xs font-bold">ج.م</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
