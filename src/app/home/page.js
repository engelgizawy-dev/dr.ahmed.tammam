
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>منصة د. أحمد تمام - الكورسات المتاحة</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* الإعدادات الأساسية لمتغيرات الألوان والنظام المضيء/المظلم */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg-main: #050505;
      --card-bg: #0b0c0e;
      --neon-teal: #00ffd0;
      --neon-blue: #00b3ff;
      --text-white: #ffffff;
      --text-muted: #6c727f;
      --input-border: #1a1d24;
      --input-bg: #111318;
      --neon-glow: rgba(0, 255, 208, 0.35);
      --card-shadow: 0 20px 40px rgba(0,0,0,0.8);
    }

    /* الوضع المعكوس (النهاري المضيء عالي التباين) */
    [data-theme="light"] {
      --bg-main: #f4f6f9;
      --card-bg: #ffffff;
      --neon-teal: #00a887;
      --neon-blue: #0076b3;
      --text-white: #111318;
      --text-muted: #5c6370;
      --input-border: #d2d6dc;
      --input-bg: #f9fafb;
      --neon-glow: rgba(0, 168, 135, 0.15);
      --card-shadow: 0 10px 30px rgba(0,0,0,0.06);
    }

    body {
      background-color: var(--bg-main);
      color: var(--text-white);
      font-family: 'Cairo', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    /* نظام الـ Toast العلوي المتطور */
    .custom-toast {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-50px);
      background: var(--card-bg);
      border: 1px solid var(--neon-teal);
      box-shadow: 0 0 25px var(--neon-glow);
      padding: 1rem 2.5rem;
      border-radius: 14px;
      color: var(--text-white);
      font-weight: 700;
      z-index: 3000;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .custom-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* الهيدر العلوي لصفحة الكورسات */
    .courses-header {
      width: 100%;
      max-width: 480px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 1rem;
      background: var(--bg-main);
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .teacher-avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid var(--neon-teal);
      object-fit: cover;
      box-shadow: 0 0 10px var(--neon-glow);
    }
    .teacher-info .teacher-name {
      font-size: 0.95rem;
      font-weight: 800;
    }
    .teacher-info .teacher-title {
      font-size: 0.75rem;
      color: var(--neon-teal);
      font-weight: 700;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* زر تغيير اللون فخم */
    .theme-toggle-btn {
      background: var(--card-bg);
      border: 1px solid var(--input-border);
      color: var(--text-white);
      width: 40px;
      height: 40px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: all 0.2s;
    }
    .theme-toggle-btn:hover {
      border-color: var(--neon-teal);
      box-shadow: 0 0 10px var(--neon-glow);
    }

    /* زر القائمة الجانبية الأنيق */
    .menu-toggle-btn {
      background: linear-gradient(135deg, var(--neon-teal), var(--neon-blue));
      border: none;
      color: #000;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      box-shadow: 0 0 15px var(--neon-glow);
    }
    .menu-toggle-btn span {
      display: block;
      width: 20px;
      height: 2.5px;
      background-color: #000;
      border-radius: 2px;
    }

    /* القائمة الجانبية (Sidebar) المتكاملة */
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      z-index: 1999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .sidebar-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .sidebar {
      position: fixed;
      top: 0;
      right: -320px;
      width: 300px;
      height: 100%;
      background: var(--card-bg);
      border-left: 1px solid var(--input-border);
      box-shadow: -10px 0 40px rgba(0,0,0,0.5);
      z-index: 2000;
      transition: right 0.3s cubic-bezier(0.77, 0, 0.175, 1);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .sidebar.active {
      right: 0;
    }

    .sidebar-welcome {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--input-border);
      margin-bottom: 2rem;
    }
    .sidebar-welcome .welcome-title {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .sidebar-welcome .student-name {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--text-white);
      margin-top: 4px;
    }

    .sidebar-menu {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .sidebar-menu li a {
      display: flex;
      align-items: center;
      padding: 1rem 1.2rem;
      color: var(--text-white);
      text-decoration: none;
      font-weight: 700;
      border-radius: 12px;
      background: rgba(255,255,255,0.02);
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .sidebar-menu li a:hover, .sidebar-menu li.active a {
      background: rgba(0, 255, 208, 0.05);
      border-color: rgba(0, 255, 208, 0.2);
      color: var(--neon-teal);
    }

    /* الحاوية الأساسية لمحتوى الصفحات */
    .main-container {
      width: 100%;
      max-width: 450px;
      padding: 1.5rem 1rem;
      flex: 1;
    }

    .page-section {
      display: none;
    }
    .page-section.active {
      display: block;
    }

    .section-title {
      font-size: 1.8rem;
      font-weight: 900;
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -4px;
      right: 0;
      width: 40px;
      height: 4px;
      background: var(--neon-teal);
      border-radius: 2px;
    }

    /* تصاميم كروت الكورسات فائقة الجمال والمطابقة */
    .courses-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .course-card {
      background: var(--card-bg);
      border: 1px solid var(--input-border);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      transition: transform 0.3s;
    }
    .course-card:hover {
      transform: translateY(-5px);
    }

    .course-image-wrapper {
      width: 100%;
      position: relative;
      display: flex;
    }
    .course-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }

    .course-content {
      padding: 1.5rem;
    }

    .course-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
    }
    .course-title {
      font-size: 1.3rem;
      font-weight: 800;
    }
    .course-price {
      background: rgba(0, 255, 208, 0.1);
      border: 1px solid var(--neon-teal);
      color: var(--neon-teal);
      padding: 0.3rem 1rem;
      border-radius: 10px;
      font-weight: 800;
      font-size: 1rem;
    }

    .btn-course-action {
      width: 100%;
      padding: 1rem;
      border-radius: 14px;
      font-family: 'Cairo', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
    }
    .btn-subscribe {
      background: linear-gradient(135deg, var(--neon-teal), var(--neon-blue));
      color: #000;
      box-shadow: 0 0 15px var(--neon-glow);
    }
    .btn-enter {
      background: #111318;
      border: 1px solid var(--neon-teal);
      color: var(--neon-teal);
    }

    /* نافذة دفع الكورس المنبثقة التفاعلية */
    .payment-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(8px);
      z-index: 2500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .payment-modal.active {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-content {
      background: var(--card-bg);
      border: 1px solid var(--input-border);
      border-radius: 24px;
      width: 100%;
      max-width: 400px;
      padding: 2rem 1.5rem;
      box-shadow: var(--card-shadow);
      text-align: center;
    }
    .modal-instruction {
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .modal-instruction strong {
      color: var(--neon-teal);
      font-size: 1.2rem;
      display: block;
      margin: 0.5rem 0;
    }

    .whatsapp-btn-link {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #25D366;
      color: #fff;
      text-decoration: none;
      padding: 0.8rem 1.8rem;
      border-radius: 12px;
      font-weight: 700;
      margin-bottom: 2rem;
      box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
    }

    .activation-box {
      border-top: 1px solid var(--input-border);
      padding-top: 1.5rem;
    }
    .activation-box input {
      width: 100%;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      color: var(--text-white);
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 1rem;
      outline: none;
    }
    .activation-box input:focus {
      border-color: var(--neon-teal);
    }
    .btn-close-modal {
      background: none;
      border: none;
      color: var(--text-muted);
      margin-top: 1rem;
      cursor: pointer;
      font-weight: 600;
    }

    /* تصاميم الحقول والصفحات الجانبية للفورم */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.2rem;
    }
    .form-group label {
      font-size: 0.9rem;
      font-weight: 700;
    }
    .form-group input, .form-group textarea {
      width: 100%;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      color: var(--text-white);
      padding: 1rem;
      border-radius: 12px;
      outline: none;
      font-family: 'Cairo', sans-serif;
    }
    .form-group input:focus, .form-group textarea:focus {
      border-color: var(--neon-teal);
    }
    
    .btn-submit-form {
      width: 100%;
      background: linear-gradient(135deg, var(--neon-teal), var(--neon-blue));
      border: none;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 0 15px var(--neon-glow);
    }

    /* تصميم قسم الإحصائيات الفاخر */
    .stats-card {
      background: var(--card-bg);
      border: 1px solid var(--input-border);
      border-radius: 16px;
      padding: 1.2rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .stats-card .info h4 {
      font-size: 1rem;
      font-weight: 800;
    }
    .stats-card .info p {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .stats-badge {
      background: rgba(0, 179, 255, 0.1);
      border: 1px solid var(--neon-blue);
      color: var(--neon-blue);
      padding: 0.3rem 0.8rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
    }

    /* الفوتر السفلي للتواصل طبق الأصل */
    .footer-contact {
      width: 100%;
      max-width: 450px;
      background: var(--card-bg);
      border: 1px solid var(--input-border);
      border-radius: 16px;
      padding: 1rem;
      margin-top: 3rem;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .footer-contact-img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      object-fit: cover;
    }
    .footer-contact-text h5 {
      font-size: 0.95rem;
      font-weight: 800;
    }
    .footer-contact-text p {
      font-size: 0.85rem;
      color: var(--neon-teal);
      font-weight: 700;
      margin-top: 2px;
    }

    /* الفوتر الرئيسي النهائي المتطابق */
    .footer-main {
      width: 100%;
      max-width: 450px;
      text-align: center;
      margin-top: 4rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .footer-society {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .footer-society span {
      font-weight: 400;
      font-size: 0.85rem;
      color: #798396;
      letter-spacing: 2px;
      margin-top: 6px;
    }
    .footer-society .info-icon {
      border: 1.5px solid #798396;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #798396;
    }
    .developer-badge {
      background: #111318;
      border: 1px solid var(--input-border);
      padding: 0.6rem 1.5rem;
      border-radius: 12px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .developer-badge strong {
      color: #fff;
      margin-left: 4px;
    }
    .copyright {
      font-size: 0.8rem;
      color: #494f5c;
    }
    .powered-by {
      font-size: 0.75rem;
      color: #5d6475;
      letter-spacing: 3px;
      font-weight: 700;
    }
    .powered-by div {
      font-size: 0.95rem;
      color: var(--text-white);
      letter-spacing: 4px;
      font-weight: 900;
      margin-top: 4px;
    }
  </style>
</head>
<body>

  <!-- الـ Toast العلوي لانسياب الرسائل الجذابة -->
  <div id="customToast" class="custom-toast">
    <span id="toastIcon">✨</span>
    <span id="toastMessage">تمت العملية بنجاح</span>
  </div>

  <!-- هيدر الصفحة المزامنة -->
  <header class="courses-header">
    <div class="header-left">
      <button class="theme-toggle-btn" onclick="toggleTheme()" title="تغيير الألوان">🌗</button>
      <button class="menu-toggle-btn" onclick="toggleSidebar()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="header-right">
      <div class="teacher-info" style="text-align: left;">
        <div class="teacher-name">د. أحمد تمام</div>
        <div class="teacher-title">كبير مستشاري الأحياء</div>
      </div>
      <img src="https://i.postimg.cc/tRDnXjxX/IMG-20260618-061351.png" alt="Dr Ahmed Tammam" class="teacher-avatar">
    </div>
  </header>

  <!-- القائمة الجانبية المتقدمة والشفافة -->
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-welcome">
      <div class="welcome-title">أهلاً بك بك في منصتنا</div>
      <div class="student-name" id="studentNameHeader">أحمد محمد علي</div>
    </div>
    <ul class="sidebar-menu">
      <li class="active" id="menu-dashboard"><a href="#" onclick="switchSection('dashboard')">لوحة التحكم</a></li>
      <li id="menu-support"><a href="#" onclick="switchSection('support')">الدعم الفني</a></li>
      <li id="menu-stats"><a href="#" onclick="switchSection('stats')">إحصائيات الطالب</a></li>
      <li id="menu-settings"><a href="#" onclick="switchSection('settings')">إعدادات الطالب</a></li>
    </ul>
  </aside>

  <!-- الحاوية الديناميكية للمحتوى المتبدل -->
  <main class="main-container">

    <!-- 1. قسم لوحة التحكم والكورسات المتاحة -->
    <section id="dashboard-section" class="page-section active">
      <h2 class="section-title">الكورسات المتاحة</h2>
      <div class="courses-grid">
        
        <!-- الكورس الأول -->
        <div class="course-card">
          <div class="course-image-wrapper">
            <img src="https://i.postimg.cc/tRDnXjxX/IMG-20260618-061351.png" alt="كورس الشهر الأول" class="course-image">
          </div>
          <div class="course-content">
            <div class="course-meta">
              <h3 class="course-title">كورس الشهر الأول</h3>
              <span class="course-price">200 ج</span>
            </div>
            <button class="btn-course-action btn-subscribe" onclick="openPaymentModal('كورس الشهر الأول')">اشتراك في الكورس</button>
          </div>
        </div>

        <!-- الكورس الثاني (متطابق الأبعاد تماماً) -->
        <div class="course-card">
          <div class="course-image-wrapper">
            <img src="https://i.postimg.cc/d3Whn2YD/IMG-20260618-061428.png" alt="كورس الشهر الثاني" class="course-image">
          </div>
          <div class="course-content">
            <div class="course-meta">
              <h3 class="course-title">كورس الشهر الثاني</h3>
              <span class="course-price">200 ج</span>
            </div>
            <button class="btn-course-action btn-enter" onclick="enterCourseMock()">ادخل للكورس</button>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. قسم الدعم الفني المطور لإرسال الرسائل -->
    <section id="support-section" class="page-section">
      <h2 class="section-title">الدعم الفني</h2>
      <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--input-border);">
        <form onsubmit="sendSupportMessage(event)">
          <div class="form-group">
            <label>عنوان المشكلة</label>
            <input type="text" placeholder="مثال: مشكلة في تفعيل الكود" required>
          </div>
          <div class="form-group">
            <label>تفاصيل الرسالة</label>
            <textarea rows="5" placeholder="اكتب تفاصيل رسالتك هنا بوضوح للمساعدة..." required></textarea>
          </div>
          <button type="submit" class="btn-submit-form">إرسال الرسالة إلى الإدارة العامة</button>
        </form>
      </div>
    </section>

    <!-- 3. قسم إحصائيات الطالب والمشاهدات -->
    <section id="stats-section" class="page-section">
      <h2 class="section-title">إحصائيات الطالب</h2>
      <div class="stats-card">
        <div class="info">
          <h4>المحاضرة التأسيسية الأولى</h4>
          <p>تمت مشاهدتها بالكامل</p>
        </div>
        <span class="stats-badge">100% مشاهدة</span>
      </div>
      <div class="stats-card">
        <div class="info">
          <h4>اختبار المحاضرة التأسيسية</h4>
          <p>تاريخ الاجتياز: اليوم</p>
        </div>
        <span class="stats-badge" style="border-color:var(--neon-teal); color:var(--neon-teal);">الدرجة: 19/20</span>
      </div>
      <div class="stats-card">
        <div class="info">
          <h4>حل الواجب الشامل (1)</h4>
          <p>تحت التصحيح والتدقيق</p>
        </div>
        <span class="stats-badge" style="border-color:#ff9f43; color:#ff9f43;">جاري المراجعة</span>
      </div>
    </section>

    <!-- 4. قسم إعدادات الطالب لتغيير البيانات والسر -->
    <section id="settings-section" class="page-section">
      <h2 class="section-title">إعدادات الطالب</h2>
      <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--input-border);">
        <form onsubmit="saveSettings(event)">
          <div class="form-group">
            <label>اسم الطالب الكامل</label>
            <input type="text" id="settings-name" value="أحمد محمد علي">
          </div>
          <div class="form-group">
            <label>رقم هاتف الطالب</label>
            <input type="tel" value="01012345678" readonly style="opacity: 0.7;">
          </div>
          <div class="form-group">
            <label>رقم ولي الأمر (الأب)</label>
            <input type="tel" value="01198765432">
          </div>
          <div class="form-group">
            <label>رقم ولي الأمر (الأم)</label>
            <input type="tel" value="01234567890">
          </div>
          <div class="form-group">
            <label>الرقم القومي</label>
            <input type="text" value="2990101xxxxxxx" readonly style="opacity: 0.7;">
          </div>
          
          <h3 style="font-size: 1.1rem; margin: 1.5rem 0 1rem 0; color: var(--neon-blue);">تعديل كلمة المرور</h3>
          <div class="form-group">
            <label>كلمة السر القديمة</label>
            <input type="password" placeholder="••••••••">
          </div>
          <div class="form-group">
            <label>كلمة السر الجديدة</label>
            <input type="password" placeholder="••••••••">
          </div>
          <div class="form-group">
            <label>تأكيد كلمة السر الجديدة</label>
            <input type="password" placeholder="••••••••">
          </div>
          
          <button type="submit" class="btn-submit-form" style="background: linear-gradient(135deg, var(--neon-blue), #0055ff); color: #fff;">حفظ التغييرات وتحديث البيانات</button>
        </form>
      </div>
    </section>

    <!-- كارت التواصل المصغر أسفل الكورسات مباشرة -->
    <div class="footer-contact">
      <img src="https://i.postimg.cc/tRDnXjxX/IMG-20260618-061351.png" alt="د. أحمد تمام" class="footer-contact-img">
      <div class="footer-contact-text">
        <h5>تواصل مباشرة مع المستر</h5>
        <p>01128381838</p>
      </div>
    </div>

  </main>

  <!-- نافذة الدفع المنبثقة التفاعلية والشحن بالكود -->
  <div class="payment-modal" id="paymentModal">
    <div class="modal-content">
      <h3 style="margin-bottom: 1rem;" id="modalCourseTitle">الاشتراك في الكورس</h3>
      <div class="modal-instruction">
        قم بتحويل قيمة الكورس (200ج) إلى الرقم التالي:
        <strong>01114672635</strong>
        ثم تواصل مع الدعم الفني الفوري عبر الواتساب لتأكيد الإيصال:
      </div>
      
      <a href="https://wa.me/201128381838" target="_blank" class="whatsapp-btn-link">
        تواصل عبر الواتساب الفوري 💬
      </a>

      <div class="activation-box">
        <label style="display:block; margin-bottom: 0.5rem; font-weight:700; font-size:0.9rem;">ادخل كود التفعيل هنا بعد الاستلام:</label>
        <input type="text" id="activationCodeInput" placeholder="X X X X X X">
        <button class="btn-course-action btn-subscribe" onclick="verifyActivationCode()">تفعيل الكورس الآن 🚀</button>
      </div>

      <button class="btn-close-modal" onclick="closePaymentModal()">إغلاق النافذة</button>
    </div>
  </div>

  <!-- الفوتر الرئيسي الموحد لجميع الصفحات -->
  <footer class="footer-main">
    <div class="footer-society">
      Tammam <span>SOCIETY</span> <div class="info-icon">i</div>
    </div>
    
    <div class="developer-badge">
      &lt;/&gt; Developed By <strong>Ahmed & Elgizawy 👑</strong>
    </div>

    <div class="copyright">
      All Rights Reserved @2026
    </div>

    <div class="powered-by">
      POWERED BY
      <div>GIZA-TECH</div>
    </div>
  </footer>

  <script>
    // نظام التحكم بالقائمة الجانبية
    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
      document.getElementById('sidebarOverlay').classList.toggle('active');
    }

    // نظام التبديل المرن بين الأقسام الفرعية داخل المنصة
    function switchSection(sectionId) {
      document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
      document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
      
      document.getElementById(sectionId + '-section').classList.add('active');
      document.getElementById('menu-' + sectionId).classList.add('active');
      toggleSidebar();
    }

    // تشغيل الـ Toast العلوي المتطور وانسيابه لأسفل
    function triggerToast(message, icon = '✨') {
      const toast = document.getElementById('customToast');
      document.getElementById('toastMessage').innerText = message;
      document.getElementById('toastIcon').innerText = icon;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // نظام تغيير الألوان المعكوسة (الوضع المظلم / المضيء المتناسق)
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        triggerToast("تم الانتقال إلى الوضع الليلي الفخم");
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        triggerToast("تم الانتقال إلى الوضع المضيء عالي التباين");
      }
    }

    // النوافذ المنبثقة للاشتراك والتحويل
    function openPaymentModal(courseName) {
      document.getElementById('modalCourseTitle').innerText = `الاشتراك في: ${courseName}`;
      document.getElementById('paymentModal').classList.add('active');
    }
    function closePaymentModal() {
      document.getElementById('paymentModal').classList.remove('active');
    }

    // التحقق من كود التفعيل الممنوح من الدعم
    function verifyActivationCode() {
      const code = document.getElementById('activationCodeInput').value.trim();
      if(code === "") {
        triggerToast("من فضلك أدخل كود التفعيل أولاً!", "⚠️");
        return;
      }
      closePaymentModal();
      triggerToast("تم الاشتراك في الكورس بنجاح مبروك عليك", "🎉");
      document.getElementById('activationCodeInput').value = "";
    }

    // محاكاة دخول الكورس المشترك به بالفعل
    function enterCourseMock() {
      triggerToast("مرحباً بك داخل الكورس! جاري تحميل المحاضرات والملفات...", "📚");
    }

    // إرسال رسائل الدعم الفني
    function sendSupportMessage(e) {
      e.preventDefault();
      triggerToast("تم إرسال رسالتك بنجاح وجاري الفحص من الإدارة العامة", "📥");
      e.target.reset();
    }

    // حفظ إعدادات الطالب وتحديث الاسم
    function saveSettings(e) {
      e.preventDefault();
      const newName = document.getElementById('settings-name').value.trim();
      if(newName !== "") {
        document.getElementById('studentNameHeader').innerText = newName;
      }
      triggerToast("تم تحديث بياناتك الشخصية بنجاح وتأمينها", "💾");
    }
  </script>
</body>
</html>
