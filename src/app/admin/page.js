"use client";

import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | students | courses | academic | tech | coupons

  // --- States لإدارة البيانات (اللوجيك المحلي) ---
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentFilter, setStudentFilter] = useState("all"); // all | active
  const [courses, setCourses] = useState([]);
  const [academicTickets, setAcademicTickets] = useState([]);
  const [techTickets, setTechTickets] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // فورم إضافة كورس جديد
  const [newCourse, setNewCourse] = useState({ id: "", title: "", description: "", price: "", lecturesCount: "" });
  // فورم توليد الأكواد
  const [couponConfig, setCouponConfig] = useState({ prefix: "TAMMAM", amount: "100", count: "5" });
  // ردود الدعم
  const [academicReply, setAcademicReply] = useState({});
  const [techReply, setTechReply] = useState({});

  useEffect(() => {
    // 1. جلب الكورسات الحالية
    const savedCourses = localStorage.getItem("tammam_courses_list");
    if (savedCourses) setCourses(JSON.parse(savedCourses));

    // 2. جلب تذاكر الدعم العلمي
    const savedAcademic = localStorage.getItem("tammam_academic_tickets");
    if (savedAcademic) setAcademicTickets(JSON.parse(savedAcademic));

    // 3. جلب تذاكر الدعم الفني
    const savedTech = localStorage.getItem("tammam_tech_tickets");
    if (savedTech) setTechTickets(JSON.parse(savedTech));

    // 4. جلب أو تهيئة كروت الشحن
    const savedCoupons = localStorage.getItem("tammam_system_coupons") || "[]";
    setCoupons(JSON.parse(savedCoupons));

    // 5. جلب الطلاب الذين أنشأوا حسابات وتوليد داتا تجريبية للبرستيج
    const localData = localStorage.getItem("temp_student_data");
    const sessionData = document.cookie.includes("user_session");
    
    const dummyStudents = [
      {
        firstName: "أحمد", secondName: "محمد", thirdName: "أحمد", lastName: "تمّام",
        studentPhone: "01012345678", fatherPhone: "01122334455", motherPhone: "01233445566",
        governorate: "الجيزة", academicYear: "الصف الثالث الثانوي", password: "password123",
        lastLogin: "منذ دقيقتين"
      },
      {
        firstName: "عبد العزيز", secondName: "خالد", thirdName: "عبد العزيز", lastName: "السيد",
        studentPhone: "01099887766", fatherPhone: "01199887766", motherPhone: "01299887766",
        governorate: "القاهرة", academicYear: "الصف الثالث الثانوي", password: "elgizawy_king",
        lastLogin: "نشط الآن 🟢"
      }
    ];

    if (localData) {
      const parsedData = JSON.parse(localData);
      setStudents([ { ...parsedData, lastLogin: sessionData ? "نشط الآن 🟢" : "منذ ساعات" }, ...dummyStudents ]);
    } else {
      setStudents(dummyStudents);
    }
  }, []);

  // فلترة الطلاب بناءً على البحث والتاب النشط
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.secondName} ${student.thirdName} ${student.lastName}`;
    const matchesSearch = fullName.includes(searchQuery) || student.studentPhone.includes(searchQuery);
    
    if (studentFilter === "active") {
      return matchesSearch && student.lastLogin.includes("نشط الآن");
    }
    return matchesSearch;
  });

  // 📝 1. دالة إضافة كورس جديد للمنصة
  const handleAddCourse = (e) => {
    e.preventDefault();
    const courseData = {
      id: `c_${Date.now()}`,
      title: newCourse.title,
      description: newCourse.description,
      price: Number(newCourse.price),
      lecturesCount: Number(newCourse.lecturesCount),
      isLocked: true
    };
    const updated = [...courses, courseData];
    setCourses(updated);
    localStorage.setItem("tammam_courses_list", JSON.stringify(updated));
    setNewCourse({ id: "", title: "", description: "", price: "", lecturesCount: "" });
    alert("🚀 تم رفع ونشر الكورس الجديد على المنصة بنجاح!");
  };

  // 🧪 2. دالة الرد على سؤال علمي
  const handleAcademicReply = (ticketId) => {
    const replyText = academicReply[ticketId];
    if (!replyText || !replyText.trim()) return;

    const updated = academicTickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: "answered", reply: replyText.trim() };
      }
      return ticket;
    });
    setAcademicTickets(updated);
    localStorage.setItem("tammam_academic_tickets", JSON.stringify(updated));
    setAcademicReply({ ...academicReply, [ticketId]: "" });
    alert("🎓 تم إرسال الإجابة العلمية إلى حساب الطالب.");
  };

  // 🛠️ 3. دالة حل مشكلة تقنية
  const handleTechReply = (ticketId) => {
    const replyText = techReply[ticketId];
    if (!replyText || !replyText.trim()) return;

    const updated = techTickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: "resolved", reply: replyText.trim() };
      }
      return ticket;
    });
    setTechTickets(updated);
    localStorage.setItem("tammam_tech_tickets", JSON.stringify(updated));
    setTechReply({ ...techReply, [ticketId]: "" });
    alert("🛠️ تم تفعيل الحل وإرسال التقرير الفني للطالب.");
  };

  // 🎫 4. دالة توليد أكواد كروت الشحن عشوائياً للسنتر
  const handleGenerateCoupons = (e) => {
    e.preventDefault();
    const newGenerated = [];
    const count = Number(couponConfig.count);
    const amount = Number(couponConfig.amount);

    for (let i = 0; i < count; i++) {
      const randomId = Math.random().toString(36).substring(2, 7).toUpperCase();
      const fullCode = `${couponConfig.prefix}-${amount}-${randomId}`;
      newGenerated.push({ code: fullCode, amount: amount, status: "unused" });
    }

    const updated = [...newGenerated, ...coupons];
    setCoupons(updated);
    localStorage.setItem("tammam_system_coupons", JSON.stringify(updated));
    alert(`🎫 تم توليد ${count} كارت شحن جديد فئة ${amount} ج.م بنجاح!`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070B14] text-gray-100 font-sans flex antialiased selection:bg-[#C8D749]/30">
      
      {/* 🎛️ السايد بار الداخلي المطور للأدمن */}
      <aside className="w-72 bg-[#0D1524] border-l border-white/5 p-6 flex flex-col justify-between sticky top-0 h-screen z-20 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2 px-2" dir="ltr">
            <span className="text-xl">👑</span>
            <div className="flex flex-col">
              <span className="text-md font-black text-white tracking-wide">لوحة الإدارة الكاملة</span>
              <span className="text-[10px] text-[#C8D749] font-bold uppercase">د. أحمد تمام</span>
            </div>
          </div>

          {/* تابات التحكم الموحدة بعد إضافة تابة الطلاب */}
          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "نظرة عامة وإحصائيات", icon: "📊" },
              { id: "students", label: "إدارة ومتابعة الطلاب", icon: "👥" },
              { id: "courses", label: "إدارة ورفع الكورسات", icon: "📚" },
              { id: "academic", label: "أسئلة الدعم العلمي", icon: "🧪" },
              { id: "tech", label: "شكاوى الدعم الفني", icon: "🛠️" },
              { id: "coupons", label: "توليد كروت الشحن", icon: "🎫" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black transition-all border ${
                  activeTab === tab.id
                    ? "bg-[#C8D749] text-[#070B14] border-[#C8D749]"
                    : "text-gray-400 border-transparent hover:bg-white/5"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button onClick={() => window.location.href = "/home"} className="w-full py-3 rounded-xl text-xs font-bold text-gray-400 bg-white/5 hover:text-white transition-all text-center">
          ⬅️ العودة لواجهة الطالب
        </button>
      </aside>

      {/* 🖥️ منطقة المحتوى الإمبراطورية الموحدة */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-w-6xl relative z-10">
        
        {/* ================= 📊 TAB: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black text-white">لوحة القيادة المركزية والإحصائيات الحية</h2>
              <p className="text-gray-400 text-xs mt-1">متابعة حالة المنصة بالكامل في كسر من الثانية.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-[#0D1524]/60 border border-white/5 rounded-2xl">
                <span className="text-xs text-gray-500 font-bold block">إجمالي الطلاب بالمنصة</span>
                <span className="text-3xl font-mono font-black text-[#C8D749]">{students.length} طالب</span>
              </div>
              <div className="p-5 bg-[#0D1524]/60 border border-white/5 rounded-2xl">
                <span className="text-xs text-gray-500 font-bold block">أسئلة علمية تحتاج لرد</span>
                <span className="text-3xl font-mono font-black text-amber-400">{academicTickets.filter(t => t.status === "pending").length} سؤال</span>
              </div>
              <div className="p-5 bg-[#0D1524]/60 border border-white/5 rounded-2xl">
                <span className="text-xs text-gray-500 font-bold block">أعطال فنية معلقة</span>
                <span className="text-3xl font-mono font-black text-red-400">{techTickets.filter(t => t.status === "pending").length} شكوى</span>
              </div>
              <div className="p-5 bg-[#0D1524]/60 border border-white/5 rounded-2xl">
                <span className="text-xs text-gray-500 font-bold block">الكروت المولدة بالسيستم</span>
                <span className="text-3xl font-mono font-black text-emerald-400">{coupons.length} كارت</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= 👥 TAB: STUDENTS (التاب الجديدة الفخمة) ================= */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white">👥 كشف بيانات الطلاب التفصيلي والسرّي</h2>
              <p className="text-gray-400 text-xs mt-1">متابعة الحسابات المنشأة، مراجعة كلمات المرور وحالة النشاط اللحظية للطلاب.</p>
            </div>

            {/* الفلترة والبحث الذكي */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0D1524]/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <input 
                type="text"
                placeholder="ابحث باسم الطالب أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-md px-4 py-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C8D749] transition-colors"
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setStudentFilter("all")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${studentFilter === "all" ? "bg-[#C8D749] text-[#070B14]" : "bg-white/5 text-gray-400"}`}
                >
                  كل الطلاب ({students.length})
                </button>
                <button 
                  onClick={() => setStudentFilter("active")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${studentFilter === "active" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/5 text-gray-400"}`}
                >
                  النشطين الآن 🟢
                </button>
              </div>
            </div>

            {/* الجدول الزجاجي الشامل */}
            <div className="w-full rounded-2xl bg-[#0D1524]/60 border border-white/5 backdrop-blur-sm shadow-2xl overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[950px]">
                <thead>
                  <tr className="border-b border-white/5 bg-[#070B14]/50 text-gray-400 text-xs font-bold">
                    <th className="p-4">اسم الطالب رباعي</th>
                    <th className="p-4">رقم هاتف الطالب</th>
                    <th className="p-4">أرقام أولياء الأمور (الأب / الأم)</th>
                    <th className="p-4">المحافظة والسنة الدراسية</th>
                    <th className="p-4 text-[#C8D749]">كلمة المرور (الباسورد)</th>
                    <th className="p-4">حالة الجلسة</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">لا يوجد بيانات تطابق بحثك حالياً.</td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-black text-white">
                          {student.firstName} {student.secondName} {student.thirdName} {student.lastName}
                        </td>
                        <td className="p-4 font-mono text-gray-300" dir="ltr">{student.studentPhone}</td>
                        <td className="p-4 space-y-1">
                          <div className="text-[11px] text-gray-400 font-mono" dir="ltr">👨‍👦 أب: {student.fatherPhone}</div>
                          <div className="text-[11px] text-gray-500 font-mono" dir="ltr">👩‍👦 أم: {student.motherPhone}</div>
                        </td>
                        <td className="p-4 space-y-1">
                          <span className="inline-block bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px] text-gray-300 ml-1">{student.governorate}</span>
                          <span className="inline-block bg-[#C8D749]/10 rounded px-2 py-0.5 text-[10px] font-bold text-[#C8D749]">{student.academicYear}</span>
                        </td>
                        <td className="p-4 font-mono font-black text-[#C8D749] bg-[#C8D749]/5 select-all rounded">
                          {student.password}
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${student.lastLogin.includes("نشط") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-gray-500/10 text-gray-400"}`}>
                            {student.lastLogin}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= 📚 TAB: COURSES ================= */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white">📚 إضافة ورفع كورس جديد</h2>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-6 bg-[#0D1524]/40 border border-white/5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">اسم الباب أو المحاضرة الشاملة:</label>
                <input type="text" required value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} placeholder="مثال: الباب الثالث - التكاثر في الكائنات الحية" className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs focus:outline-none focus:border-[#C8D749]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">وصف تفصيلي للمحتوى:</label>
                <textarea required rows={3} value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} placeholder="اكتب إيه اللي الطالب هيستفاده وهيحمله في الباب ده..." className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs focus:outline-none focus:border-[#C8D749] resize-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">سعر الكورس (ج.م):</label>
                <input type="number" required value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} placeholder="مثال: 150" className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs focus:outline-none focus:border-[#C8D749]" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">عدد المحاضرات الداخلية:</label>
                <input type="number" required value={newCourse.lecturesCount} onChange={(e) => setNewCourse({...newCourse, lecturesCount: e.target.value})} placeholder="مثال: 6" className="w-full p-3 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs focus:outline-none focus:border-[#C8D749]" />
              </div>
              <button type="submit" className="sm:col-span-2 py-3.5 rounded-xl bg-[#C8D749] text-[#070B14] text-xs font-black hover:bg-[#b5c43d] transition-all">
                نشر الكورس فوراً على شاشة الطلاب 🚀
              </button>
            </form>
          </div>
        )}

        {/* ================= 🧪 TAB: ACADEMIC ================= */}
        {activeTab === "academic" && (
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white">🧪 الرد العلمي على أسئلة الطلاب الخاصة</h2>
            </div>

            <div className="space-y-4">
              {academicTickets.filter(t => t.status === "pending").length === 0 ? (
                <p className="text-gray-500 text-xs p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">عاش! لا توجد أسئلة علمية معلقة حالياً.</p>
              ) : (
                academicTickets.filter(t => t.status === "pending").map((ticket) => (
                  <div key={ticket.id} className="p-5 bg-[#0D1524]/60 border border-amber-500/10 rounded-2xl space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed"><span className="text-[#C8D749] font-bold">السؤال:</span> {ticket.questionText}</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={academicReply[ticket.id] || ""} 
                        onChange={(e) => setAcademicReply({...academicReply, [ticket.id]: e.target.value})} 
                        placeholder="اكتب الإجابة النموذجية القاطعة هنا..." 
                        className="flex-1 p-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-xs text-white focus:outline-none focus:border-emerald-500" 
                      />
                      <button onClick={() => handleAcademicReply(ticket.id)} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-[#070B14] font-black text-xs hover:bg-emerald-400">إرسال الرد</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= 🛠️ TAB: TECH ================= */}
        {activeTab === "tech" && (
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white">🛠️ تذاكر وشكاوى الأعطال الفنية</h2>
            </div>

            <div className="space-y-4">
              {techTickets.filter(t => t.status === "pending").length === 0 ? (
                <p className="text-gray-500 text-xs p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">السيستم مستقر بالكامل ولا توجد بلاغات فنية.</p>
              ) : (
                techTickets.filter(t => t.status === "pending").map((ticket) => (
                  <div key={ticket.id} className="p-5 bg-[#0D1524]/60 border border-red-500/10 rounded-2xl space-y-4">
                    <div className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded w-fit">{ticket.type}</div>
                    <p className="text-xs text-gray-300"><span className="text-red-400 font-bold">المشكلة:</span> {ticket.text}</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={techReply[ticket.id] || ""} 
                        onChange={(e) => setTechReply({...techReply, [ticket.id]: e.target.value})} 
                        placeholder="اكتب نص حل المشكلة أو التوجيه هنا..." 
                        className="flex-1 p-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-xs text-white focus:outline-none focus:border-red-400" 
                      />
                      <button onClick={() => handleTechReply(ticket.id)} className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-black text-xs hover:bg-red-400">تأكيد الحل</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= 🎫 TAB: COUPONS ================= */}
        {activeTab === "coupons" && (
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white">🎫 توليد أكواد كروت شحن رصيد المحفظة</h2>
            </div>

            <form onSubmit={handleGenerateCoupons} className="p-5 bg-[#0D1524]/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row gap-3 items-end">
              <div className="w-full sm:w-1/3">
                <label className="block text-[11px] text-gray-400 mb-1">بادئة الكود (Prefix):</label>
                <input type="text" value={couponConfig.prefix} onChange={(e) => setCouponConfig({...couponConfig, prefix: e.target.value})} className="w-full p-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs font-mono" />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-[11px] text-gray-400 mb-1">قيمة الكارت المالي (ج.م):</label>
                <select value={couponConfig.amount} onChange={(e) => setCouponConfig({...couponConfig, amount: e.target.value})} className="w-full p-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs cursor-pointer">
                  <option value="50">50 ج.م</option>
                  <option value="100">100 ج.م</option>
                  <option value="150">150 ج.م</option>
                  <option value="200">200 ج.م</option>
                </select>
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-[11px] text-gray-400 mb-1">عدد الكروت المراد إنتاجها:</label>
                <input type="number" min="1" value={couponConfig.count} onChange={(e) => setCouponConfig({...couponConfig, count: e.target.value})} className="w-full p-2.5 rounded-xl bg-[#070B14] border border-[#1A263D] text-white text-xs" />
              </div>
              <button type="submit" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C8D749] text-[#070B14] text-xs font-black hover:bg-[#b5c43d] transition-all whitespace-nowrap">
                توليد الكروت الحين ⚡
              </button>
            </form>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 px-1">📋 قائمة الأكواد النشطة بالنظام:</h3>
              <div className="max-h-60 overflow-y-auto border border-white/5 bg-[#070B14]/40 rounded-xl p-3 space-y-1.5 font-mono text-xs">
                {coupons.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">لم يتم توليد أي أكواد بعد.</p>
                ) : (
                  coupons.map((cp, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-[#0D1524]/40 border border-white/5 rounded-lg">
                      <span className="text-gray-300 font-bold select-all">{cp.code}</span>
                      <span className="text-[#C8D749] font-black">{cp.amount} ج.م</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
