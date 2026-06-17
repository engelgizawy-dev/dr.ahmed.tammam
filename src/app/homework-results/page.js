"use client";

import React, { useState, useEffect } from "react";

export default function HomeworkResultsPage() {
  const [filter, setFilter] = useState("all"); // 'all' | 'graded' | 'pending'
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    // محاكاة لبيانات الواجبات الحية اللي بتنزل للطالب من لوحة تحكم الإدارة
    const defaultHomeworks = [
      { 
        id: "hw1", 
        title: "واجب الفصل الأول: المحاضرة الأولى (الدعامة في النبات)", 
        score: "18/20", 
        percentage: 90,
        date: "2026-06-05", 
        status: "graded", // تم التصحيح
        rating: "ممتاز",
        notes: "عاش يا بطل، إجاباتك نموذجية! عندك بس غلطة بسيطة في سؤال الضغط الاسموزي للخلية البرانشيمية راجعها في فويس الشرح." 
      },
      { 
        id: "hw2", 
        title: "واجب الفصل الأول: المحاضرة الثانية (الغضاريف والمفاصل والأوتار)", 
        score: "15/20", 
        percentage: 75,
        date: "2026-06-12", 
        status: "graded", // تم التصحيح
        rating: "جيد جداً",
        notes: "أدائك جيد، لكن ركز جداً في تحديد اتجاه المنظر الأمامي والخلفي لعظمة لوح الكتف عشان متضيعش درجات تافهة." 
      },
      { 
        id: "hw3", 
        title: "واجب الفصل الأول: المحاضرة الثالثة (الحركة في الكائنات الحية)", 
        score: "--/20", 
        percentage: null,
        date: "2026-06-16", 
        status: "pending", // جاري التصحيح
        rating: "جاري المراجعة",
        notes: "تم استلام واجبك بنجاح من قِبل المساعدين، وجاري التصحيح الآن..." 
      }
    ];

    setHomeworks(defaultHomeworks);
  }, []);

  // فلترة الواجبات بناءً على التاب النشط
  const filteredHomeworks = homeworks.filter(hw => {
    if (filter === "all") return true;
    return hw.status === filter;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto selection:bg-[#C8D749]/30">
      
      {/* 📝 الهيدر العلوي */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#C8D749]/10 border border-[#C8D749]/20 flex items-center justify-center text-lg">📝</span>
          سجل نتائج وتقييمات الواجبات
        </h2>
        <p className="text-gray-400 text-xs mt-1">تابع تقارير تصحيح واجباتك الدورية وملاحظات تيم المساعدين أولاً بأول لتطوير مستواك.</p>
      </div>

      {/* 🔍 أزرار الفلترة الزجاجية */}
      <div className="flex gap-2 p-1 bg-[#0D1524]/60 border border-white/5 rounded-xl w-fit backdrop-blur-md">
        <button 
          onClick={() => setFilter("all")} 
          className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${filter === "all" ? "bg-[#C8D749] text-[#070B14]" : "text-gray-400 hover:text-white"}`}
        >
          الكل ({homeworks.length})
        </button>
        <button 
          onClick={() => setFilter("graded")} 
          className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${filter === "graded" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-400 hover:text-white"}`}
        >
          تم التصحيح ({homeworks.filter(h => h.status === "graded").length})
        </button>
        <button 
          onClick={() => setFilter("pending")} 
          className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${filter === "pending" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-gray-400 hover:text-white"}`}
        >
          جاري التصحيح ({homeworks.filter(h => h.status === "pending").length})
        </button>
      </div>

      {/* 📋 قائمة عرض كروت الواجبات */}
      <div className="space-y-4">
        {filteredHomeworks.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#0D1524]/40 border border-white/5 text-center text-gray-400 text-sm">
            لا توجد واجبات في هذا القسم حالياً يا بطل.
          </div>
        ) : (
          filteredHomeworks.map((hw) => (
            <div 
              key={hw.id} 
              className={`p-6 rounded-2xl bg-[#0D1524]/50 border backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:scale-[1.01] transition-all duration-300 ${
                hw.status === "pending" ? "border-amber-500/10" : "border-white/5 hover:border-[#C8D749]/20"
              }`}
            >
              {/* تفاصيل الواجب */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    hw.status === "pending" 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    ● {hw.rating}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{hw.date}</span>
                </div>
                
                <h3 className="text-lg font-black text-white group-hover:text-[#C8D749] transition-colors leading-snug">
                  {hw.title}
                </h3>
                
                {/* ملاحظات المصحح الخصوصية */}
                <div className="p-3.5 rounded-xl bg-[#070B14]/60 border border-white/5 text-xs text-gray-300 leading-relaxed">
                  <span className="font-black text-[#C8D749] block mb-1">💬 ملحوظة تيم التصحيح:</span>
                  {hw.notes}
                </div>
              </div>

              {/* دائرة أو كارت النسبة المئوية والدرجة */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-3 bg-[#070B14]/80 border border-white/5 p-4 rounded-xl min-w-[120px] text-center self-stretch md:self-auto">
                <div className="space-y-0.5 flex-1 md:flex-none">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">الدرجة</span>
                  <span className={`text-xl font-mono font-black ${hw.status === 'pending' ? 'text-amber-400' : 'text-[#C8D749]'}`}>
                    {hw.score}
                  </span>
                </div>
                {hw.percentage && (
                  <div className="text-[11px] font-black bg-[#C8D749]/10 text-[#C8D749] px-2 py-0.5 rounded-md font-mono">
                    {hw.percentage}%
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}