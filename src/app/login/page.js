"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔒 التشييك الأمني: هل رقم الطالب موجود في قائمة المحظورين؟
      const bannedPhones = JSON.parse(localStorage.getItem("banned_students_list") || "[]");
      
      if (bannedPhones.includes(formData.phone)) {
        setError("عذراً، تم حظر حسابك من قبل الإدارة! تواصل مع الدعم الفني.");
        setLoading(false);
        return;
      }

      console.log("توجيه آمن وسريع للمنصة عبر الكوكيز للطالب:", formData.phone);
      
      // 🍪 زرع الكوكيز الأمنية عشان الـ Middleware يشوفها ويفتح له الأبواب فوراً
      document.cookie = `user_session=${formData.phone}; path=/; max-age=86400`; // صالحة لمدة 24 ساعة
      
      // 🚀 طيران مباشر على الـ Dashboard
      router.push("/dashboard");
      
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070B14] text-gray-100 font-sans flex flex-col justify-center items-center p-6 relative overflow-x-hidden selection:bg-[#C8D749]/30">
      
      {/* الخلفية المضيئة الموحدة للموقع كله */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-[#C8D749]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 bg-[#0E5159]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-[#0D1524]/80 border border-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-[0_0_5px_rgba(200,215,73,0.1)] relative z-10">
        
        {/* اللوجو والعنوان */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2" dir="ltr">
            <svg className="w-8 h-8 text-[#C8D749]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span className="text-2xl font-black text-white tracking-wider">Tammam <span className="text-[#C8D749] text-sm font-bold">SOCIETY</span></span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">تسجيل الدخول</h2>
          <p className="text-gray-400 text-sm">أهلاً بك مجدداً! سجل دخولك لمتابعة محاضراتك</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* خانة رقم الهاتف */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">رقم هاتف الطالب</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              pattern="[0-9]{11}" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="اكتب رقمك المكون من 11 رقم" 
              className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-left placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" 
              dir="ltr" 
            />
          </div>

          {/* خانة كلمة المرور */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">كلمة المرور</label>
              <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-[#C8D749] transition-colors">نسيت كلمة المرور؟</Link>
            </div>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" 
            />
          </div>

          {/* زر تسجيل الدخول */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 mt-2 rounded-xl text-lg font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] transition-all duration-300 shadow-[0_0_25px_rgba(200,215,73,0.2)] disabled:opacity-50"
          >
            {loading ? "جاري التوجيه الخاطف..." : "دخول إلى المنصة 🔬"}
          </button>
        </form>

        {/* التوجيه لصفحة الإنشاء لو الطالب جديد */}
        <div className="text-center mt-6 text-sm text-gray-400">
          طالب جديد بالمنصة؟ <Link href="/signup" className="text-[#C8D749] font-bold hover:underline">سجل حسابك من هنا</Link>
        </div>
      </div>
    </div>
  );
}