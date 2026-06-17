"use client";

import React, { useState, useEffect } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(50); // رصيد افتراضي مبدئي للطالب
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // قائمة بأكواد شحن افتراضية متخزنة في السيستم لزوم التيست واللوجيك
  // الكود وقيمته كام جنيه
  const validCoupons = {
    "TAMMAM100": 100,
    "GIZA200": 200,
    "BIO50": 50
  };

  useEffect(() => {
    // جلب الرصيد الحقيقي المحفوظ في المتصفح لو الطالب شحن قبل كده
    const savedBalance = localStorage.getItem("student_wallet_balance");
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const handleCharge = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // محاكاة تأخير بسيط للـ Request الصاروخي
    setTimeout(() => {
      const cleanCode = couponCode.trim().toUpperCase();

      // التشييك هل الكود ده حقيقي وشغال؟
      if (validCoupons[cleanCode]) {
        const amountToKey = validCoupons[cleanCode];
        const newBalance = balance + amountToKey;

        // تحديث الـ State والـ localStorage فوراً
        setBalance(newBalance);
        localStorage.setItem("student_wallet_balance", newBalance);

        setSuccess(`🎯 مبروك يا بطل! تم شحن محفظتك بنجاح بمبلغ ${amountToKey} جنيهاً.`);
        setCouponCode(""); // تصفير الخانة
      } else {
        setError("عذراً، هذا الكود غير صحيح أو تم استخدامه من قبل! راجع السنتر.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* هيدر الصفحة */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <span>💰</span> رصيد محفظتي المالي
        </h2>
        <p className="text-gray-400 text-xs mt-1">من هنا يمكنك متابعة رصيدك الحالي وشحن المحفظة لشراء الكورسات والامتحانات فوراً.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* كارت عرض الرصيد الحالي الفخم */}
        <div className="relative p-6 rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md flex flex-col justify-between h-48 overflow-hidden shadow-xl">
          <div className="absolute top-[-20%] left-[-10%] w-32 h-32 bg-[#C8D749]/5 rounded-full blur-2xl"></div>
          
          <div className="space-y-1 relative z-10">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">إجمالي الرصيد المتاح</span>
            <span className="text-4xl font-black text-[#C8D749] tracking-tight drop-shadow-[0_0_15px_rgba(200,215,73,0.1)]">
              {balance} <span className="text-sm font-bold text-gray-400">ج.م</span>
            </span>
          </div>

          <div className="text-xs text-gray-400 border-t border-white/5 pt-4 flex justify-between relative z-10">
            <span>حالة المحفظة:</span>
            <span className="text-emerald-400 font-bold">● نشطة ومؤمنة</span>
          </div>
        </div>

        {/* كارت فورم شحن الرصيد */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D1524]/40 border border-white/5 backdrop-blur-md shadow-xl">
          <h3 className="text-lg font-black text-white mb-2">⚡ شحن المحفظة بكارت السنتر</h3>
          <p className="text-gray-400 text-xs mb-6">اكتب كود الشحن المطبوع على الكارت المكون من حروف وأرقام لتفعيل الرصيد فوراً.</p>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse">
              {success}
            </div>
          )}

          <form onSubmit={handleCharge} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              required
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="اكتب كود الشحن هنا (مثال: TAMMAM100)"
              className="flex-1 px-4 py-3.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-white placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors text-sm font-mono tracking-widest text-center sm:text-right"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-[#C8D749] text-[#070B14] font-black text-sm hover:bg-[#b5c43d] transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(200,215,73,0.1)] whitespace-nowrap"
            >
              {loading ? "جاري الشحن الخاطف..." : "شحن الرصيد الحين 🚀"}
            </button>
          </form>

          {/* نوتس صغيرة للطالب للـ UI الشيك */}
          <div className="mt-6 text-[11px] text-gray-500 leading-relaxed border-t border-white/5 pt-4">
            📌 الأكواد المتاحة لك للتجربة وفحص اللوجيك حالياً: 
            <span className="font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded mx-1">TAMMAM100</span> (بـ 100ج) أو 
            <span className="font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded mx-1">GIZA200</span> (بـ 200ج).
          </div>
        </div>

      </div>

    </div>
  );
}