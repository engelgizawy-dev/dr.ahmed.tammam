"use client";

import React, { useState, useEffect } from "react";

export default function CenterIdPage() {
  const [studentId, setStudentId] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [linkedId, setLinkedId] = useState("");
  const [studentName, setStudentName] = useState("طالب ثانوية عامة");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. جلب اسم الطالب الحقيقي من الكوكيز أو السيرفر المحلي لزوم بطاقة الهوية
    const savedData = localStorage.getItem("temp_student_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentName(`${parsed.firstName} ${parsed.secondName} ${parsed.lastName}`);
    }

    // 2. التشييك هل الطالب ربط الكارت قبل كده؟
    const savedId = localStorage.getItem("student_center_id");
    if (savedId) {
      setIsLinked(true);
      setLinkedId(savedId);
    }
  }, []);

  const handleLink = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // محاكاة سريعة للربط بقاعدة البيانات
    setTimeout(() => {
      const cleanId = studentId.trim().toUpperCase();

      // تفتيش بسيط لضمان جدية الكود (مثلاً لازم يكون أكبر من 5 خانات)
      if (cleanId.length >= 5) {
        localStorage.setItem("student_center_id", cleanId);
        setLinkedId(cleanId);
        setIsLinked(true);
        
        // 🎁 ميزة إضافية: أول ما يربط الكارت، بنفتح له كورس الباب الثاني تلقائياً كهدية السنتر!
        const globalCourses = localStorage.getItem("tammam_courses_list");
        if (globalCourses) {
          const courses = JSON.parse(globalCourses);
          const updatedCourses = courses.map(c => c.id === "c2" ? { ...c, isLocked: false } : c);
          localStorage.setItem("tammam_courses_list", JSON.stringify(updatedCourses));
        }

      } else {
        setError("عذراً، كود الـ ID غير صحيح. تأكد من الكود المطبوع خلف كارت السنتر الخاص بك.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleUnlink = () => {
    if (confirm("هل أنت متأكد من إلغاء ربط كارت السنتر بحسابك؟")) {
      localStorage.removeItem("student_center_id");
      setIsLinked(false);
      setLinkedId("");
      setStudentId("");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* هيدر الصفحة */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <span>🪪</span> ربط كارت ID السنتر الأوفلاين
        </h2>
        <p className="text-gray-400 text-xs mt-1">اربط كود الحضور الذكي الخاص بك لمزامنة غيابك، درجاتك، وتفعيل ميزات الأوفلاين فوراً.</p>
      </div>

      <div className="max-w-2xl mx-auto pt-4">
        
        {/* 💳 الحالة الأولى: الكارت مربوط بالفعل - بنعرض بطاقة الهوية الرقمية الفخمة */}
        {isLinked ? (
          <div className="space-y-6">
            <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl p-6 bg-gradient-to-br from-[#111A2E] via-[#0D1524] to-[#070B14] border border-[#C8D749]/30 backdrop-blur-xl shadow-[0_20px_5px_rgba(0,0,0,0.3)] overflow-hidden group">
              {/* خطوط الديكور الخلفية الهندسية */}
              <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-[#C8D749]/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-[#C8D749]/10 to-transparent w-full h-1/2 opacity-50"></div>
              
              {/* محتوى الكارت الذكي */}
              <div className="h-full flex flex-col justify-between relative z-10">
                
                {/* اللوجو والنوع */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2" dir="ltr">
                    <span className="text-lg">🧬</span>
                    <span className="text-xs font-black text-white font-mono tracking-wider">TAMMAM SOCIETY</span>
                  </div>
                  <span className="bg-[#C8D749]/10 border border-[#C8D749]/20 text-[#C8D749] text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                    Offline Member
                  </span>
                </div>

                {/* اسم الطالب الرباعي المدلع */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold block">اسم الطـالـب</span>
                  <h3 className="text-lg font-black text-white tracking-wide">{studentName}</h3>
                </div>

                {/* الباركود والـ ID */}
                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold block uppercase">Center ID</span>
                    <span className="text-sm font-mono font-bold text-[#C8D749] tracking-widest">{linkedId}</span>
                  </div>
                  {/* محاكاة باركود شيك بالـ CSS */}
                  <div className="flex gap-[2px] h-6 items-center opacity-40 group-hover:opacity-70 transition-opacity">
                    {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
                      <div key={i} className="bg-white h-full" style={{ width: `${w}px` }}></div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleUnlink}
                className="text-xs text-red-400 hover:text-red-300 font-bold hover:underline bg-red-500/5 border border-red-500/10 px-4 py-2 rounded-xl transition-all"
              >
                ⚠️ إلغاء ربط هذا الكارت
              </button>
            </div>
          </div>
        ) : (
          
          /* 📥 الحالة الثانية: الكارت مش مربوط - فورم إدخال الـ ID */
          <div className="p-8 rounded-2xl bg-[#0D1524]/40 border border-white/5 backdrop-blur-md shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mx-auto">💳</div>
              <h3 className="text-lg font-black text-white">سجل كود الكارت الحين</h3>
              <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">ستجده مطبوعاً خلف كارت الهوية الخاص بك الصادر من السنتر (يتكون من حروف وأرقام).</p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLink} className="space-y-4">
              <div className="relative">
                <input 
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="مثال: BIO-2026-XXXX"
                  className="w-full px-4 py-4 rounded-xl bg-[#070B14] border border-[#1A263D] text-white placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors text-center font-mono tracking-widest text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-sm hover:bg-[#b5c43d] transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(200,215,73,0.1)]"
              >
                {loading ? "جاري التحقق والمزامنة مع السنتر..." : "تأكيد وربط الكارت بالمنصة 🚀"}
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}