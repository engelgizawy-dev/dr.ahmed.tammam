"use client";

import React, { useState, useEffect } from "react";

export default function TechSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ type: "code", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // جلب تذاكر الدعم الفني السابقة من الـ localStorage لزوم محاكاة الداتا
    const savedTickets = localStorage.getItem("tammam_tech_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      // تذاكر افتراضية لضبط الـ UI
      const defaultTickets = [
        {
          id: "tech_1",
          type: "شحن الأكواد",
          text: "اشتريت كارت شحن من السنتر بـ 100 جنيه وكل ما أكتب الكود بيقولي غير صحيح مع إني ناقله بالظبط.",
          createdAt: "2026-06-15",
          status: "resolved", // تم الحل
          reply: "أهلاً بك يا بطل، تم مراجعة الكود من السيرفر وتبين وجود حرف (O) تم كتابته بدلاً من رقم (0)، قمنا بتفعيل القيمة في محفظتك يدوياً.. تفقد رصيدك الآن."
        }
      ];
      localStorage.setItem("tammam_tech_tickets", JSON.stringify(defaultTickets));
      setTickets(defaultTickets);
    }
  }, []);

  // دالة رفع تذكرة دعم فني جديدة
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const typeLabels = {
        code: "شحن الأكواد",
        video: "تشغيل الفيديوهات",
        exam: "مشاكل الامتحانات",
        other: "أخرى / اقتراحات"
      };

      const newTicket = {
        id: `tech_${Date.now()}`,
        type: typeLabels[formData.type],
        text: formData.text.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        status: "pending", // قيد الفحص
        reply: null
      };

      const updated = [newTicket, ...tickets];
      setTickets(updated);
      localStorage.setItem("tammam_tech_tickets", JSON.stringify(updated));
      setFormData({ type: "code", text: "" });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto selection:bg-[#C8D749]/30">
      
      {/* 🛠️ الهيدر العلوي */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-lg text-red-400">🛠️</span>
          مركز الدعم الفني وحل المشكلات
        </h2>
        <p className="text-gray-400 text-xs mt-1">تواجه مشكلة تقنية في تشغيل المحاضرات أو حسابك؟ ارفع تذكرة فوراً وسيقوم مهندسو المنصة بحلها لك.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 📥 فورم رفع المشكلة */}
        <div className="p-6 rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md shadow-xl space-y-4 lg:sticky lg:top-6">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <span>🚨</span> ارفع تذكرة مشكلة جديدة
          </h3>
          
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5">تصنيف المشكلة:</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white focus:outline-none focus:border-[#C8D749] cursor-pointer text-xs appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23C8D749\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'left 12px center', backgroundRepeat: 'no-repeat' }}
              >
                <option value="code">مشكلة في كارت شحن الرصيد</option>
                <option value="video">الفيديو لا يعمل أو يعلق</option>
                <option value="exam">عطل أثناء حل الامتحان</option>
                <option value="other">مشكلة أخرى بالفصل الشخصي</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5">اشرح ما حدث معك بالتفصيل:</label>
              <textarea
                required
                rows={4}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                placeholder="اكتب نوع الجهاز أو الكود المستعمل لسرعة تتبع المشكلة وحلها..."
                className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 text-red-400 hover:from-red-500 hover:text-[#070B14] font-black text-xs transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "جاري فتح تذكرة تقنية..." : "فتح تذكرة وإرسال للمهندسين 🚀"}
            </button>
          </form>
        </div>

        {/* 📋 أرشيف التذاكر والردود التقنية */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-gray-400 px-1">📋 تذاكرك الفنية المفتوحة</h3>

          {tickets.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[#0D1524]/40 border border-white/5 text-center text-gray-500 text-xs">
              لا توجد لديك أي تذاكر دعم فني حالياً.
            </div>
          ) : (
            tickets.map((t) => (
              <div 
                key={t.id}
                className={`p-5 rounded-2xl bg-[#0D1524]/40 border backdrop-blur-sm space-y-4 transition-all ${
                  t.status === "pending" ? "border-amber-500/10" : "border-white/5 hover:border-red-500/10"
                }`}
              >
                {/* هيدر التذكرة */}
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      {t.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded font-black border text-[10px] ${
                      t.status === "pending" 
                        ? "bg-amber-500/5 text-amber-400 border-amber-500/20" 
                        : "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {t.status === "pending" ? "⏳ جاري الفحص التقني" : "🛠️ تم حل المشكلة"}
                    </span>
                    <span className="text-gray-500 font-mono">{t.createdAt}</span>
                  </div>
                </div>

                {/* نص المشكلة */}
                <p className="text-white text-xs leading-relaxed font-medium px-0.5">
                  {t.text}
                </p>

                {/* رد المطورين والدعم */}
                {t.status === "resolved" && t.reply && (
                  <div className="p-4 rounded-xl bg-[#070B14]/80 border border-red-500/10 text-xs text-gray-300 leading-relaxed border-r-2 border-r-red-400 pr-4">
                    <span className="font-black text-red-400 block mb-1">🤖 رد قسم الدعم والـ Developers:</span>
                    {t.reply}
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}