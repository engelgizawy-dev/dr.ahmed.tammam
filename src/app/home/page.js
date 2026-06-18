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
          title: "نموذج إجابة كتاب الأحياء الشامل - د. أحمد تمام 3ث",
          description: "ده نموذج إجابة كتاب الشرح والأسئلة بالكامل، عشان تراجع حلك وتشوف الإجابة النموذجية وتطمن إنك ماشي صح بالتوفيق ياصديقي .. ❤️",
          lecturesCount: 8,
          price: 0,
          isLocked: false,
          isPinned: true,
          image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop"
        },
        {
          id: "c2",
          title: "الباب الثاني - المراجعة النهائية والتنسيق الهرموني",
          description: "المراجعة النهائية الشاملة على التنسيق الهرموني في الكائنات الحية وحل آلاف الأسئلة الاستنتاجية لتقفيل المادة.",
          lecturesCount: 6,
          price: 170,
          isLocked: true,
          isPinned: true,
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop"
        }
      ];
      localStorage.setItem("tammam_courses_list", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }
  }, []);

  return (
    <div className="space-y-12 relative font-sans antialiased">
      
      {/* 🖥️ شريط الأدوات العلوي الفخم بالملي مثل الصورة */}
      <div className="w-full bg-[#0d1524] border border-white/5 rounded-2xl p-4 flex justify-between items-center z-20 relative shadow-xl">
        <div className="bg-[#C8D749]/10 border border-[#C8D749]/20 px-4 py-2 rounded-xl text-xs font-black text-[#C8D749]">
          🎯 ثانوية عامة 2026
        </div>

        <div className="flex items-center gap-4" dir="ltr">
          {/* البروفايل الدائري */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C8D749] to-blue-500 p-[2px] cursor-pointer">
            <div className="w-full h-full bg-[#070B14] rounded-full flex items-center justify-center text-xs font-black text-white">
              👤
            </div>
          </div>

          {/* الإشعارات */}
          <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center text-md relative hover:bg-white/10 transition-all duration-150">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* التوجل الليلي */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1 rounded-xl bg-black/40 border border-white/5 flex items-center gap-1 cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all duration-150 ${isDarkMode ? "bg-white/10 text-white font-black" : "text-gray-500"}`}>🌙</div>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all duration-150 ${!isDarkMode ? "bg-[#C8D749] text-[#070B14] font-black" : "text-gray-500"}`}>☀️</div>
          </button>

          {/* الرصيد */}
          <div className="bg-[#070B14] border border-white/5 pl-4 pr-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-xs text-gray-300 font-black">0 جنه</span>
            <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-xs">💰</div>
          </div>
        </div>
      </div>

      {/* 📚 شبكة الكورسات بتوزيع بسطتهالك الفخم 📚 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10 pt-4">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="group flex flex-col relative rounded-3xl transition-all duration-150 select-none"
          >
            {/* 🖼️ غلاف الكورس الخلفي المنفصل بمظهر مربع ومحمي */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#0d1524] border border-white/5 shadow-md">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-150"
              />
              {/* شريط كورس مثبت المائل في الزاوية */}
              {course.isPinned && (
                <div className="absolute top-5 -right-11 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-black px-12 py-1 rotate-45 shadow-lg uppercase tracking-widest border-b border-white/10">
                  كورس مثبت
                </div>
              )}
            </div>

            {/* 📝 العلبة الغامقة السفلية الراكبة فوق الصورة بالملي */}
            <div className="bg-[#0d1524] border border-white/5 rounded-3xl p-6 -mt-20 mx-3 relative z-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:border-white/10 transition-colors flex-1 space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-base font-black text-white leading-snug tracking-wide pt-1 min-h-[48px] line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-[11px] font-bold leading-relaxed line-clamp-3 opacity-90">
                  {course.description}
                </p>
              </div>

              {/* الأزرار وتفاصيل الشراء المظبوطة هندسياً */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                
                {/* الصف الأول: زر الدخول وبادج الحالة */}
                <div className="flex items-center justify-between gap-3">
                  <button 
                    className="px-4 py-2 rounded-xl font-black text-[11px] border border-teal-500/30 bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-[#070B14] transition-all duration-150"
                  >
                    الدخول للكورس
                  </button>

                  {course.price === 0 ? (
                    <span className="bg-purple-600/20 border border-purple-500/30 text-purple-400 font-black text-[10px] px-3 py-1.5 rounded-xl">
                      كورس مجاني !
                    </span>
                  ) : (
                    <button className="px-4 py-2 rounded-xl font-black text-[11px] bg-sky-500 text-white hover:bg-sky-400 transition-all duration-150">
                      إشترك الآن !
                    </button>
                  )}
                </div>

                {/* الصف الثاني: التواريخ والأسعار بالروقان المظبوط */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold pt-1">
                  <div className="flex flex-col gap-0.5 text-right">
                    <span>الأربعاء، ١٧ يونيو ٢٠٢٦ م</span>
                    <span>الثلاثاء، ٠٥ مايو ٢٠٢٦ م</span>
                  </div>

                  {course.price > 0 && (
                    <div className="bg-[#070B14] border border-white/5 pl-3 pr-2 py-1.5 rounded-xl flex items-center justify-center font-mono font-black text-xs text-teal-400 shadow-inner">
                      {course.price.toFixed(2)} <span className="font-sans text-[9px] text-gray-500 mr-1">جنيهاً</span>
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
