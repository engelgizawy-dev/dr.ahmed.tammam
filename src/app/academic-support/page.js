"use client";

import React, { useState, useEffect } from "react";

export default function AcademicSupportPage() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // جلب تذاكر الأسئلة العلمية القديمة من الـ localStorage لو الطالب سأل قبل كده
    const savedQuestions = localStorage.getItem("tammam_academic_tickets");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // محاكاة لأسئلة سابقة مجابة لضبط شكل الـ UI واللوجيك أول ما يفتح
      const defaultTickets = [
        {
          id: "t1",
          questionText: "عندي لغبطة في حركة النوم واليقظة في نبات المستحية، هل هي بتعتمد على الأسموزية وضغط الامتلاء بالكامل ولا فيه هرمونات بتدخل؟",
          createdAt: "2026-06-14",
          status: "answered", // تم الرد
          reply: "أهلاً بك يا بطل. نعم، حركة النوم واليقظة (وانكماش الوريقات) تعتمد بالكامل على آليات فيزيائية وهي حركة الماء وضغط الامتلاء داخل خلايا المفاصل (الانتفاخات) نتيجة خروج أيونات البوتاسيوم، ولا تتدخل فيها الأوكسينات (الهرمونات النباتية) بشكل مباشر في هذه اللحظة. ركز في الفرق بينها وبين الانتحاء!"
        },
        {
          id: "t2",
          questionText: "ليه عدد عظام الحزام الصدري 4 بينما عظام الحزام الحوضي 2 بس؟ مع إن الطرفين تحت شبه اللي فوق؟",
          createdAt: "2026-06-17",
          status: "pending", // جاري المراجعة
          reply: null
        }
      ];
      localStorage.setItem("tammam_academic_tickets", JSON.stringify(defaultTickets));
      setQuestions(defaultTickets);
    }
  }, []);

  // دالة إرسال سؤال علمي جديد
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const newTicket = {
        id: `t_${Date.now()}`,
        questionText: newQuestion.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        status: "pending",
        reply: null
      };

      const updated = [newTicket, ...questions];
      setQuestions(updated);
      localStorage.setItem("tammam_academic_tickets", JSON.stringify(updated));
      setNewQuestion("");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto selection:bg-[#C8D749]/30">
      
      {/* 🧪 الهيدر العلوي */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#C8D749]/10 border border-[#C8D749]/20 flex items-center justify-center text-lg">🧪</span>
          المكتب العلمي والدعم الخاص
        </h2>
        <p className="text-gray-400 text-xs mt-1">اطرح أسئلتك العلمية المعقدة في جزئيات المنهج ليقوم تيم مساعدي الدكتور بالرد عليك بشكل خاص ونموذجي.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 📥 صندوق إرسال سؤال جديد */}
        <div className="p-6 rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md shadow-xl space-y-4 lg:sticky lg:top-6">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <span>📝</span> اكتب سؤالك العلمي الحين
          </h3>
          <form onSubmit={handleSubmitQuestion} className="space-y-3">
            <textarea
              required
              rows={5}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="اكتب السؤال بالتفصيل مع ذكر اسم الفصل أو المحاضرة لتسهيل الرد السريع عليك..."
              className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors resize-none leading-relaxed"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-xs hover:bg-[#b5c43d] transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(200,215,73,0.1)]"
            >
              {loading ? "جاري تشفير وإرسال السؤال..." : "إرسال إلى تيم المساعدين 🚀"}
            </button>
          </form>
        </div>

        {/* 📋 سجل تذاكر الأسئلة العلمية وإجاباتها */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-gray-400 px-1">📋 أرشيف أسئلتك العلمية المرفوعة</h3>
          
          {questions.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[#0D1524]/40 border border-white/5 text-center text-gray-500 text-xs">
              لم تقم بطرح أي أسئلة علمية خاصة حتى الآن.
            </div>
          ) : (
            questions.map((q) => (
              <div 
                key={q.id}
                className={`p-5 rounded-2xl bg-[#0D1524]/40 border backdrop-blur-sm space-y-4 transition-all ${
                  q.status === "pending" ? "border-amber-500/10" : "border-white/5 hover:border-emerald-500/10"
                }`}
              >
                {/* حالة التذكرة والتاريخ */}
                <div className="flex justify-between items-center text-[11px]">
                  <span className={`px-2.5 py-1 rounded-md font-black border ${
                    q.status === "pending" 
                      ? "bg-amber-500/5 text-amber-400 border-amber-500/20" 
                      : "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {q.status === "pending" ? "⏳ قيد المراجعة العلمية" : "✅ تم رد المساعد علمياً"}
                  </span>
                  <span className="text-gray-500 font-mono">{q.createdAt}</span>
                </div>

                {/* نص سؤال الطالب */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold block">سؤالك:</span>
                  <p className="text-white text-xs leading-relaxed font-medium">{q.questionText}</p>
                </div>

                {/* نص الإجابة (لو موجودة) */}
                {q.status === "answered" && q.reply && (
                  <div className="p-4 rounded-xl bg-[#070B14]/80 border border-emerald-500/10 text-xs text-gray-300 leading-relaxed border-r-2 border-r-emerald-400 pr-4">
                    <span className="font-black text-emerald-400 block mb-1">🎓 إجابة وتوجيه المكتب العلمي:</span>
                    {q.reply}
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