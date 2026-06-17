import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. جلب المسار الحالي اللي الطالب بيحاول يفتحه
  const { pathname } = request.nextUrl;

  // 2. قراءة الكوكيز (رخصة الدخول)
  const userSession = request.cookies.get("user_session");

  // 3. تحديد الصفحات العامة المسموح بدخولها بدون تسجيل (ضفنا مسار الجذر "/" لصفحة الهبوط)
  const isPublicPage = 
    pathname === "/" || 
    pathname === "/login" || 
    pathname === "/signup" || 
    pathname === "/forgot-password";

  // 🔒 الحالة الأولى: الطالب مش مسجل دخول وبيحاول يدخل صفحة خاصة (زي الهوم أو الداش بورد)
  if (!userSession && !isPublicPage) {
    console.log(`[Middleware] دخول غير مصرح لمسار ${pathname} -> طرد إلى اللوجن`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 الحالة الثانية: الطالب مسجل دخول بالفعل، فممنوع يرجع لصفحات الـ Login أو صفحة الهبوط؛ بنطيره فوراً للـ Home الرئيسية
  if (userSession && isPublicPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // لو وضعه سليم، بنعديه بسلام للصفحة اللي عاوزها
  return NextResponse.next();
}

// 🎯 الماتشينج: التفتيش على كل الصفحات ما عدا الملفات الداخلية والـ Assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
