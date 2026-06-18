"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesHome() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("عبدالعزيز خالد عبدالعزيز");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(parsed.firstName || "عبدالعزيز خالد عبدالعزيز");
    }

    const globalCourses = localStorage.getItem("tammam_courses_list");
    if (globalCourses) {
      setCourses(JSON.parse(globalCourses));
    } else {
      const defaultCourses = [
        {
          id: "c1",
          title: "الباب الأول: الدعامة والحركة في الكائنات الحية",
          description: "شرح تفصيلي ومكثف لجميع أجزاء الهيكل العظمي، العضلات، وآليات الانقباض العضلي مع حل أفكار الوزارة وتريكات امتحانات السنين السابقة.",
          lecturesCount: 8,
          price: 150,
          isLocked: false,
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop"
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
    <div className="space-y-8 animate-fadeIn relative">
      
      {/* 🖥️ شريط الأدوات العلوي الفخم (مستوحى بالكامل من الصورة) */}
      <div className="w-full bg-[#0b1329]/40 backdrop-blur-md border border-white/[0.05] rounded-2xl p-4 flex justify-between items-center z-20 relative">
        
        {/* القسم الأيمن: بادج السنة الدراسية */}
        <div className="bg-[#C8D749]/10 border border-[#C8D749]/20 px-4 py-2 rounded-xl text-xs font-mono font-black text-[#C8D749] tracking-wider">
          🎯 ثانوية عامة 2026
        </div>

        {/* القسم الأيسر: الإشعارات، الإضاءة، المحفظة والبروفايل */}
        <div className="flex items-center gap-4" dir="ltr">
          
          {/* البروفايل الدائري الفخم */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8D749] to-blue-500 p-[2px] cursor-pointer shadow-md transform hover:scale-105 transition-transform duration-150">
            <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center text-sm font-black text-white">
              👤
            </div>
          </div>

          {/* خانة الإشعارات المضيئة */}
          <button className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.15] text-gray-300 hover:text-white flex items-center justify-center text-lg shadow-sm transition-all duration-150 relative">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* خانة الإضاءة الليلية التفاعلية */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-2xl bg-black/40 border border-white/[0.05] flex items-center gap-1.5 cursor-pointer shadow-inner transition-all duration-150"
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-all duration-150 ${isDarkMode ? "bg-white/10 text-white font-black" : "text-gray-500"}`}>🌙</div>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-all duration-150 ${!isDarkMode ? "bg-[#C8D749] text-[#070B14] font-black" : "text-gray-500"}`}>☀️</div>
          </button>

          {/* خانة محفظة الرصيد المحمية */}
          <div className="bg-[#030712] border border-white/[0.05] pl-4 pr-3 py-2 rounded-xl flex items-center gap-2 shadow-inner">
            <span className="text-[11px] text-gray-400 font-extrabold font-sans">0.00 ج.م</span>
            <div className="w-5 h-5 rounded-md bg-[#C8D749]/10 flex items-center justify-center text-xs">💰</div>
          </div>

        </div>
      </div>

      {/* 📚 شبكة الكورسات الكبيرة جداً والعريضة 📚 */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group flex flex-col md:flex-row bg-[#0b1329]/90 border border-white/[0.05] backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] hover:border-[#C8D749]/30 transition-all duration-150"
          >
            {/* 🖼️ البوستر: عريض وكبير جداً ومأخوذ من تصميم الهيدروليك الشامل للشركة */}
            <div className="relative w-full md:w-[45%] h-64 md:h-auto min-h-[260px] overflow-hidden bg-black/40 border-b md:border-b-0 md:border-l border-white/[0.05]">
              <img 
                src={course.image || "https://via.placeholder.com/600x400/0d1524/C8D749?text=Tammam+Biology"} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-150 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b1329] via-transparent to-black/20" />
              
              {/* بادج عدد المحاضرات الفخم */}
              <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl border border-white/[0.08] shadow-md tracking-wide">
                📂 {course.lecturesCount} محاضرات
              </span>
            </div>

            {/* 📝 علبة التفاصيل والنصوص العريضة والخط السميك */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white group-hover:text-[#C8D749] transition-colors leading-snug tracking-wide">
                  {course.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed font-extrabold opacity-90">
                  {course.description}
                </p>
              </div>

              {/* 🛠️ منطقة الأزرار وتفاصيل الشراء العريضة */}
              <div className="pt-4 border-t border-white/[0.04] flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* زر الدخول العريض والسميك جداً للطلب والتحكم */}
                  <button 
                    className={`flex-1 py-4 px-6 rounded-xl font-black text-xs transition-all duration-150 flex items-center justify-center gap-2 transform hover:scale-[1.01] tracking-wider ${
                      course.isLocked 
                        ? "bg-[#030712] border border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.04]" 
                        : "bg-gradient-to-r from-[#C8D749] to-[#b5c43d] text-[#070B14] shadow-[0_4px_25px_rgba(200,215,73,0.3)] hover:opacity-95"
                    }`}
                  >
                    {course.isLocked ? (
                      <><span className="text-sm">🔒</span><span className="font-black text-sm">اشترك الآن !</span></>
                    ) : (
                      <><span className="text-sm">📖</span><span className="font-black text-sm">الدخول للكورس</span></>
                    )}
                  </button>

                  {/* علبة عرض السعر مثل تصميم بسطتهالك العريض */}
                  <div className="bg-[#030712] border border-white/[0.05] px-5 py-3 rounded-xl flex items-center justify-center shadow-inner min-w-[110px]">
                    <span className="text-[#C8D749] font-mono font-black text-sm tracking-widest">
                      {course.price.toFixed(2)} <span className="font-sans text-[10px] text-gray-400 font-extrabold mr-1">جنية</span>
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
