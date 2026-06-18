"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesHome() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("دكتور المستقبل");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 🕒 دالة لتوليد تاريخ فعلي بناءً على وقت دخول الطالب
  const getDynamicDate = (daysOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    // 1. جلب اسم الطالب
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(parsed.firstName || "دكتور المستقبل");
    }

    // 2. جلب أو تهيئة الكورسات
    const globalCourses = localStorage.getItem("tammam_courses_list");
    if (globalCourses) {
      setCourses(JSON.parse(globalCourses));
    } else {
      const defaultCourses = [
        {
          id: "c1",
          title: "الباب الأول: الدعامة والحركة في الكائنات الحية 🧬",
          description: "شرح تفصيلي ومكثف لجميع أجزاء الهيكل العظمي، العضلات، وآليات الانقباض العضلي بأسلوب علمي متطور.",
          lecturesCount: 8,
          price: 0,
          isLocked: false,
          isPinned: true,
          startDate: getDynamicDate(0), // تاريخ اليوم
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: "c2",
          title: "الباب الثاني: التنسيق الهرموني والغدد الصماء 🔬",
          description: "دراسة شاملة لجميع هرمونات الجسم في النبات والإنسان، وحل عقدة أسئلة العلاقات البيانية والتحليلات الطبية.",
          lecturesCount: 6,
          price: 170,
          isLocked: true,
          isPinned: false,
          startDate: getDynamicDate(3), // تاريخ بعد 3 أيام
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
        }
      ];
      localStorage.setItem("tammam_courses_list", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  return (
    <div className="space-y-10 relative font-sans antialiased pb-10">
      
      {/* 🌿 شريط الأدوات العلوي (ضخم، واضح، وألوان متناسقة) */}
      <div className="w-full bg-[#0A1120]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 flex flex-col md:flex-row justify-between items-center gap-6 z-20 relative shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        
        {/* بادج المرحلة الدراسية */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
          <span className="text-xl">🎯</span>
          <span className="text-sm font-black text-emerald-400 tracking-wide">ثانوية عامة 2026</span>
        </div>

        {/* أدوات المستخدم (أيقونات كبيرة ومسافات مريحة) */}
        <div className="flex items-center gap-5" dir="ltr">
          
          {/* أيقونة البروفايل */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C8D749] to-emerald-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg">
            <div className="w-full h-full bg-[#070B14] rounded-full flex items-center justify-center text-xl">
              👨‍⚕️
            </div>
          </div>

          {/* الإشعارات */}
          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center text-xl relative hover:bg-white/10 hover:text-white transition-all">
            🔔
            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 border-2 border-[#0A1120] rounded-full animate-pulse"></span>
          </button>

          {/* زر تبديل الإضاءة */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-1 cursor-pointer shadow-inner"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${isDarkMode ? "bg-white/10 text-white shadow-md" : "text-gray-600"}`}>🌙</div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${!isDarkMode ? "bg-emerald-400 text-[#070B14] shadow-md" : "text-gray-600"}`}>☀️</div>
          </button>

          {/* محفظة الرصيد */}
          <div className="bg-[#050810] border border-white/10 pl-5 pr-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-inner">
            <span className="text-sm text-gray-300 font-black tracking-wide">0.00 ج.م</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">💰</div>
          </div>
        </div>
      </div>

      {/* 🧬 شبكة الكورسات (كروت ضخمة وتفاصيل احترافية) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 relative z-10">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group flex flex-col bg-[#0A1120] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 transition-all duration-300"
          >
            {/* 🖼️ صورة الكورس (كبيرة وعريضة) */}
            <div className="relative w-full h-[320px] bg-black/50 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120] via-[#0A1120]/40 to-transparent" />
              
              {/* التاجز (Badges) العلوية */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <span className="bg-black/60 backdrop-blur-md text-white text-sm font-bold px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-2">
                  <span className="text-lg">📂</span> {course.lecturesCount} محاضرات
                </span>
              </div>

              {course.isPinned && (
                <div className="absolute top-8 -right-14 bg-gradient-to-r from-red-600 to-rose-500 text-white text-xs font-black px-16 py-2 rotate-45 shadow-2xl uppercase tracking-widest border-b border-white/20">
                  📌 كورس مثبت
                </div>
              )}
            </div>

            {/* 📝 محتوى الكورس (نصوص عريضة ومسافات مريحة) */}
            <div className="p-8 flex flex-col flex-1 space-y-8 -mt-10 relative z-10">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-normal tracking-wide">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm font-bold leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>

              {/* 📅 بلوك التاريخ الفعلي */}
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">
                  📅
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">تاريخ بدء المحاضرات</span>
                  <span className="text-sm font-black text-gray-300">{course.startDate || getDynamicDate()}</span>
                </div>
              </div>

              {/* 💳 منطقة الأزرار والأسعار */}
              <div className="pt-2 flex items-center justify-between gap-6">
                
                {/* زر الدخول (ضخم وملفت) */}
                <button 
                  className={`flex-1 py-5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-xl transform hover:translate-y-[-2px] ${
                    course.isLocked 
                      ? "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white" 
                      : "bg-gradient-to-r from-emerald-500 to-[#C8D749] text-[#050810] hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                  }`}
                >
                  {course.isLocked ? (
                    <><span className="text-xl">🔒</span><span className="tracking-wide">فتح الاشتراك الآن</span></>
                  ) : (
                    <><span className="text-xl">📖</span><span className="tracking-wide">الدخول للكورس</span></>
                  )}
                </button>

                {/* بلوك السعر */}
                <div className="bg-[#050810] border border-white/10 px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-inner min-w-[140px]">
                  {course.price === 0 ? (
                    <span className="text-purple-400 font-black text-lg tracking-wide">مجاني 🎁</span>
                  ) : (
                    <>
                      <span className="text-emerald-400 font-mono font-black text-xl tracking-wider">
                        {course.price.toFixed(2)}
                      </span>
                      <span className="font-sans text-[11px] text-gray-500 font-bold mt-1">جنيهاً مصرياً</span>
                    </>
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
