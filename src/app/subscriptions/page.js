"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionsPage() {
  const router = useRouter();
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💾 جلب مصفوفة الكورسات الكاملة من الـ localStorage
    const globalCourses = localStorage.getItem("tammam_courses_list");
    
    if (globalCourses) {
      const allCourses = JSON.parse(globalCourses);
      
      // 🎯 الفلترة: بنجيب الكورسات اللي الطالب مشترك فيها فعلاً (isLocked === false)
      const filtered = allCourses.filter(course => !course.isLocked);
      
      // بنزود عليها بيانات وهمية شيك للـ UI (تاريخ بدء وانتهاء الاشتراك لزوم اللوجيك)
      const subscriptionsWithDates = filtered.map((course, index) => ({
        ...course,
        startDate: "2026-06-01",
        endDate: index === 0 ? "2026-07-17" : "2026-07-01", // محاكاة لانتهاء الكورس بعد الامتحانات
        status: "active"
      }));

      setActiveSubscriptions(subscriptionsWithDates);
    }
    setLoading(false);
  }, []);

  const handleGoToCourse = (courseId) => {
    // طيران لصفحة محتوى الكورس والفيديوهات
    router.push(`/home/courses/${courseId}`);
  };

  if (loading) {
    return <div className="text-[#C8D749] font-bold">جاري جرد اشتراكاتك الفعالة...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* العنوان العلوي */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <span>🔑</span> اشتراكاتي الفعالة
        </h2>
        <p className="text-gray-400 text-xs mt-1">هنا تجد جميع الأبواب والكورسات المفتوحة لحسابك حالياً في المنصة.</p>
      </div>

      {/* لو الطالب معندوش ولا اشتراك فعال */}
      {activeSubscriptions.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#0D1524]/40 border border-white/5 text-center space-y-4">
          <p className="text-gray-400 text-sm">أنت غير مشترك في أي كورس حالياً يا بطل.</p>
          <button 
            onClick={() => router.push("/home")}
            className="px-5 py-2.5 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-xs hover:bg-[#b5c43d] transition-colors"
          >
            تصفح الكورسات المتاحة الآن 📚
          </button>
        </div>
      ) : (
        // جريد الاشتراكات الفعالة
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSubscriptions.map((sub) => (
            <div 
              key={sub.id} 
              className="bg-[#0D1524]/60 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              {/* شارة "فعال" الخضراء الشيك في الزاوية */}
              <div className="absolute top-0 left-0 bg-emerald-500/10 border-r border-b border-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-br-xl uppercase tracking-wider">
                ● Active
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs text-gray-500 font-bold block">محتوى متاح بالكامل</span>
                <h3 className="text-lg font-black text-white leading-snug">{sub.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{sub.description}</p>
              </div>

              {/* تفاصيل التواريخ وعداد المحاضرات */}
              <div className="p-4 rounded-xl bg-[#070B14]/60 border border-white/5 space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>عدد المحاضرات المفتوحة:</span>
                  <span className="text-white font-bold">{sub.lecturesCount} محاضرات</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ تفعيل الكورس:</span>
                  <span className="text-gray-300 font-mono">{sub.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ انتهاء الصلاحية:</span>
                  <span className="text-red-400 font-mono font-bold">{sub.endDate}</span>
                </div>
              </div>

              {/* زرار الدخول الفوري للمشاهدة */}
              <button
                onClick={() => handleGoToCourse(sub.id)}
                className="w-full py-3 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:from-emerald-500 hover:text-[#070B14] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
              >
                <span>💻 دخول منصة المشاهدة والامتحانات</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}