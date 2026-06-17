import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"; // السطر ده هو اللي هيشغل الـ Tailwind CSS في الموقع كله

export const metadata = {
  title: "منصة الدكتور أحمد تمام التعليمية",
  description: "منصة تعليمية متطورة بـ Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#070B14" }}>
        {/* هنا بنلف التطبيق كله باللوجيك بتاع الـ Auth */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}