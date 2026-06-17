"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExamResultsPage() {
  const router = useRouter();
  const [hasCenterId, setHasCenterId] = useState(false);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // 1. التشييك هل الطالب رابط كارت السنتر؟ عشان نتحكم في عرض درجات الأوفلاين
    const savedId = localStorage.getItem("student_center_id");
    if (savedId) {
      setHasCenterId(true);
    }

    // 2. مصفوفة الامتحانات الحية
    const defaultExams = [
      {
        id: "ex1",
        title: "الامتحان الشامل الأول: فصل الدعامة والحركة بالكامل",
        score: "54/60",
        percentage: 90,
        date: "2026-06-10",
        type: "offline", // سنتر
        status: "passed",
        duration: "60 دقيقة"
      },
      {
        id: "ex2",
        title: "اختبار جزئي رقم (4): هرمونات النبات والغدد الصماء",
        score: "19/20",
        percentage: 95,
        date: "2026-06-15",
        type: "online", // منصة
        status: "passed",
        duration: "20 دقيقة"
      }
    ];

    setExams(defaultExams);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto selection:bg-[#C8D749]/30">
      
      {/* 📊 الهيدر العلوي */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#C8D749]/10 border border-[#C8D749]/20 flex items-center justify-center text-lg">📊</span>
          سجل نتائج الامتحانات الشاملة والجزئية
        </h2>
        <p className="text-gray-400 text-xs mt-1">حصاد مجهودك ودرجاتك بالتفصيل في امتحانات الأحياء أونلاين ومع السنتر.</p>
      </div>

      {/* 🚨 تنبيه ذكي لو مش رابط كارت السنتر */}
      {!hasCenterId && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-400 flex items-center gap-1">⚠️ تنبيه لطلاب السنتر الأوفلاين</h4>
            <p className="text-gray-300 text-xs">لم تقم بربط كارت ID السنتر الخاص بك حتى الآن. اربط الكارت لتظهر لك درجات امتحانات السنتر هنا فوراً.</p>
          </div>
          <button 
            onClick={() => router.push("/center-id")}
            className="px-4 py-2 rounded-xl bg-amber-500 text-[#070B14] text-xs font-black hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            ربط الـ ID الحين 🪪
          </button>
        </div>
      )}

      {/* 📋 جريد عرض كروت الامتحانات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((ex) => {
          // لو الامتحان سنتر والطالب مش رابط الـ ID، بنخفي الدرجة لزوم اللوجيك والأمان
          const shouldHideScore = ex.type === "offline" && !hasCenterId;

          return (
            <div 
              key={ex.id}
              className="bg-[#0D1524]/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 backdrop-blur-md relative overflow-hidden group hover:border-[#C8D749]/20 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* الشارات العلوية */}
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2.5 py-1 rounded-md font-black ${
                    ex.type === "online" 
                      ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" 
                      : "bg-[#0E5159]/20 text-[#C8D749] border border-[#0E5159]/30"
                  }`}>
                    {ex.type === "online" ? "💻 اختبار أونلاين" : "🪪 امتحان بالسنتر"}
                  </span>
                  <span className="text-gray-500 font-mono font-medium">{ex.date}</span>
                </div>

                {/* عنوان الامتحان */}
                <h3 className="text-md font-black text-white leading-snug group-hover:text-[#C8D749] transition-colors">
                  {ex.title}
                </h3>

                {/* مدة الامتحان */}
                <p className="text-[11px] text-gray-500 font-bold">⏱️ مدة الامتحان المؤداة: {ex.duration}</p>
              </div>

              {/* سيكشن الدرجة المحققة */}
              <div className="p-4 rounded-xl bg-[#070B14]/80 border border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">النتيجة النهائية</span>
                  <span className="text-2xl font-mono font-black text-white">
                    {shouldHideScore ? "🔒 مقفول" : ex.score}
                  </span>
                </div>
                
                {!shouldHideScore ? (
                  <div className="text-sm font-mono font-black bg-[#C8D749]/10 text-[#C8D749] px-3 py-1 rounded-lg">
                    {ex.percentage}%
                  </div>
                ) : (
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10">
                    اربط الكارت للفتح
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}