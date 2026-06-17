"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 🚀 استيراد أدوات فايربيز المطلوبة للتشييك الصاروخي
// جربنا المسار النسبي المباشر المضمون لـ Next.js للوصول لجذر الـ app أو الـ src
import { db } from "../../firebase"; 
import { collection, query, where, getDocs, or, addDoc } from "firebase/firestore";

const EGYPT_GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", 
  "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", 
  "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بني سويف", "بورسعيد", 
  "جنوب سيناء", "حلايب وشلاتين", "شمال سيناء", "قنا", "كفر الشيخ", 
  "مطروح", "الأقصر", "أسوان", "أسيوط", "سوهاج"
];

export default function SignupPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    lastName: "",
    studentPhone: "",
    fatherPhone: "",
    motherPhone: "",
    governorate: "",
    academicYear: "",
    password: "",
    confirmPassword: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setPasswordError("");

    // 1️⃣ التحققات الأساسية في الفرونت إند
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("عذراً، كلمات المرور التي أدخلتها غير متطابقة!");
      return;
    }
    if (formData.studentPhone === formData.fatherPhone || formData.studentPhone === formData.motherPhone) {
      setGeneralError("رقم هاتف الطالب يجب أن يكون مختلفاً عن أرقام أولياء الأمور!");
      return;
    }

    setLoading(true);

    try {
      // 2️⃣ الاستعلام المركب الصاروخي (Compound Query) لمنع التكرار على السيرفر الحي
      const usersRef = collection(db, "users");
      
      const duplicateCheckQuery = query(
        usersRef,
        or(
          where("studentPhone", "==", formData.studentPhone),
          where("fatherPhone", "==", formData.studentPhone),
          where("motherPhone", "==", formData.studentPhone),
          where("studentPhone", "==", formData.fatherPhone),
          where("fatherPhone", "==", formData.fatherPhone),
          where("motherPhone", "==", formData.fatherPhone),
          where("studentPhone", "==", formData.motherPhone),
          where("fatherPhone", "==", formData.motherPhone),
          where("motherPhone", "==", formData.motherPhone)
        )
      );

      const querySnapshot = await getDocs(duplicateCheckQuery);

      // لو لقانا أي سجل متطابق في الفايربيز بنقفل الباب فوراً ونمنع الحساب
      if (!querySnapshot.empty) {
        setGeneralError("عذراً، أحد الأرقام المدخلة مسجل مسبقاً بحساب آخر في قاعدة بيانات المنصة الحية!");
        setLoading(false);
        return;
      }

      // 3️⃣ رفع البيانات للفايربيز الحي بشكل رسمي
      await addDoc(usersRef, {
        firstName: formData.firstName,
        secondName: formData.secondName,
        thirdName: formData.thirdName,
        lastName: formData.lastName,
        studentPhone: formData.studentPhone,
        fatherPhone: formData.fatherPhone,
        motherPhone: formData.motherPhone,
        governorate: formData.governorate,
        academicYear: formData.academicYear,
        password: formData.password, // للحفظ الصريح بناءً على طلب الإدارة مسبقاً
        createdAt: new Date().toISOString()
      });

      // 💾 حفظ نسخة محلياً للبروفايل السريع
      localStorage.setItem("temp_student_data", JSON.stringify(formData));
      
      // 🍪 زرع كوكيز الجلسة فوراً عشان الـ Middleware يفتح الباب
      document.cookie = `user_session=${formData.studentPhone}; path=/; max-age=86400`; 

      // 🚀 طيران مباشر وفوري على الصفحة الرئيسية
      router.push("/home");

    } catch (err) {
      console.error("حدث خطأ أثناء فحص البيانات والاتصال بـ Firebase:", err);
      setGeneralError("حدث خطأ في الاتصال بقاعدة البيانات أو مسار ملف الإعدادات غير دقيق.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070B14] text-gray-100 font-sans flex flex-col justify-center items-center p-6 relative overflow-x-hidden selection:bg-[#C8D749]/30">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-[#C8D749]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-[#0E5159]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-[0_0_25px_rgba(200,215,73,0.05)] relative z-10 my-10">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2" dir="ltr">
            <span className="text-2xl font-black text-white tracking-wider">Tammam <span className="text-[#C8D749] text-sm font-bold">SOCIETY</span></span>
            <svg className="w-6 h-6 text-[#C8D749]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">إنشاء حساب طالب جديد (فايربيز الحي)</h2>
          <p className="text-gray-400 text-xs md:text-sm">امْلأ البيانات بدقة لتفعيل الحساب على السيرفر المركزي فوراً</p>
        </div>

        {generalError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm font-bold flex items-center gap-2">
            ⚠️ {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">الاسم الأول</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="اسمك" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">اسم الأب</label>
              <input type="text" name="secondName" required value={formData.secondName} onChange={handleChange} placeholder="الأب" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">اسم الجد</label>
              <input type="text" name="thirdName" required value={formData.thirdName} onChange={handleChange} placeholder="الجد" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">لقب العائلة</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="العائلة" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2">رقم هاتف الطالب (واتساب)</label>
            <input type="tel" name="studentPhone" required pattern="[0-9]{11}" value={formData.studentPhone} onChange={handleChange} placeholder="مثال: 01xxxxxxxxx" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm text-left placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" dir="ltr" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">رقم هاتف ولي الأمر (الأب)</label>
              <input type="tel" name="fatherPhone" required pattern="[0-9]{11}" value={formData.fatherPhone} onChange={handleChange} placeholder="01xxxxxxxxx" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm text-left placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" dir="ltr" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">رقم هاتف ولي الأمر (الأم)</label>
              <input type="tel" name="motherPhone" required pattern="[0-9]{11}" value={formData.motherPhone} onChange={handleChange} placeholder="01xxxxxxxxx" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm text-left placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" dir="ltr" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">السنة الدراسية</label>
              <select name="academicYear" required value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm focus:outline-none focus:border-[#C8D749] transition-colors cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'white\' height=\'16\' viewBox=\'0 0 24 24\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'left 12px center', backgroundRepeat: 'no-repeat' }}>
                <option value="" disabled>اختر سنتك الدراسية</option>
                <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">المحافظة</label>
              <select name="governorate" required value={formData.governorate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm focus:outline-none focus:border-[#C8D749] transition-colors cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'white\' height=\'16\' viewBox=\'0 0 24 24\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'left 12px center', backgroundRepeat: 'no-repeat' }}>
                <option value="" disabled>اختر محافظتك</option>
                {EGYPT_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">إنشاء كلمة المرور</label>
              <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs md:text-sm placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">تأكيد كلمة المرور</label>
              <input type="password" name="confirmPassword" required minLength={6} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border text-xs md:text-sm text-white placeholder-gray-600 focus:outline-none transition-colors ${passwordError ? 'border-red-500 focus:border-red-500' : 'border-[#1A263D] focus:border-[#C8D749]'}`} />
              {passwordError && <p className="mt-2 text-xs font-bold text-red-400 flex items-center gap-1 animate-pulse">❌ {passwordError}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 mt-4 rounded-xl text-sm font-black bg-[#C8D749] text-[#070B14] hover:bg-[#b5c43d] transition-all duration-300 shadow-[0_0_30px_rgba(200,215,73,0.15)] disabled:opacity-50">
            {loading ? "جاري فحص الأرقام بالحسابات الحية..." : "تسجيل وحفظ الحساب على السيرفر الرئيسي"}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-400">
          لديك حساب بالفعل؟ <Link href="/login" className="text-[#C8D749] font-bold hover:underline">تسجيل الدخول من هنا</Link>
        </div>
      </div>
    </div>
  );
}
